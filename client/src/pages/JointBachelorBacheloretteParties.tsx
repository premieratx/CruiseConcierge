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
import { BlogImageBreak, BlogPhotoStrip, BlogPartyGallery, BLOG_BOAT_PHOTOS, BLOG_PARTY_PHOTOS } from '@/components/BlogImageBreak';
import { StickyCTA } from '@/components/StickyCTA';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { DiscoCruisePricing } from '@/components/DiscoCruisePricing';
import { 
  Heart, Ship, Users, Calendar, Music, Camera, Sparkles, 
  Sun, Wine, MapPin, Star, PartyPopper, Clock, Gift, 
  CheckCircle2, Crown, Gem, Trophy, Anchor
} from 'lucide-react';
import { Link } from 'wouter';

const tableOfContents = [
  { id: 'why-joint', title: 'Why Combined Bach Parties Are Trending' },
  { id: 'atx-disco', title: 'ATX Disco Cruise: Perfect for Joint Celebrations' },
  { id: 'private-options', title: 'Private Boat Options for Combined Parties' },
  { id: 'planning-tips', title: 'Planning Your Joint Celebration' },
  { id: 'activities', title: 'Activities for Co-Ed Groups' },
  { id: 'budget-guide', title: 'Budget & Pricing Guide' },
  { id: 'timeline', title: 'Sample Weekend Timeline' },
  { id: 'testimonials', title: 'Real Couple Experiences' }
];

export default function JointBachelorBacheloretteParties() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-950" data-page-ready="joint-bach-party">
      <SEOHead 
        pageRoute="/blogs/joint-bachelor-bachelorette-parties-with-premier-party-cruises"
        defaultTitle="Joint Bachelor/Bachelorette Parties With Premier Party Cruises"
        defaultDescription="Plan the perfect combined bachelor bachelorette party on Lake Travis! ATX Disco Cruise and private boats offer unforgettable co-ed celebrations. Save money, maximize fun!"
        defaultKeywords={[
          'joint bachelor bachelorette party',
          'combined bachelor bachelorette',
          'co-ed bachelor party',
          'joint bach party austin',
          'combined pre-wedding party',
          'bachelor bachelorette boat party',
          'atx disco cruise joint party',
          'lake travis combined celebration',
          'austin co-ed bachelor party',
          'joint bachelor party ideas'
        ]}
      />
      <PublicNavigation />
      <Breadcrumb />
      
      <StickyCTA 
        primaryText="Plan Your Joint Celebration"
        primaryHref="/chat"
        secondaryText="Call Now"
        secondaryHref="tel:+15124885892"
      />

      <SectionReveal>
        <section className="relative py-24 px-6 bg-gradient-to-br from-pink-600 via-purple-600 to-blue-600 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <LazyImage 
              src="/attached_assets/atx-disco-cruise-party.webp"
              alt="Joint bachelor bachelorette party on Lake Travis"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <Heart className="h-16 w-16 text-pink-400 mx-auto mb-6 animate-pulse" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl heading-unbounded font-bold mb-6 text-white drop-shadow-lg">
              Joint Bachelor/Bachelorette Parties With Premier Party Cruises
            </h1>
            <p className="text-xl md:text-2xl text-pink-100 max-w-3xl mx-auto mb-8">
              Why celebrate separately? Discover how combined bachelor bachelorette parties on Lake Travis create unforgettable memories, save money, and bring your wedding party together for the ultimate co-ed celebration!
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-white">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>13 min read</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>Updated November 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <span>4.9 Rating</span>
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
                Planning a <strong>joint bachelor bachelorette party</strong>? You're part of a growing trend! More couples are choosing <strong>combined bachelor bachelorette</strong> celebrations because they're more fun, budget-friendly, and stress-free than coordinating separate events. If you and your partner love spending time together and want your wedding parties to bond before the big day, a <strong>co-ed bachelor party</strong> on Lake Travis with <Link href="/" className="text-pink-600 hover:text-pink-700 font-semibold">Premier Party Cruises</Link> offers the perfect solution for your <strong>joint bach party austin</strong> celebration.
              </p>
              
              <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Whether you choose the legendary <Link href="/atx-disco-cruise" className="text-purple-600 hover:text-purple-700 font-semibold">ATX Disco Cruise</Link> or a <Link href="/private-cruises" className="text-blue-600 hover:text-blue-700 font-semibold">private boat rental</Link>, a <strong>bachelor bachelorette boat party</strong> creates memories that both sides of your wedding party will treasure. Lake Travis provides the stunning backdrop for your <strong>combined pre-wedding party</strong>, offering daytime lake activities and evening celebrations that accommodate everyone's energy levels and interests. This is the ultimate <strong>lake travis combined celebration</strong> experience!
              </p>

              <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                This comprehensive guide covers everything you need to know about planning the perfect <strong>austin co-ed bachelor party</strong> on the water. From choosing between public and private cruise options to coordinating activities that please both the bride's and groom's sides, we'll show you how to create an unforgettable <strong>joint bachelor party</strong> celebration. Get ready to discover <strong>joint bachelor party ideas</strong> that will make your pre-wedding festivities the talk of your entire wedding!
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <Card className="hover:shadow-xl transition-all rounded-xl border-2 border-pink-200">
                <CardContent className="p-6 text-center">
                  <Heart className="h-12 w-12 text-pink-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Celebrate Together</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Perfect for <strong>combined bachelor bachelorette</strong> fun
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-xl transition-all rounded-xl border-2 border-purple-200">
                <CardContent className="p-6 text-center">
                  <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Bond Your Crew</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Unite wedding parties for <strong>co-ed bachelor party</strong> bonding
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-xl transition-all rounded-xl border-2 border-blue-200">
                <CardContent className="p-6 text-center">
                  <Trophy className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Save Money</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    One epic party instead of two separate events
                  </p>
                </CardContent>
              </Card>
            </div>

            <BlogImageBreak
              src={BLOG_BOAT_PHOTOS.large.src}
              alt="Clever Girl - our flagship 50-person boat perfect for combined bachelor bachelorette parties"
              caption="Clever Girl: Our flagship 50-person boat is ideal for large combined bachelor/bachelorette celebrations"
            />
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section id="why-joint" className="py-16 bg-gradient-to-b from-white to-pink-50 dark:from-gray-950 dark:to-gray-900">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl heading-unbounded font-bold text-center mb-12 text-gray-900 dark:text-white">
              Why Combined Bachelor/Bachelorette Parties Are Trending
            </h2>
            
            <div className="prose prose-lg max-w-none dark:prose-invert mb-8">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                The <strong>joint bachelor bachelorette party</strong> trend has exploded in recent years, and for good reason! Modern couples often share friend groups, prefer inclusive celebrations, and want their wedding parties to bond before the big day. A <strong>combined bachelor bachelorette</strong> celebration on Lake Travis eliminates the stress of coordinating two separate events while creating a more memorable, dynamic party atmosphere. Your <strong>co-ed bachelor party</strong> brings everyone together for shared experiences that strengthen relationships before the wedding.
              </p>
              
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Beyond the social benefits, <strong>joint bach party austin</strong> celebrations make practical sense. You'll cut planning time in half, potentially save money by sharing costs, and avoid the awkwardness of missing each other during separate celebrations. Many couples report that their <strong>bachelor bachelorette boat party</strong> was the highlight of their entire wedding weekend! <Link href="/" className="text-pink-600 hover:text-pink-700 font-semibold">Premier Party Cruises</Link> specializes in creating unforgettable <strong>lake travis combined celebration</strong> experiences that cater to both sides of the wedding party.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="rounded-xl hover:shadow-lg transition-shadow border-2 border-pink-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Heart className="h-8 w-8 text-pink-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Shared Friend Groups</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        Many couples today share mutual friends. A <strong>combined bachelor bachelorette</strong> party means nobody has to choose sides or attend two events. Your <strong>joint bachelor party</strong> keeps everyone together for maximum fun!
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
                      <h4 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Wedding Party Bonding</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        Your <strong>austin co-ed bachelor party</strong> helps bridesmaids and groomsmen get to know each other before wedding day. This creates better group dynamics and more fun wedding photos during your <strong>combined pre-wedding party</strong>!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-xl hover:shadow-lg transition-shadow border-2 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Trophy className="h-8 w-8 text-blue-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Budget-Friendly</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        One <strong>bachelor bachelorette boat party</strong> costs less than two separate events. Share the boat rental, decorations, and activities for your <strong>joint bach party austin</strong> celebration while getting double the fun!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-xl hover:shadow-lg transition-shadow border-2 border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Sparkles className="h-8 w-8 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Less Planning Stress</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        Coordinate one amazing <strong>lake travis combined celebration</strong> instead of managing two separate schedules, venues, and activities. Your <strong>co-ed bachelor party</strong> simplifies everything!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 bg-gradient-to-br from-pink-100 to-purple-100 dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl border-2 border-pink-300">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-3">
                <Crown className="h-8 w-8 text-pink-600" />
                What Couples Say About Joint Celebrations
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                "We loved having everyone together for our <strong>joint bachelor bachelorette party</strong> on Lake Travis! It was so much more fun than splitting up, and our wedding parties really bonded during the <strong>bachelor bachelorette boat party</strong>. Plus, we saved thousands compared to planning two separate weekend trips!" - Sarah & Mike, married June 2025
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Couples consistently report that their <strong>combined bachelor bachelorette</strong> celebration was more memorable and less stressful than traditional separate parties. The <Link href="/atx-disco-cruise" className="text-pink-600 hover:text-pink-700 font-semibold">ATX Disco Cruise</Link> has become the #1 choice for <strong>joint bach party austin</strong> celebrations!
              </p>
            </div>
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section id="atx-disco" className="py-16 bg-white dark:bg-gray-950">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl heading-unbounded font-bold text-center mb-12 text-gray-900 dark:text-white">
              ATX Disco Cruise: The Perfect Joint Celebration Option
            </h2>

            <div className="mb-8">
              <LazyImage 
                src="/attached_assets/dancing-party-scene.webp"
                alt="ATX Disco Cruise joint bachelor bachelorette party celebration"
                className="w-full rounded-2xl shadow-2xl"
              />
            </div>
            
            <div className="prose prose-lg max-w-none dark:prose-invert mb-8">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                The <Link href="/atx-disco-cruise" className="text-purple-600 hover:text-purple-700 font-semibold">ATX Disco Cruise</Link> was practically made for <strong>joint bachelor bachelorette party</strong> celebrations! This public party cruise offers an all-inclusive <strong>bachelor bachelorette boat party</strong> experience with professional DJ, photographer, giant floats, and a high-energy social atmosphere perfect for <strong>co-ed bachelor party</strong> groups. With three time slots available at <strong>$85-$105 per person</strong>, it's one of the most affordable ways to host an epic <strong>combined bachelor bachelorette</strong> celebration on Lake Travis.
              </p>
              
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                What makes the <Link href="/atx-disco-cruise" className="text-purple-600 hover:text-purple-700 font-semibold">ATX Disco Cruise</Link> perfect for your <strong>austin co-ed bachelor party</strong>? You'll get a 4-hour cruise with everything included, the chance to meet other fun-loving groups celebrating on the lake, professional photography capturing all your <strong>joint bach party austin</strong> moments, and zero planning stress—just show up and party! The disco atmosphere, giant lily pads for swimming, and floating dance floor create the ultimate <strong>lake travis combined celebration</strong> experience.
              </p>
            </div>

            <DiscoCruisePricing partyType="combined" className="mb-8" />

            <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl border-2 border-blue-300">
              <h4 className="font-bold text-xl mb-4 text-gray-900 dark:text-white">Why ATX Disco Cruise Works for Joint Parties</h4>
              <div className="grid md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span><strong>No planning required</strong> - Just show up and party for your <strong>joint bachelor bachelorette party</strong></span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span><strong>Social atmosphere</strong> - Meet other fun groups celebrating together</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span><strong>Professional entertainment</strong> - DJ keeps the energy high for your <strong>co-ed bachelor party</strong></span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span><strong>Captured memories</strong> - Professional photographer included</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span><strong>Perfect group size</strong> - Ideal for 6-20 people in your wedding party</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span><strong>Transparent pricing</strong> - Know exactly what you're paying per person</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section id="private-options" className="py-16 bg-gradient-to-b from-white to-blue-50 dark:from-gray-950 dark:to-gray-900">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl heading-unbounded font-bold text-center mb-12 text-gray-900 dark:text-white">
              Private Boat Options for Combined Parties
            </h2>

            <div className="mb-8">
              <LazyImage 
                src="/attached_assets/party-atmosphere-1.webp"
                alt="Private boat rental for joint bachelor bachelorette party"
                className="w-full rounded-2xl shadow-2xl"
              />
            </div>
            
            <div className="prose prose-lg max-w-none dark:prose-invert mb-8">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                If you specifically need complete privacy for your <strong>combined bachelor bachelorette</strong> celebration, <Link href="/private-cruises" className="text-blue-600 hover:text-blue-700 font-semibold">private boat rentals</Link> are available starting at <strong>$1,050-$2,660 for a 4-hour cruise</strong> depending on boat size. However, that's just the base boat rate - to recreate the ATX Disco Cruise experience, you'll need to add professional DJ ($600), photographer ($600), party supplies ($200), and setup/hosting ($200), bringing your total to $2,650+ for a 14-person boat. The <Link href="/atx-disco-cruise" className="text-blue-600 hover:text-blue-700 font-semibold">ATX Disco Cruise</Link> includes ALL of that for just $85-$105 per person!
              </p>
              
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Private boats work best for <strong>joint bach party austin</strong> groups with very specific needs like custom timing outside regular cruise hours, bringing your own professional entertainment team, or requiring absolute privacy for surprise activities. For most <strong>combined bachelor bachelorette</strong> celebrations, the ATX Disco Cruise delivers unmatched value with legendary multi-group party energy you simply can't recreate on a private boat. Your <strong>austin co-ed bachelor party</strong> gets professional entertainment, amazing photos, and an unforgettable <strong>lake travis combined celebration</strong> atmosphere - all included!
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
                  <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">
                    Perfect for intimate <strong>joint bachelor bachelorette party</strong> groups:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Small wedding parties (6-7 per side)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Couple + close friends only</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>~$75-$100 per person split</span>
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
                  <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">
                    Ideal size for most <strong>co-ed bachelor party</strong> celebrations:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>Full wedding parties + dates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>Room for extended friend groups</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>~$60-$95 per person split</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-300 rounded-xl">
                <CardHeader className="bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-900">
                  <CardTitle className="text-xl text-center">75-Guest Boat</CardTitle>
                  <p className="text-3xl font-bold text-center text-green-600 mt-2">$2,660</p>
                  <p className="text-center text-gray-600 dark:text-gray-400 text-sm">4-hour cruise</p>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">
                    For massive <strong>lake travis combined celebration</strong> events:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Large wedding parties + guests</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Multi-group celebrations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>~$35-$55 per person split</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <BlogPhotoStrip
              photos={[
                { ...BLOG_BOAT_PHOTOS.medium, caption: 'Meeseeks: Perfect for 25-person combined parties' },
                { ...BLOG_BOAT_PHOTOS.large, caption: 'Clever Girl: Our flagship for 50-75 guests' }
              ]}
              columns={2}
            />
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section id="planning-tips" className="py-16 bg-white dark:bg-gray-950">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl heading-unbounded font-bold text-center mb-12 text-gray-900 dark:text-white">
              Planning Your Joint Bachelor/Bachelorette Celebration
            </h2>
            
            <div className="prose prose-lg max-w-none dark:prose-invert mb-8">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Successfully planning your <strong>joint bachelor bachelorette party</strong> requires coordination between both sides of the wedding party. Start by discussing expectations with your partner—do you want one big group activity, or separate time before coming together? Many couples choose a hybrid approach: daytime <strong>bachelor bachelorette boat party</strong> on Lake Travis together, then split for separate evening activities downtown if desired during their <strong>austin co-ed bachelor party</strong> weekend.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="border-2 border-pink-200 rounded-xl">
                <CardHeader>
                  <CardTitle className="text-xl text-pink-700 dark:text-pink-400">
                    Communication is Key
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    For your <strong>combined bachelor bachelorette</strong> to succeed, both sides need input on the plans. Create a group chat including bride, groom, and key organizers from both wedding parties to coordinate your <strong>joint bach party austin</strong> activities.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Discuss budget limits, activity preferences, and any concerns early. Some guests might prefer quieter activities while others want non-stop partying—find the balance that works for your <strong>combined pre-wedding party</strong> crew!
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-200 rounded-xl">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-700 dark:text-blue-400">
                    Timing & Logistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Book your <strong>lake travis combined celebration</strong> boat at least 2-3 months in advance, especially for peak wedding season (April-October). Send save-the-dates early so everyone can request time off work and make travel arrangements for your <strong>bachelor bachelorette boat party</strong>.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Consider scheduling your <strong>co-ed bachelor party</strong> 3-4 weeks before the wedding—close enough to build excitement but far enough out to recover from any celebration excesses!
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-200 rounded-xl">
                <CardHeader>
                  <CardTitle className="text-xl text-purple-700 dark:text-purple-400">
                    Budget Planning
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    For <Link href="/atx-disco-cruise" className="text-purple-600 hover:text-purple-700 font-semibold">ATX Disco Cruise</Link>, pricing varies by time slot: Friday 12-4pm ($124.88/person w/tax & gratuity), Saturday 11am-3pm ($137.81/person w/tax & gratuity), or Saturday 3:30-7:30pm ($111.56/person w/tax & gratuity). For <Link href="/private-cruises" className="text-purple-600 hover:text-purple-700 font-semibold">private boats</Link>, you can split the total cost (<strong>$1,050-$2,660</strong>) equally among all attendees for your <strong>joint bachelor bachelorette party</strong>.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Don't forget to budget for beverages (BYOB), food/snacks, decorations, and any optional add-ons like professional photography or catering for your <strong>austin co-ed bachelor party</strong> celebration!
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-200 rounded-xl">
                <CardHeader>
                  <CardTitle className="text-xl text-green-700 dark:text-green-400">
                    Managing Expectations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Not every <strong>combined bachelor bachelorette</strong> activity needs to please everyone perfectly. The beauty of a <strong>bachelor bachelorette boat party</strong> is that it offers something for everyone—swimming and floating for active guests, relaxing on deck for others, dancing for party animals, and quieter conversation areas too.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Build in flexibility for your <strong>lake travis combined celebration</strong> weekend. Maybe the boat party is the main joint event, with optional separate dinners or nightlife afterward for those who want to continue the celebration!
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section id="activities" className="py-16 bg-gradient-to-b from-white to-purple-50 dark:from-gray-950 dark:to-gray-900">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl heading-unbounded font-bold text-center mb-12 text-gray-900 dark:text-white">
              Activities Perfect for Co-Ed Groups
            </h2>
            
            <div className="prose prose-lg max-w-none dark:prose-invert mb-8">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                The beauty of a <strong>co-ed bachelor party</strong> on Lake Travis is the variety of activities that appeal to everyone! Your <strong>bachelor bachelorette boat party</strong> naturally includes swimming, floating on lily pads, dancing on the disco floor, enjoying drinks and snacks, and soaking up the sun. The relaxed lake atmosphere means introverts and extroverts alike can find their comfort zone during your <strong>joint bach party austin</strong> celebration.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 border-2 border-blue-300 rounded-xl">
                <CardContent className="p-6">
                  <Music className="h-12 w-12 text-blue-600 mb-4" />
                  <h4 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Dancing & Entertainment</h4>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Both <Link href="/atx-disco-cruise" className="text-blue-600 hover:text-blue-700">ATX Disco Cruise</Link> and private boats feature premium sound systems. Create collaborative Spotify playlists where both wedding parties add their favorite songs for your <strong>combined bachelor bachelorette</strong> party!
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-900 border-2 border-green-300 rounded-xl">
                <CardContent className="p-6">
                  <Sun className="h-12 w-12 text-green-600 mb-4" />
                  <h4 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Swimming & Floating</h4>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Giant lily pad floats accommodate multiple people, perfect for group photos and bonding during your <strong>lake travis combined celebration</strong>. The crystal-clear water invites everyone to cool off and play!
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-gray-800 dark:to-gray-900 border-2 border-purple-300 rounded-xl">
                <CardContent className="p-6">
                  <Camera className="h-12 w-12 text-purple-600 mb-4" />
                  <h4 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Photo Opportunities</h4>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Lake Travis provides stunning backdrops for wedding party photos. Many couples use their <strong>bachelor bachelorette boat party</strong> photos in their wedding slideshow or save-the-date announcements!
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-gray-800 dark:to-gray-900 border-2 border-pink-300 rounded-xl">
                <CardContent className="p-6">
                  <Users className="h-12 w-12 text-pink-600 mb-4" />
                  <h4 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Group Bonding Games</h4>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Plan icebreaker games, "how well do you know the couple" quizzes, or friendly competitions between bridesmaids and groomsmen during your <strong>austin co-ed bachelor party</strong> for extra fun!
                  </p>
                </CardContent>
              </Card>
            </div>

            <BlogPhotoStrip
              photos={[
                { src: BLOG_PARTY_PHOTOS.bachelor.src, alt: BLOG_PARTY_PHOTOS.bachelor.alt, caption: 'Bachelor party groups love Lake Travis' },
                { src: BLOG_PARTY_PHOTOS.bachelorette.src, alt: BLOG_PARTY_PHOTOS.bachelorette.alt, caption: 'Bachelorette celebrations on the water' }
              ]}
              columns={2}
            />
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section id="budget-guide" className="py-16 bg-white dark:bg-gray-950">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl heading-unbounded font-bold text-center mb-12 text-gray-900 dark:text-white">
              Budget & Cost Comparison Guide
            </h2>
            
            <div className="prose prose-lg max-w-none dark:prose-invert mb-8">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                One of the biggest advantages of a <strong>joint bachelor bachelorette party</strong> is the cost savings! Instead of planning two separate weekend trips with separate accommodations, activities, and meals, you combine resources for one amazing celebration. Let's break down the numbers to show how a <strong>combined bachelor bachelorette</strong> on Lake Travis saves money while delivering double the fun for your <strong>austin co-ed bachelor party</strong>.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl border-2 border-green-300 mb-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Cost Comparison: Separate vs. Joint</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-950 p-6 rounded-xl">
                  <h4 className="font-bold text-lg mb-4 text-red-700 dark:text-red-400">Traditional Separate Parties</h4>
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                    <li className="flex justify-between">
                      <span>Bachelor party boat/activities:</span>
                      <span className="font-bold">$1,500-$3,000</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Bachelorette party boat/activities:</span>
                      <span className="font-bold">$1,500-$3,000</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Separate planning/coordination:</span>
                      <span className="font-bold">$500-$1,000</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Decorations (2x):</span>
                      <span className="font-bold">$300-$600</span>
                    </li>
                    <li className="flex justify-between border-t-2 border-gray-300 pt-2 mt-2">
                      <span className="font-bold">Total Cost:</span>
                      <span className="font-bold text-red-600">$3,800-$7,600</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white dark:bg-gray-950 p-6 rounded-xl ring-4 ring-green-500">
                  <h4 className="font-bold text-lg mb-4 text-green-700 dark:text-green-400">Joint Celebration</h4>
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                    <li className="flex justify-between">
                      <span>One boat for everyone:</span>
                      <span className="font-bold">$1,050-$2,660</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Single planning effort:</span>
                      <span className="font-bold">$200-$400</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Shared decorations:</span>
                      <span className="font-bold">$150-$300</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Shared food/drinks:</span>
                      <span className="font-bold">$400-$800</span>
                    </li>
                    <li className="flex justify-between border-t-2 border-gray-300 pt-2 mt-2">
                      <span className="font-bold">Total Cost:</span>
                      <span className="font-bold text-green-600">$1,800-$4,160</span>
                    </li>
                  </ul>
                  <p className="mt-4 p-3 bg-green-100 dark:bg-green-900 rounded-lg text-center font-bold text-green-800 dark:text-green-200">
                    Save $2,000-$3,440!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section id="timeline" className="py-16 bg-gradient-to-b from-white to-pink-50 dark:from-gray-950 dark:to-gray-900">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl heading-unbounded font-bold text-center mb-12 text-gray-900 dark:text-white">
              Sample Weekend Timeline
            </h2>
            
            <div className="prose prose-lg max-w-none dark:prose-invert mb-8">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Here's a sample timeline for an epic <strong>joint bach party austin</strong> weekend that balances together time with some optional separate activities. This schedule works perfectly for a Saturday celebration, giving everyone Sunday to recover before heading home!
              </p>
            </div>

            <div className="space-y-4">
              <Card className="border-l-4 border-blue-600">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-24 font-bold text-blue-600">11:00 AM</div>
                    <div>
                      <h4 className="font-bold mb-2 text-gray-900 dark:text-white">Marina Meet-Up</h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        Everyone arrives at the marina, loads coolers, applies sunscreen. Time for group photos before boarding your <strong>bachelor bachelorette boat party</strong>!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-purple-600">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-24 font-bold text-purple-600">12:00 PM</div>
                    <div>
                      <h4 className="font-bold mb-2 text-gray-900 dark:text-white">Cruise Departure</h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        <strong>4-hour cruise</strong> begins! DJ starts spinning, first round of drinks poured, giant lily pads deployed for your <strong>lake travis combined celebration</strong>.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-pink-600">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-24 font-bold text-pink-600">2:00 PM</div>
                    <div>
                      <h4 className="font-bold mb-2 text-gray-900 dark:text-white">Peak Party Time</h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        Swimming, dancing, group games, toasts to the couple during your <strong>co-ed bachelor party</strong>. Professional photographer captures all the fun moments!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-green-600">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-24 font-bold text-green-600">4:00 PM</div>
                    <div>
                      <h4 className="font-bold mb-2 text-gray-900 dark:text-white">Return to Marina</h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        Cruise ends, everyone heads back to hotels/Airbnbs to shower and change for evening activities after your amazing <strong>combined bachelor bachelorette</strong> day.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-orange-600">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-24 font-bold text-orange-600">7:00 PM</div>
                    <div>
                      <h4 className="font-bold mb-2 text-gray-900 dark:text-white">Group Dinner (Optional)</h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        Joint dinner at Austin restaurant, or split into separate dinners if groups want different vibes for your <strong>austin co-ed bachelor party</strong> evening.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-red-600">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-24 font-bold text-red-600">9:00 PM</div>
                    <div>
                      <h4 className="font-bold mb-2 text-gray-900 dark:text-white">Austin Nightlife</h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        Hit Sixth Street, Rainey Street, or West 6th together or separately. Many groups reunite at one final bar to end the <strong>joint bach party austin</strong> night together!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section id="testimonials" className="py-16 bg-white dark:bg-gray-950">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl heading-unbounded font-bold text-center mb-12 text-gray-900 dark:text-white">
              Real Couple Experiences
            </h2>

            <BlogPartyGallery title="Combined Celebration Moments on Lake Travis" />
            
            <div className="space-y-6">
              <Card className="border-2 border-pink-300 rounded-xl">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <Heart className="h-8 w-8 text-pink-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-lg text-gray-900 dark:text-white">Emily & Jake - June 2025</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">ATX Disco Cruise | 16 guests</p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 italic">
                    "We LOVED having a <strong>joint bachelor bachelorette party</strong>! The <Link href="/atx-disco-cruise" className="text-pink-600 hover:text-pink-700">ATX Disco Cruise</Link> was perfect because we didn't have to plan anything—just showed up and had the best time. Our wedding parties got to know each other, and we have amazing photos from our <strong>bachelor bachelorette boat party</strong>. Plus, we saved SO much money compared to doing two separate trips. 10/10 recommend!"
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-300 rounded-xl">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <Users className="h-8 w-8 text-blue-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-lg text-gray-900 dark:text-white">Marcus & Alicia - September 2025</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Private 50-person boat | 42 guests</p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 italic">
                    "We rented a private boat for our <strong>combined bachelor bachelorette</strong> party and it was EPIC! With 42 people, we needed the space and privacy. The crew was amazing, the lake was beautiful, and having both our wedding parties together created bonds that made our wedding day even more special. Worth every penny for our <strong>lake travis combined celebration</strong>!"
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-300 rounded-xl">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <Star className="h-8 w-8 text-purple-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-lg text-gray-900 dark:text-white">Taylor & Chris - April 2025</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Private 25-person boat | 24 guests</p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 italic">
                    "As a same-sex couple, we loved that a <strong>co-ed bachelor party</strong> on Lake Travis felt completely natural and inclusive. Everyone had an absolute blast on our <strong>austin co-ed bachelor party</strong>, and the boat crew was so supportive and fun. This was hands-down the best decision we made for our <strong>combined pre-wedding party</strong> celebration!"
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section className="py-16 bg-gradient-to-b from-white to-purple-50 dark:from-gray-950 dark:to-gray-900">
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-gradient-to-br from-pink-100 to-purple-100 dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl border-2 border-pink-300">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-3">
                <Heart className="h-8 w-8 text-pink-600" />
                Ready to Plan Your Joint Celebration?
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Why celebrate separately when you can create unforgettable memories together? A <strong>joint bachelor bachelorette party</strong> on Lake Travis offers the perfect combination of fun, affordability, and bonding for your entire wedding party. Whether you choose the all-inclusive <Link href="/atx-disco-cruise" className="text-pink-600 hover:text-pink-700 font-semibold">ATX Disco Cruise</Link> experience or a <Link href="/private-cruises" className="text-pink-600 hover:text-pink-700 font-semibold">private boat rental</Link>, your <strong>bachelor bachelorette boat party</strong> will be the highlight of your wedding festivities.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                <Link href="/" className="text-pink-600 hover:text-pink-700 font-semibold">Premier Party Cruises</Link> specializes in creating perfect <strong>combined bachelor bachelorette</strong> celebrations that bring wedding parties together. Our experienced crew handles all the details, from coordinating with <a href="https://partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-700 font-semibold">Party On Delivery</a> for beverages to positioning the boat for optimal swimming and photo opportunities. Contact us today to start planning your epic <strong>lake travis combined celebration</strong>!
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/chat">
                  <Button size="lg" className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold">
                    <Calendar className="h-5 w-5 mr-2" />
                    Plan Your Joint Party
                  </Button>
                </Link>
                <Link href="/atx-disco-cruise">
                  <Button size="lg" variant="outline" className="border-2 border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white font-bold">
                    <Ship className="h-5 w-5 mr-2" />
                    View ATX Disco Cruise
                  </Button>
                </Link>
              </div>
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
          "headline": "Joint Bachelor/Bachelorette Parties With Premier Party Cruises",
          "description": "Plan the perfect combined bachelor bachelorette party on Lake Travis! ATX Disco Cruise and private boats offer unforgettable co-ed celebrations. Save money, maximize fun!",
          "image": [
            "https://premierpartycruises.com/attached_assets/atx-disco-cruise-party.webp",
            "https://premierpartycruises.com/attached_assets/dancing-party-scene.webp",
            "https://premierpartycruises.com/attached_assets/party-atmosphere-1.webp"
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
            "@id": "https://premierpartycruises.com/blogs/joint-bachelor-bachelorette-parties-with-premier-party-cruises"
          }
        })}
      </script>
    </div>
  );
}

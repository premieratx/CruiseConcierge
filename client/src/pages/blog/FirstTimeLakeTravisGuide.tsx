import { BlogPostLayout, TOCSection } from '@/components/blog/BlogPostLayout';
import { BlogCTA } from '@/components/blog/BlogCTA';
import { LazyImage } from '@/components/LazyImage';
import { SectionReveal } from '@/components/SectionReveal';
import { Link } from 'wouter';
import { bachelorPartyBlogImages } from '@/lib/blogImages';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { 
  Anchor, Ship, Users, Calendar, Shield, 
  CheckCircle, Sparkles, Sun, Beer, MapPin
} from 'lucide-react';

const sections: TOCSection[] = [
  { id: 'introduction', title: 'Introduction', icon: <Anchor /> },
  { id: 'choosing-boat', title: 'Choosing Your Perfect Vessel', icon: <Ship /> },
  { id: 'rental-options', title: 'Understanding Rental Options', icon: <Calendar /> },
  { id: 'safety-tips', title: 'Safety on Lake Travis', icon: <Shield /> },
  { id: 'what-to-bring', title: 'What to Bring', icon: <CheckCircle /> },
  { id: 'atx-vs-private', title: 'ATX Disco vs Private Cruises', icon: <Users /> },
  { id: 'planning-tips', title: 'Planning Tips', icon: <Sparkles /> },
  { id: 'faq', title: 'FAQ', icon: <MapPin /> },
];

export default function FirstTimeLakeTravisGuide() {
  return (
    <BlogPostLayout
      title="First-Time Lake Travis Boat Rental: Essential Tips for Austin Party Planning"
      metaDescription="Planning your first Lake Travis boat rental in Austin? Get essential tips for a perfect party, from choosing the right boat to safety and planning. Your ultimate guide to fun on Lake Travis!"
      publishDate="2025-01-10"
      author="Premier Party Cruises"
      heroImage="/attached_assets/atx-disco-cruise-party.webp"
      heroImageAlt="Austin bachelor party and bachelorette party celebration on Lake Travis party boat"
      keywords={[
        'lake travis boat rental',
        'first time boat rental',
        'austin party planning',
        'lake travis party boat',
        'austin boat rental guide',
        'lake travis tips',
        'party boat austin',
        'lake travis cruises',
      ]}
      sections={sections}
      pageRoute="/blogs/first-time-lake-travis-boat-rental-essential-tips-for-austin-party-planning"
    >
      {/* Introduction */}
      <SectionReveal>
        <section id="introduction" className="mb-12" data-testid="section-introduction">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white" data-testid="heading-introduction">
            Your Gateway to an Unforgettable Lake Travis Experience
          </h2>
          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            Austin, Texas, boasts a vibrant culture and the stunning beauty of Lake Travis. If you're planning 
            a <Link href="/bachelor-party-austin" className="text-brand-blue hover:underline font-semibold" data-testid="link-bachelor-party">
            bachelor party</Link>, <Link href="/bachelorette-party-austin" className="text-brand-blue hover:underline font-semibold" data-testid="link-bachelorette-party">
            bachelorette celebration</Link>, birthday bash, or corporate event, a Lake Travis boat party offers 
            the perfect combination of excitement and scenic beauty. Consider our famous <Link href="/atx-disco-cruise" className="text-brand-blue hover:underline font-bold" data-testid="link-atx-disco-intro">
            ATX Disco Cruise</Link> for an all-inclusive party experience!
          </p>
          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            This comprehensive guide from <Link href="/" className="text-brand-blue hover:underline font-bold" data-testid="link-premier-home">
            Premier Party Cruises</Link> will equip you with everything you need to know for a confident first 
            Lake Travis boat rental, ensuring smooth Austin party planning from start to finish.
          </p>

          <div className="my-8">
            <LazyImage
              src="/attached_assets/day-tripper-14-person-boat.webp"
              alt="14-person Lake Travis party boat perfect for Austin bachelor party or bachelorette party"
              className="rounded-lg shadow-lg w-full h-auto"
              data-testid="image-day-tripper-boat"
            />
          </div>

          <div className="bg-brand-blue/10 border-l-4 border-brand-blue p-6 my-6 rounded">
            <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              ⚓ Why Lake Travis?
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Lake Travis is one of the largest lakes in Texas, offering <strong>65 miles of pristine waterways</strong>, 
              crystal-clear water, and stunning Hill Country views. With <strong>over 270 days of sunshine</strong> per 
              year, it's the perfect setting for unforgettable celebrations on the water.
            </p>
          </div>
        </section>
      </SectionReveal>

      {/* Primary CTA after introduction */}
      <div className="my-8 flex justify-center gap-4 flex-wrap">
        <BlogCTA variant="primary" text="Book Your Cruise Now" href="/atx-disco-cruise" external={false} />
        <BlogCTA variant="secondary" text="Get Free Quote" external={false} />
      </div>

      {/* Choosing Your Perfect Vessel */}
      <SectionReveal>
        <section id="choosing-boat" className="mb-12" data-testid="section-choosing-boat">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3" data-testid="heading-choosing-boat">
            <Ship className="text-brand-blue" /> Choosing Your Perfect Party Vessel
          </h2>
          
          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            Lake Travis offers diverse boat options, but not all are created equal. At <Link href="/" className="text-brand-blue hover:underline font-semibold" data-testid="link-premier-boats">
            Premier Party Cruises</Link>, our fleet consists of <strong>custom-built, high-end single-deck party boats</strong> designed 
            specifically for celebrations. These aren't your typical pontoons or yachts – they're purpose-built party platforms.
          </p>

          <div className="my-8">
            <LazyImage
              src="/attached_assets/clever-girl-50-person-boat.webp"
              alt="50-person party boat Austin for large bachelor party or bachelorette party on Lake Travis"
              className="rounded-lg shadow-lg w-full h-auto"
              data-testid="image-clever-girl-boat"
            />
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg my-6">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Our Fleet Options:</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-brand-blue pl-4">
                <h4 className="font-bold text-lg text-gray-900 dark:text-white">14-Person Boat</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Perfect for intimate gatherings, smaller bachelor/bachelorette groups, or close friends celebrating together. 
                  Includes captain, fuel, and all amenities.
                </p>
              </div>
              <div className="border-l-4 border-brand-blue pl-4">
                <h4 className="font-bold text-lg text-gray-900 dark:text-white">25-Person Boat</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  The sweet spot for most celebrations – large enough for a great party atmosphere while staying personal. 
                  Ideal for medium-sized bachelor/bachelorette parties.
                </p>
              </div>
              <div className="border-l-4 border-brand-blue pl-4">
                <h4 className="font-bold text-lg text-gray-900 dark:text-white">50-Person Boat</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Our flagship party vessel for large celebrations, corporate events, or combined bachelor/bachelorette parties. 
                  Maximum space for dancing, socializing, and creating epic memories.
                </p>
              </div>
            </div>
          </div>

          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            With <strong>14+ years of experience and 150,000+ satisfied customers</strong>, Premier Party Cruises 
            maintains a <strong>perfect safety record</strong> while delivering unforgettable Lake Travis experiences. 
            Learn more about our <Link href="/private-cruises" className="text-brand-blue hover:underline font-semibold" data-testid="link-private-cruises">
            private cruise options</Link>.
          </p>
        </section>
      </SectionReveal>

      {/* Understanding Rental Options */}
      <SectionReveal>
        <section id="rental-options" className="mb-12" data-testid="section-rental-options">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3" data-testid="heading-rental-options">
            <Calendar className="text-brand-blue" /> Understanding Rental Options and Inclusions
          </h2>
          
          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            When booking your first Lake Travis boat rental, it's crucial to understand what's included. At Premier 
            Party Cruises, our packages are designed to be <strong>all-inclusive and transparent</strong> – no hidden 
            fees or surprise charges.
          </p>

          <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <LazyImage
              src={bachelorPartyBlogImages[0].src}
              alt="Austin bachelor party celebration on Lake Travis party boat rental"
              className="rounded-lg shadow-lg w-full h-auto"
              data-testid="image-party-celebration-1"
            />
            <LazyImage
              src={bachelorPartyBlogImages[2].src}
              alt="Bachelorette party group enjoying party boat Austin on Lake Travis"
              className="rounded-lg shadow-lg w-full h-auto"
              data-testid="image-party-celebration-2"
            />
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg my-6">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Every Rental Includes:</h3>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                <span><strong>Professional Captain:</strong> Licensed, experienced, and knows all the best spots on Lake Travis</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                <span><strong>Fuel & Cleaning:</strong> All operational costs covered – you just show up and party</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                <span><strong>Premium Sound System:</strong> Bluetooth-enabled for your custom playlist</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                <span><strong>Water Toys & Floats:</strong> Lily pads, rafts, and inflatables for swimming fun</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                <span><strong>Coolers & Ice:</strong> Keep your beverages cold (BYOB – Bring Your Own Beverages)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                <span><strong>Life Jackets:</strong> Available for swimming – encouraged for safety</span>
              </li>
            </ul>
          </div>

          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            Consider rental duration (typically 3-4 hours), guest count, and desired activities when booking. 
            Visit our <Link href="/private-cruises" className="text-brand-blue hover:underline font-semibold" data-testid="link-packages">
            packages page</Link> for detailed pricing.
          </p>
        </section>
      </SectionReveal>

      {/* Safety Tips */}
      <SectionReveal>
        <section id="safety-tips" className="mb-12" data-testid="section-safety-tips">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3" data-testid="heading-safety-tips">
            <Shield className="text-brand-blue" /> Navigating Lake Travis Safely and Responsibly
          </h2>
          
          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            Safety is paramount on Lake Travis. With our <strong>perfect safety record over 14+ years</strong>, 
            Premier Party Cruises takes every precaution to ensure your celebration is both fun and secure.
          </p>

          <div className="bg-brand-blue/10 border-l-4 border-brand-blue p-6 my-6 rounded">
            <p className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              🛟 Captain Brian's Safety Philosophy:
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              "Don't be a dick and don't die." – Simple, direct, and effective. But there's more to staying safe on the lake:
            </p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>• <strong>Always listen to your captain's instructions</strong></li>
              <li>• <strong>Be aware of your surroundings</strong> when swimming</li>
              <li>• <strong>Life jackets are available</strong> and encouraged for swimming</li>
              <li>• <strong>Stay hydrated</strong> – Texas sun is no joke</li>
              <li>• <strong>Pace yourself</strong> with alcohol consumption</li>
            </ul>
          </div>

          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            Our experienced captains know Lake Travis like the back of their hand – from the best swimming coves 
            to weather patterns. Trust their expertise and you'll have a safe, memorable experience.
          </p>
        </section>
      </SectionReveal>

      {/* What to Bring */}
      <SectionReveal>
        <section id="what-to-bring" className="mb-12" data-testid="section-what-to-bring">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3" data-testid="heading-what-to-bring">
            <Sun className="text-brand-blue" /> What to Bring for Your Lake Travis Adventure
          </h2>
          
          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            Packing smart makes all the difference between a good day and a <em>great</em> day on Lake Travis. 
            Here's your essential checklist:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                <Sun className="text-yellow-500" /> Sun Protection
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Reef-safe sunscreen (SPF 50+)</li>
                <li>• Sunglasses with strap</li>
                <li>• Hats (secure them – lake wind!)</li>
                <li>• Lightweight cover-ups</li>
              </ul>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                <Beer className="text-brand-blue" /> Beverages & Food
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Your favorite drinks (BYOB)</li>
                <li>• Plenty of water bottles</li>
                <li>• Snacks and easy finger foods</li>
                <li>• Electrolyte packets (Liquid I.V., etc.)</li>
              </ul>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                <Sparkles className="text-purple-500" /> Swim & Fun
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Swimsuits and towels</li>
                <li>• Flip-flops or boat shoes</li>
                <li>• Waterproof phone cases</li>
                <li>• Portable speakers (backup)</li>
              </ul>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                <Users className="text-green-500" /> Party Essentials
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Costumes or themed outfits</li>
                <li>• Decorations (nothing loose!)</li>
                <li>• Waterproof cameras/GoPros</li>
                <li>• Good vibes and party energy!</li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-6 my-6 rounded">
            <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              ⚠️ What NOT to Bring:
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Glass containers (banned on lake), red wine (stains the boat), glitter (gets everywhere), 
              or anything you'd be devastated to lose overboard. Keep valuables secure!
            </p>
          </div>
        </section>
      </SectionReveal>

      {/* Mid-page CTA */}
      <div className="my-12 flex justify-center">
        <BlogCTA variant="primary" text="Book Your Lake Travis Party" external={false} />
      </div>

      {/* ATX Disco vs Private Cruises */}
      <SectionReveal>
        <section id="atx-vs-private" className="mb-12" data-testid="section-atx-vs-private">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3" data-testid="heading-atx-vs-private">
            <Users className="text-brand-blue" /> ATX Disco Cruise vs Private Cruises
          </h2>
          
          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            First-time renters often ask: "Should I book the <Link href="/atx-disco-cruise" className="text-brand-blue hover:underline font-bold" data-testid="link-atx-disco">
            ATX Disco Cruise</Link> or a <Link href="/private-cruises" className="text-brand-blue hover:underline font-bold" data-testid="link-private">
            Private Cruise</Link>?" Here's how to decide:
          </p>

          <div className="my-8">
            <LazyImage
              src={bachelorPartyBlogImages[1].src}
              alt="ATX Disco Cruise party boat Austin with bachelor and bachelorette party groups on Lake Travis"
              className="rounded-lg shadow-lg w-full h-auto"
              data-testid="image-atx-disco-party"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div className="bg-gradient-to-br from-brand-blue/10 to-purple-500/10 p-6 rounded-lg border-2 border-brand-blue">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                🪩 ATX Disco Cruise
              </h3>
              <p className="text-lg font-semibold text-brand-blue dark:text-brand-blue mb-4">
                The ONLY Multi-Group All-Inclusive Bachelor/Bachelorette Party Cruise in the U.S.
              </p>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                  <span><strong>4-hour all-inclusive experience</strong> (10am-2pm or 2pm-6pm)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                  <span><strong>Multiple bachelor/bachelorette parties</strong> on one boat</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                  <span><strong>Professional DJ</strong> spinning party hits</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                  <span><strong>BYOB</strong> – order from Party On Delivery for drinks on ice when you arrive</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                  <span><strong>Social atmosphere</strong> – meet other groups</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                  <span><strong>Add-on packages available</strong> (photographer, party supplies)</span>
                </li>
              </ul>
              <div className="mt-6">
                <Link href="/atx-disco-cruise" className="block text-center bg-brand-blue text-white px-6 py-3 rounded-lg font-bold hover:bg-brand-blue/90 transition-colors" data-testid="link-atx-cta">
                  Learn More About ATX Disco
                </Link>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 p-6 rounded-lg border-2 border-green-500">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                🚤 Private Cruises
              </h3>
              <p className="text-lg font-semibold text-green-600 dark:text-green-400 mb-4">
                Exclusive Boat Just for Your Group
              </p>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                  <span><strong>Private boat rental</strong> (14, 25, or 50-person capacity)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                  <span><strong>Flexible duration</strong> (3-4+ hours available)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                  <span><strong>BYOB</strong> – bring whatever you want</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                  <span><strong>Custom itinerary</strong> with your captain</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                  <span><strong>Add DJ, photographer, bartender</strong> for extra</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                  <span><strong>Perfect for exclusive events</strong> and intimate groups</span>
                </li>
              </ul>
              <div className="mt-6">
                <Link href="/private-cruises" className="block text-center bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors" data-testid="link-private-cta">
                  Explore Private Options
                </Link>
              </div>
            </div>
          </div>

          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300 font-semibold">
            <strong>Quick Decision Guide:</strong> Choose ATX Disco Cruise for an all-inclusive party atmosphere 
            with other groups. Choose Private Cruise for exclusive use of the boat with complete customization.
          </p>
        </section>
      </SectionReveal>

      {/* Planning Tips */}
      <SectionReveal>
        <section id="planning-tips" className="mb-12" data-testid="section-planning-tips">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3" data-testid="heading-planning-tips">
            <Sparkles className="text-brand-blue" /> Maximizing Your First-Time Boat Rental Experience
          </h2>
          
          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            To ensure your first Lake Travis boat rental is absolutely epic, follow these insider tips from our 
            14+ years of experience:
          </p>

          <div className="space-y-6 my-8">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
                <Calendar className="text-brand-blue" /> 1. Book Early (Especially Peak Season)
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Lake Travis is busiest <strong>March-October</strong>, with weekends filling up weeks in advance. 
                For bachelor/bachelorette parties, book <strong>4-6 weeks ahead</strong>. Last-minute bookings are 
                sometimes available, but don't risk it for important celebrations.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
                <Users className="text-green-500" /> 2. Get an Accurate Headcount
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Boat capacity limits are <strong>strict for safety</strong>. Don't underestimate – if you say 12 
                people and 15 show up, not everyone gets on the boat. Add 10-20% buffer when booking to account 
                for plus-ones.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
                <Sun className="text-yellow-500" /> 3. Check the Weather (But Don't Obsess)
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Austin weather can be unpredictable. Light rain? We still cruise (it's actually fun!). Thunderstorms 
                or high winds? We'll work with you to reschedule. Our captains monitor conditions constantly and 
                prioritize safety.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
                <MapPin className="text-red-500" /> 4. Plan Transportation to/from Marina
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Lake Travis marinas are <strong>30-45 minutes from downtown Austin</strong>. Arrange rideshares, 
                party buses, or designate drivers. <strong>Do NOT drink and drive</strong> – your safety and others' 
                depends on it.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
                <CheckCircle className="text-green-500" /> 5. Communicate with Your Rental Company
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Have questions? Ask! At Premier Party Cruises, we're here to help. Special requests, dietary concerns, 
                accessibility needs – we'll do our best to accommodate. Clear communication prevents day-of surprises.
              </p>
            </div>
          </div>

          <div className="bg-brand-blue/10 border-l-4 border-brand-blue p-6 my-6 rounded">
            <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              💡 Pro Tip: The "After-Party" Matters Too
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Plan your post-cruise activities! Many groups continue the party at 6th Street bars, nearby restaurants, 
              or Airbnb pools. Having a loose plan keeps the energy going and prevents that awkward "what now?" moment.
            </p>
          </div>
        </section>
      </SectionReveal>

      {/* FAQ Section */}
      <SectionReveal>
        <section id="faq" className="mb-12" data-testid="section-faq">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3" data-testid="heading-faq">
            <MapPin className="text-brand-blue" /> Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                Q: What types of boats can I rent on Lake Travis?
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>A:</strong> Lake Travis offers pontoons, party barges, and yacht charters. At Premier Party Cruises, 
                we specialize in <strong>custom-built, high-end single-deck party boats</strong> in 14, 25, and 50-person capacities – 
                purpose-built for celebrations, not standard pontoons.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                Q: Is alcohol allowed on Lake Travis boat rentals?
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>A:</strong> Yes! Lake Travis is BYOB-friendly. ALL cruises (including ATX Disco Cruise) are BYOB – bring your own beer, wine, seltzers in cans or plastic (no glass). Order from <a href="https://partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline font-semibold">Party On Delivery</a> to have drinks on ice ready when you arrive!
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                Q: Do I need a license to drive a boat on Lake Travis?
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>A:</strong> No! All Premier Party Cruises rentals include a <strong>professional, licensed captain</strong>. 
                You just relax and enjoy – no boating experience required.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                Q: How far in advance should I book my Lake Travis boat rental?
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>A:</strong> For peak season (March-October) and weekends, book <strong>4-6 weeks in advance</strong>. 
                For weekdays or off-season, 2-3 weeks is usually sufficient. Last-minute availability exists but isn't guaranteed.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                Q: What should I bring for a day on Lake Travis?
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>A:</strong> Essentials include: reef-safe sunscreen, towels, swimwear, hats, sunglasses, plenty of water, 
                your favorite beverages (BYOB), snacks, and good vibes! See our full packing list above.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                Q: What's the difference between ATX Disco Cruise and Private Cruise?
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>A:</strong> <strong>ATX Disco Cruise</strong> is a 4-hour all-inclusive multi-group party experience 
                with professional DJ, photographer, and giant floats (BYOB – order from Party On Delivery). <strong>Private Cruise</strong> gives you exclusive use 
                of a boat for your group only, with BYOB and complete customization.
              </p>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Quote Builder Section */}
      <QuoteBuilderSection />

      {/* Final CTA */}
      <div className="my-12 bg-gradient-to-r from-brand-blue to-purple-600 text-white p-8 rounded-lg text-center">
        <h2 className="text-3xl font-bold mb-4">Your Unforgettable Lake Travis Adventure Awaits</h2>
        <p className="text-xl mb-6">
          Planning your first Lake Travis boat rental is easy with Premier Party Cruises. From selecting 
          the perfect vessel to seamless execution, every detail is handled by our experienced team.
        </p>
        <p className="text-lg mb-8">
          <strong>14+ years of experience. 150,000+ happy customers. Perfect safety record.</strong>
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link 
            href="/atx-disco-cruise" 
            className="bg-white text-brand-blue px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors inline-block"
            data-testid="link-final-cta-disco"
          >
            Book ATX Disco Cruise
          </Link>
          <Link 
            href="/private-cruises" 
            className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-colors inline-block"
            data-testid="link-final-cta-private"
          >
            Explore Private Cruises
          </Link>
        </div>
      </div>
    </BlogPostLayout>
  );
}

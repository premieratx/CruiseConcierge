import { BlogPostLayout, TOCSection } from '@/components/blog/BlogPostLayout';
import { BlogCTA } from '@/components/blog/BlogCTA';
import { LazyImage } from '@/components/LazyImage';
import { SectionReveal } from '@/components/SectionReveal';
import { Link } from 'wouter';
import { 
  Anchor, Ship, Users, Calendar, Shield, 
  CheckCircle, Sparkles, Wine, MapPin, Building2,
  Heart, Cake, PartyPopper, Briefcase
} from 'lucide-react';

const sections: TOCSection[] = [
  { id: 'introduction', title: 'Introduction', icon: <Anchor /> },
  { id: 'integration-power', title: 'The Power of Integration', icon: <Sparkles /> },
  { id: 'bachelor-bachelorette', title: 'Bachelor & Bachelorette Parties', icon: <PartyPopper /> },
  { id: 'corporate-events', title: 'Corporate Events', icon: <Briefcase /> },
  { id: 'weddings-birthdays', title: 'Weddings & Birthdays', icon: <Cake /> },
  { id: 'safety-experience', title: 'Safety & Experience', icon: <Shield /> },
  { id: 'faq', title: 'FAQ', icon: <MapPin /> },
];

export default function IntegratedAustinEventServices() {
  return (
    <BlogPostLayout
      title="Integrated Austin Event Services: Alcohol Delivery & Boat Rentals"
      metaDescription="Planning an event in Austin? Discover how Premier Party Cruises offers seamless Lake Travis boat rentals for bachelor/bachelorette parties, corporate events, weddings, and more."
      publishDate="2025-01-15"
      author="Premier Party Cruises"
      heroImage="/attached_assets/atx-disco-cruise-party.webp"
      heroImageAlt="Austin event celebration on Lake Travis party boat"
      keywords={[
        'Austin event services',
        'Lake Travis party planning',
        'Austin party boat rental',
        'bachelor party Austin',
        'bachelorette party Austin',
        'corporate events Austin',
        'Lake Travis celebrations',
      ]}
      sections={sections}
      pageRoute="/blogs/integrated-austin-event-services-combining-alcohol-delivery-and-boat-rentals-for-perfect-celebrations"
    >
      <SectionReveal>
        <section id="introduction" className="mb-12" data-testid="section-introduction">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white" data-testid="heading-introduction">
            Your Ultimate Guide to Seamless Austin Event Planning
          </h2>
          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            Austin, Texas, is renowned for its vibrant culture, live music, and stunning natural beauty, 
            especially around Lake Travis. When planning an unforgettable event in this vibrant city, 
            the details can feel overwhelming. From securing the perfect venue to arranging entertainment, 
            every element plays a crucial role.
          </p>
          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            <Link href="/" className="text-brand-blue hover:underline font-bold" data-testid="link-premier-home">
            Premier Party Cruises</Link> has revolutionized event planning by offering seamless Lake Travis 
            party boat experiences for all your celebration needs. Whether you're orchestrating a lively{' '}
            <Link href="/bachelor-party-austin" className="text-brand-blue hover:underline font-semibold" data-testid="link-bachelor">
            bachelor</Link> or{' '}
            <Link href="/bachelorette-party-austin" className="text-brand-blue hover:underline font-semibold" data-testid="link-bachelorette">
            bachelorette party</Link>, a sophisticated corporate event, a memorable wedding, or a joyous 
            birthday bash, our expertise ensures your Austin event is not just successful, but truly legendary.
          </p>

          <div className="my-8">
            <LazyImage
              src="/attached_assets/day-tripper-14-person-boat.webp"
              alt="Party boat on Lake Travis for Austin events"
              className="rounded-lg shadow-lg w-full h-auto"
              data-testid="image-party-boat"
            />
          </div>

          <div className="bg-brand-blue/10 border-l-4 border-brand-blue p-6 my-6 rounded">
            <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              🎉 Why Choose Premier Party Cruises?
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              With <strong>15+ years of experience</strong> and over <strong>150,000 satisfied customers</strong>, 
              Premier Party Cruises is the undisputed leader in Lake Travis party boat rentals. We offer an 
              unparalleled experience with everything from state-of-the-art sound systems to comfortable 
              seating and extensive safety gear.
            </p>
          </div>
        </section>
      </SectionReveal>

      <div className="my-8 flex justify-center gap-4 flex-wrap">
        <BlogCTA variant="primary" text="Book Your Party Cruise" href="/atx-disco-cruise" external={false} />
        <BlogCTA variant="secondary" text="Get Free Quote" external={false} />
      </div>

      <SectionReveal>
        <section id="integration-power" className="mb-12" data-testid="section-integration-power">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3" data-testid="heading-integration-power">
            <Sparkles className="text-brand-blue" /> The Power of Integration
          </h2>
          
          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            In today's fast-paced world, convenience is king, especially when planning events. The traditional 
            approach often involves juggling multiple vendors, coordinating deliveries, and hoping everything 
            aligns perfectly. This fragmented process can lead to stress, delays, and unexpected complications.
          </p>

          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg my-6">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">What's Included with Every Cruise:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                <span className="text-gray-700 dark:text-gray-300"><strong>Professional Captain</strong> – Licensed and experienced</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                <span className="text-gray-700 dark:text-gray-300"><strong>Premium Sound System</strong> – Bluetooth-enabled</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                <span className="text-gray-700 dark:text-gray-300"><strong>Fuel & Cleaning</strong> – All operational costs covered</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                <span className="text-gray-700 dark:text-gray-300"><strong>Water Toys & Floats</strong> – Lily pads and inflatables</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                <span className="text-gray-700 dark:text-gray-300"><strong>Coolers & Ice</strong> – Keep beverages cold (BYOB)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                <span className="text-gray-700 dark:text-gray-300"><strong>Safety Equipment</strong> – Life jackets for all guests</span>
              </div>
            </div>
          </div>

          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            Our streamlined approach saves you time and effort, providing a cohesive, high-quality event 
            experience. We understand the unique rhythm of Austin and the importance of a smooth, enjoyable 
            planning process. Learn more about our{' '}
            <Link href="/private-cruises" className="text-brand-blue hover:underline font-semibold" data-testid="link-private-cruises">
            private cruise options</Link>.
          </p>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section id="bachelor-bachelorette" className="mb-12" data-testid="section-bachelor-bachelorette">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3" data-testid="heading-bachelor-bachelorette">
            <PartyPopper className="text-brand-blue" /> Bachelor & Bachelorette Parties
          </h2>
          
          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            Austin is a premier destination for{' '}
            <Link href="/bachelor-party-austin" className="text-brand-blue hover:underline font-semibold">
            bachelor</Link> and{' '}
            <Link href="/bachelorette-party-austin" className="text-brand-blue hover:underline font-semibold">
            bachelorette parties</Link>, and we make sure yours is legendary. Imagine a day on Lake Travis 
            with your closest friends, enjoying the sun, music, and refreshing drinks.
          </p>

          <div className="my-8">
            <LazyImage
              src="/attached_assets/clever-girl-3-bachelorette-boat.jpg"
              alt="Bachelorette party celebration on Lake Travis"
              className="rounded-lg shadow-lg w-full h-auto"
              data-testid="image-bachelorette"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div className="bg-gradient-to-br from-brand-blue/10 to-purple-500/10 p-6 rounded-lg border-2 border-brand-blue">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                🪩 ATX Disco Cruise
              </h3>
              <p className="text-lg font-semibold text-brand-blue mb-4">
                The ONLY Multi-Group All-Inclusive Party Cruise in the U.S.
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• 4-hour all-inclusive experience</li>
                <li>• Professional DJ spinning party hits</li>
                <li>• Multiple groups celebrating together</li>
                <li>• Social atmosphere – meet new people</li>
                <li>• BYOB – order drinks ahead</li>
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
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Private boat (14, 30, or 75-person capacity)</li>
                <li>• Flexible duration (3-4+ hours)</li>
                <li>• BYOB – bring whatever you want</li>
                <li>• Custom itinerary with your captain</li>
                <li>• Add DJ, photographer, bartender</li>
              </ul>
              <div className="mt-6">
                <Link href="/private-cruises" className="block text-center bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors" data-testid="link-private-cta">
                  Explore Private Options
                </Link>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section id="corporate-events" className="mb-12" data-testid="section-corporate-events">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3" data-testid="heading-corporate-events">
            <Briefcase className="text-brand-blue" /> Corporate Events
          </h2>
          
          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            Elevate your next{' '}
            <Link href="/corporate-events" className="text-brand-blue hover:underline font-semibold">
            corporate event</Link> with a unique Austin twist. Our services provide a refreshing alternative 
            to traditional venues, offering a dynamic setting on Lake Travis. From{' '}
            <Link href="/team-building" className="text-brand-blue hover:underline font-semibold">
            team-building cruises</Link> to client appreciation events, we ensure a professional and 
            memorable experience.
          </p>

          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg my-6">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Perfect for:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border-l-4 border-brand-blue pl-4">
                <h4 className="font-bold text-lg text-gray-900 dark:text-white">Team Building</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Build camaraderie outside the office with a memorable cruise experience.
                </p>
              </div>
              <div className="border-l-4 border-brand-blue pl-4">
                <h4 className="font-bold text-lg text-gray-900 dark:text-white">Client Entertainment</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Impress clients with a unique VIP experience on Lake Travis.
                </p>
              </div>
              <div className="border-l-4 border-brand-blue pl-4">
                <h4 className="font-bold text-lg text-gray-900 dark:text-white">Company Milestones</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Celebrate achievements with your team in style.
                </p>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      <div className="my-12 flex justify-center">
        <BlogCTA variant="primary" text="Plan Your Corporate Event" href="/contact" external={false} />
      </div>

      <SectionReveal>
        <section id="weddings-birthdays" className="mb-12" data-testid="section-weddings-birthdays">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3" data-testid="heading-weddings-birthdays">
            <Cake className="text-brand-blue" /> Weddings & Birthdays
          </h2>
          
          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            For{' '}
            <Link href="/wedding-parties" className="text-brand-blue hover:underline font-semibold">
            weddings</Link> and{' '}
            <Link href="/birthday-parties" className="text-brand-blue hover:underline font-semibold">
            birthdays</Link>, we add a touch of magic and convenience. Our party boats provide the perfect 
            backdrop for celebrating life's most precious moments with stunning Lake Travis views.
          </p>

          <div className="my-8">
            <LazyImage
              src="/attached_assets/clever-girl-50-person-boat.webp"
              alt="Large party boat for weddings and birthdays on Lake Travis"
              className="rounded-lg shadow-lg w-full h-auto"
              data-testid="image-wedding-birthday"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div className="bg-pink-50 dark:bg-pink-900/20 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                <Heart className="text-pink-500" /> Wedding Celebrations
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• <Link href="/rehearsal-dinner" className="text-brand-blue hover:underline">Rehearsal dinners</Link></li>
                <li>• <Link href="/welcome-party" className="text-brand-blue hover:underline">Welcome parties</Link></li>
                <li>• <Link href="/after-party" className="text-brand-blue hover:underline">Wedding after-parties</Link></li>
                <li>• Bridal party celebrations</li>
              </ul>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                <PartyPopper className="text-purple-500" /> Birthday Celebrations
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• <Link href="/milestone-birthday" className="text-brand-blue hover:underline">Milestone birthdays</Link> (30th, 40th, 50th)</li>
                <li>• <Link href="/sweet-16" className="text-brand-blue hover:underline">Sweet 16 parties</Link></li>
                <li>• Surprise birthday cruises</li>
                <li>• Group birthday celebrations</li>
              </ul>
            </div>
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section id="safety-experience" className="mb-12" data-testid="section-safety-experience">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3" data-testid="heading-safety-experience">
            <Shield className="text-brand-blue" /> Safety, Experience & Unmatched Service
          </h2>
          
          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            At Premier Party Cruises, your safety and satisfaction are our top priorities. We boast a 
            <strong> perfect safety record over 15+ years</strong> in business, having safely hosted over 
            150,000 customers on Lake Travis.
          </p>

          <div className="bg-brand-blue/10 border-l-4 border-brand-blue p-6 my-6 rounded">
            <p className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              🛟 Our Safety Commitment:
            </p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>• <strong>Professional, licensed captains</strong> on every cruise</li>
              <li>• <strong>Coast Guard certified vessels</strong></li>
              <li>• <strong>Life jackets available</strong> for all guests</li>
              <li>• <strong>First aid equipment</strong> on board</li>
              <li>• <strong>Weather monitoring</strong> for safe cruising conditions</li>
            </ul>
          </div>

          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            Our combined experience and dedication to customer service set us apart, providing peace of 
            mind and an unparalleled event experience. We are proud to be a trusted part of the Austin community.
          </p>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section id="faq" className="mb-12" data-testid="section-faq">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3" data-testid="heading-faq">
            <MapPin className="text-brand-blue" /> Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                Q: What areas do you serve in Austin, Texas?
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Premier Party Cruises operates exclusively on Lake Travis, departing from multiple marina 
                locations for your convenience.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                Q: Can I customize my boat rental package?
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Absolutely! We offer flexible packages and encourage you to{' '}
                <Link href="/contact" className="text-brand-blue hover:underline">contact us</Link> to 
                discuss your specific needs. Our goal is to create a tailored experience that perfectly 
                matches your event vision.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                Q: What safety measures are in place for Lake Travis cruises?
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Premier Party Cruises maintains a perfect safety record. All our boats are equipped with 
                extensive safety gear, including life jackets, and are operated by experienced, certified 
                captains. Your safety on Lake Travis is our utmost concern.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                Q: How far in advance should I book my event?
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                We recommend booking as far in advance as possible, especially for peak seasons (March-October) 
                and popular dates. This ensures availability and allows ample time for detailed planning.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                Q: Do you offer services for smaller gatherings?
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Yes! Premier Party Cruises caters to events of all sizes, from intimate gatherings on our 
                14-person boat to large celebrations on our 75-person flagship vessel. Explore our{' '}
                <Link href="/private-cruises" className="text-brand-blue hover:underline">private cruise options</Link> for details.
              </p>
            </div>
          </div>
        </section>
      </SectionReveal>

      <div className="my-12 text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          Your Austin Event, Perfected
        </h2>
        <p className="text-lg mb-8 text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          Planning an event in Austin no longer needs to be complex. With Premier Party Cruises, you gain 
          access to a unique, integrated solution that makes your celebration unforgettable. From the first 
          planning call to the final toast, we are here to make your Austin event dreams a reality.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <BlogCTA variant="primary" text="Book Your Party Cruise" external={false} />
          <BlogCTA variant="secondary" text="Get Free Quote" external={false} />
        </div>
      </div>
    </BlogPostLayout>
  );
}

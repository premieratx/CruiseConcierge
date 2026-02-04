import { BlogPostLayout, TOCSection } from '@/components/blog/BlogPostLayout';
import { BlogCTA } from '@/components/blog/BlogCTA';
import { LazyImage } from '@/components/LazyImage';
import { SectionReveal } from '@/components/SectionReveal';
import { Link } from 'wouter';
import { lakeTravisBachelorBoatImages } from '@/lib/blogImages';
import { BlogImageBreak, BlogPhotoStrip } from '@/components/BlogImageBreak';
import { 
  Waves, Ship, Music, Beer, Calendar, 
  Users, CheckCircle, AlertCircle, Sparkles, MapPin 
} from 'lucide-react';

import bachelorHero from '@assets/bachelor-party-group-guys.webp';
import capitalCityShots1 from '@assets/@capitalcityshots-10_1760080740019.jpg';
import capitalCityShots2 from '@assets/@capitalcityshots-13_1760080740020.jpg';
import capitalCityShots3 from '@assets/@capitalcityshots-16_1760080740020.jpg';

const sections: TOCSection[] = [
  { id: 'why-lake-travis', title: 'Why Lake Travis', icon: <Waves /> },
  { id: 'atx-disco-cruise', title: 'ATX Disco Cruise', icon: <Ship /> },
  { id: 'byob-delivery', title: 'BYOB + Delivery', icon: <Beer /> },
  { id: 'private-vs-disco', title: 'Private vs Disco', icon: <Users /> },
  { id: 'party-tips', title: 'Party Tips', icon: <Sparkles /> },
  { id: 'sample-itinerary', title: 'Sample Itinerary', icon: <Calendar /> },
  { id: 'dos-donts', title: 'Do\'s and Don\'ts', icon: <CheckCircle /> },
];

export default function LakeTravisBachelorPartyBoats() {
  return (
    <BlogPostLayout
      title="Lake Travis Bachelor Party Boats | Austin TX Cruises"
      metaDescription="Lake Travis party boats for Austin bachelor parties. ATX Disco Cruise, private charters, BYOB options, and pro tips for an unforgettable lake party."
      publishDate="2025-01-15"
      author="Premier Party Cruises"
      heroImage={bachelorHero}
      heroImageAlt="Bachelor party group celebrating on Lake Travis party boat in Austin"
      keywords={[
        'lake travis bachelor party',
        'lake travis party boat',
        'austin bachelor party boat rental',
        'atx disco cruise',
        'lake travis boat rental bachelor',
        'austin party cruise',
        'lake travis cruises',
        'bachelor party boat austin',
      ]}
      sections={sections}
      pageRoute="/lake-travis-bachelor-party-boats"
    >
      {/* Why Lake Travis */}
      <SectionReveal>
        <section id="why-lake-travis" className="mb-12" data-testid="section-why-lake-travis">
          <h2 className="heading-unbounded text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white" data-testid="heading-why-lake-travis">
            Why Lake Travis is the Place to Party
          </h2>

          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            When it comes to <strong>bachelor party destinations</strong>, downtown Austin's bars often steal 
            the spotlight – but savvy planners know that <strong>Lake Travis</strong> is where the real magic 
            happens. This expansive lake on Austin's outskirts isn't just for pretty views (though the views 
            are stunning); it's the backdrop for some of the wildest, most memorable bachelor party moments 
            you can imagine.
          </p>

          <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <LazyImage
              src={lakeTravisBachelorBoatImages[1].src}
              alt="Lake Travis party boat rental perfect for Austin bachelor party celebrations"
              className="rounded-lg shadow-lg w-full h-auto"
              data-testid="image-lake-travis-1"
            />
            <LazyImage
              src={lakeTravisBachelorBoatImages[2].src}
              alt="Party boat Austin Texas cruising on Lake Travis with bachelor party group"
              className="rounded-lg shadow-lg w-full h-auto"
              data-testid="image-lake-travis-2"
            />
          </div>

          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            Think of <Link href="/party-boat-lake-travis" className="text-brand-blue hover:underline font-semibold" data-testid="link-party-boat-lake-travis-1">
            Lake Travis</Link> as Austin's giant natural party venue: clear blue waters, warm Texas sun, and a 
            boatload of fun activities waiting for you and the guys. After a night on 6th Street, nothing beats 
            recovering (and recharging) out on the water with a cold drink in hand.
          </p>

          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            It's the perfect escape from the city without actually leaving Austin – and it has become the go-to 
            for daytime <Link href="/bachelor-party-austin" className="text-brand-blue hover:underline font-semibold" data-testid="link-bachelor-party-1">
            bachelor party</Link> festivities.
          </p>

          <div className="bg-brand-blue/10 border-l-4 border-brand-blue p-6 my-6 rounded">
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              💎 What makes Lake Travis bachelor party boats so special? Two words:{' '}
              <Link href="/atx-disco-cruise" className="text-brand-blue hover:underline font-bold" data-testid="link-atx-disco-cruise-1">
              ATX Disco Cruise</Link>
            </p>
          </div>
        </section>
      </SectionReveal>

      {/* ATX Disco Cruise */}
      <SectionReveal>
        <section id="atx-disco-cruise" className="mb-12" data-testid="section-atx-disco-cruise">
          <h2 className="heading-unbounded text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white" data-testid="heading-atx-disco-cruise">
            The ATX Disco Cruise: Austin Bachelor Party Paradise
          </h2>

          <div className="my-8">
            <LazyImage
              src={lakeTravisBachelorBoatImages[3].src}
              alt="ATX Disco Cruise party boat Austin bachelor party experience on Lake Travis"
              className="rounded-lg shadow-lg w-full h-auto"
              data-testid="image-disco-cruise"
            />
          </div>

          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            This is not your average boat rental – it's an all-inclusive floating party hosted by{' '}
            <strong>Premier Party Cruises</strong>, the undisputed leader in Lake Travis party boats for over 
            14 years. They've hosted <strong>countless happy partiers</strong> (many of them rowdy bachelor and 
            bachelorette crews), so they know how to throw down on the lake.
          </p>

          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            The <Link href="/atx-disco-cruise" className="text-brand-blue hover:underline font-bold" data-testid="link-atx-disco-cruise-2">ATX Disco 
            Cruise</Link> is their signature shared party boat experience, basically a massive floating club 
            where multiple groups join in for one epic throwdown. If you're picturing a few dudes on a fishing 
            boat, think again: the Disco Cruise happens on a <strong>double-decker barge</strong> outfitted with 
            a DJ booth, booming speakers, dance lights, and plenty of space to dance, mingle, and soak up the sun.
          </p>

          <div className="my-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <LazyImage
              src={lakeTravisBachelorBoatImages[4].src}
              alt="Austin bachelor party group dancing on Lake Travis party boat"
              className="rounded-lg shadow-lg w-full h-auto"
              data-testid="image-party-boat-1"
            />
            <LazyImage
              src={lakeTravisBachelorBoatImages[5].src}
              alt="Party boat Austin DJ spinning music for bachelor party on Lake Travis"
              className="rounded-lg shadow-lg w-full h-auto"
              data-testid="image-party-boat-2"
            />
            <LazyImage
              src={lakeTravisBachelorBoatImages[6].src}
              alt="Lake Travis party boat with bachelor party guests enjoying the cruise"
              className="rounded-lg shadow-lg w-full h-auto"
              data-testid="image-party-boat-3"
            />
          </div>

          <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            How the ATX Disco Cruise Works
          </h3>

          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            You book spots for your group (by individual tickets or a set number of spots) on a scheduled 
            cruise – typically they run on Fridays and Saturdays, about <strong>four hours long</strong> in 
            the early afternoon. When you arrive at Anderson Mill Marina, you'll see the giant party barge 
            decked out in disco decor and ready to roar.
          </p>

          <ul className="list-disc pl-6 mb-4 text-lg text-gray-700 dark:text-gray-300 space-y-2">
            <li>
              <strong>Live DJ</strong> spinning crowd-pleasers from classic 70s hits to today's bangers
            </li>
            <li>
              <strong>Professional photographer</strong> onboard snapping pics of the action
            </li>
            <li>
              <strong>Coolers with ice and water</strong> provided so your BYOB drinks stay cold
            </li>
            <li>
              <strong>Giant lily pad floats</strong> and water toys when the boat anchors at a cove
            </li>
            <li>
              <strong>USCG-certified captains</strong> piloting the boat (no designated driver needed!)
            </li>
            <li>
              <strong>Perfect safety record</strong> over thousands of trips
            </li>
          </ul>

          <div className="my-8 flex justify-center gap-4">
            <BlogCTA variant="primary" text="Book ATX Disco Cruise" />
            <BlogCTA variant="secondary" />
          </div>

          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            One of the best parts of the <Link href="/atx-disco-cruise" className="text-brand-blue hover:underline font-bold" data-testid="link-atx-disco-cruise-3">
            Disco Cruise</Link> is that Premier Party Cruises handles all the logistics so you don't have to. 
            Everything is provided except your beverages and food. You just show up with your crew, your cooler 
            of choice drinks, and maybe some snacks (pro tip: bring easy finger foods like sub sandwiches or a 
            box of breakfast tacos).
          </p>

          <div className="bg-purple-100 dark:bg-purple-900/20 border-l-4 border-purple-600 p-6 my-6 rounded">
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              🎉 Social Scene: The ATX Disco Cruise is a multi-group party, meaning your bachelor crew will be 
              partying alongside other groups – often a mix of bachelor and{' '}
              <Link href="/bachelorette-party-austin" className="text-brand-blue hover:underline font-semibold" data-testid="link-bachelorette-party-1">
              bachelorette parties</Link> from around the country!
            </p>
          </div>

          <div className="my-8">
            <LazyImage
              src={lakeTravisBachelorBoatImages[7].src}
              alt="Austin bachelor party and bachelorette party groups mingling on Lake Travis party boat"
              className="rounded-lg shadow-lg w-full h-auto"
              data-testid="image-social-scene"
            />
          </div>

          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            For single guys, yes, there's a good chance you'll be partying with lively bachelorettes on board 
            (hello, new friends!). For all guys, the group synergy is just a blast – you can beer-pong it up 
            with one group, have a dance-off with another, and everyone's cheering everyone on.
          </p>

          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            By the end of the cruise, don't be surprised if you've formed a temporary "mega-party" alliance with 
            another group to hit the town together later. Making friends is highly encouraged – it's like a big 
            floating bachelor/bachelorette mixer!
          </p>
        </section>
      </SectionReveal>

      {/* BYOB + Party On Delivery */}
      <SectionReveal>
        <section id="byob-delivery" className="mb-12" data-testid="section-byob-delivery">
          <h2 className="heading-unbounded text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white" data-testid="heading-byob-delivery">
            BYOB + Party On Delivery = No Worries
          </h2>

          <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <LazyImage
              src={lakeTravisBachelorBoatImages[8].src}
              alt="BYOB party boat Austin bachelor party with coolers on Lake Travis"
              className="rounded-lg shadow-lg w-full h-auto"
              data-testid="image-byob-1"
            />
            <LazyImage
              src={lakeTravisBachelorBoatImages[9].src}
              alt="Austin bachelor party group enjoying drinks on Lake Travis party boat rental"
              className="rounded-lg shadow-lg w-full h-auto"
              data-testid="image-byob-2"
            />
          </div>

          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            Since the <Link href="/atx-disco-cruise" className="text-brand-blue hover:underline font-semibold" data-testid="link-atx-disco-cruise-4">
            Disco Cruise</Link> is <strong>BYOB</strong>, you might be wondering about the logistics of drinks. 
            Hauling multiple coolers of beer, liquor, mixers, and ice for 10+ guys doesn't sound fun, right?
          </p>

          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            Enter <strong>Party On Delivery</strong>, the hero we deserve. Premier Party Cruises has partnered 
            with this local alcohol delivery service to make the booze situation completely seamless. Party On 
            Delivery will deliver your order of beer, seltzers, liquor, mixers, ice – even cups and koozies – 
            directly to the marina before your boat departs.
          </p>

          <div className="bg-brand-blue/10 border-l-4 border-brand-blue p-6 my-6 rounded">
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              🍺 Pro Tip: That means you can show up to the dock with everything already waiting, nicely chilled 
              and ready to roll onto the boat. No frantic runs to the liquor store, no heavy lifting in the heat!
            </p>
          </div>

          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            As the only integrated boat + bev service in Austin, this combo of Premier's cruises and Party On 
            Delivery's service is a <Link href="/bachelor-party-austin" className="text-brand-blue hover:underline font-semibold" data-testid="link-bachelor-party-2">
            bachelor party</Link> planner's dream.
          </p>

          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            To take advantage, simply coordinate with Party On Delivery a few days before. They offer:
          </p>

          <ul className="list-disc pl-6 mb-4 text-lg text-gray-700 dark:text-gray-300 space-y-2">
            <li>
              <strong>Free consultations</strong> to help you decide how much to order for your group size
            </li>
            <li>
              <strong>No minimum order</strong> requirements
            </li>
            <li>
              <strong>100% buyback policy</strong> on unopened bottles – order more without worry!
            </li>
            <li>
              Delivery timed to arrive ~30 minutes before your boat launch
            </li>
          </ul>

          <div className="my-8 flex justify-center">
            <BlogCTA variant="secondary" text="Get Your Free Quote" />
          </div>
        </section>
      </SectionReveal>

      {/* Private Charter vs Disco Cruise */}
      <SectionReveal>
        <section id="private-vs-disco" className="mb-12" data-testid="section-private-vs-disco">
          <h2 className="heading-unbounded text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white" data-testid="heading-private-vs-disco">
            Private Charter vs. Disco Cruise
          </h2>

          <div className="my-8">
            <LazyImage
              src={lakeTravisBachelorBoatImages[10].src}
              alt="Private charter party boat Austin for exclusive bachelor party on Lake Travis"
              className="rounded-lg shadow-lg w-full h-auto"
              data-testid="image-private-charter"
            />
          </div>

          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            While the shared <Link href="/atx-disco-cruise" className="text-brand-blue hover:underline font-bold" data-testid="link-atx-disco-cruise-5">
            Disco Cruise</Link> is insanely fun (and we highly recommend it for most bachelor groups), there 
            are cases where you might consider a <Link href="/private-cruises" className="text-brand-blue hover:underline font-bold" data-testid="link-private-cruises-1">
            private party boat rental</Link> on Lake Travis instead.
          </p>

          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            Premier Party Cruises offers private charters for groups that want the boat all to themselves – 
            for example, if you have a really large crew (20+ people) or if the bachelor is a bit crowd-averse 
            and you'd prefer a more personal setting.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Benefits of Private Charters
          </h3>

          <ul className="list-disc pl-6 mb-4 text-lg text-gray-700 dark:text-gray-300 space-y-2">
            <li>
              <strong>Customized experience:</strong> Want a specific music playlist or your own DJ? Done.
            </li>
            <li>
              <strong>Decorations:</strong> Want to decorate the boat with embarrassing giant head cutouts of 
              the groom? Go for it!
            </li>
            <li>
              <strong>Choose duration:</strong> You can even choose the duration of your trip and add special stops
            </li>
            <li>
              <strong>Add-ons available:</strong> You can opt to include their DJ service, photographer, lily 
              pads, etc., for your private outing
            </li>
          </ul>

          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            Of course, a <Link href="/private-cruises" className="text-brand-blue hover:underline font-semibold" data-testid="link-private-cruises-2">
            private charter</Link> comes at a higher price tag since you're renting out the whole vessel. But 
            for a big group, when you break down cost per person, it can still be very reasonable. And remember, 
            you're getting a captained boat (no need for any of your buddies to stay sober to drive a rental 
            pontoon) and a crew focused just on your party's needs.
          </p>

          <div className="bg-purple-100 dark:bg-purple-900/20 border-l-4 border-purple-600 p-6 my-6 rounded">
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              ⛵ Fleet Options: Premier's fleet includes everything from smaller pontoons for 8-12 people to 
              double-decker barges that can handle 50+, so they've got you covered no matter your group size!
            </p>
          </div>

          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            Whether you go private or join the <Link href="/atx-disco-cruise" className="text-brand-blue hover:underline font-bold" data-testid="link-atx-disco-cruise-6">
            Disco Cruise</Link>, a day on <Link href="/party-boat-lake-travis" className="text-brand-blue hover:underline font-semibold" data-testid="link-party-boat-lake-travis-2">
            Lake Travis</Link> with Premier Party Cruises is basically a bachelor party cheat code: it guarantees 
            that at least one of your daytime activities will be an absolute hit.
          </p>

          <div className="my-8 flex justify-center gap-4">
            <BlogCTA variant="primary" text="Book Your Lake Travis Cruise" />
            <BlogCTA variant="secondary" text="Compare Options" />
          </div>
        </section>
      </SectionReveal>

      {/* Section Image Break - Party Action */}
      <BlogImageBreak
        src={capitalCityShots1}
        alt="Bachelor party group dancing on Lake Travis party boat"
        caption="Non-stop fun on Premier Party Cruises"
      />

      {/* Tips for a Legendary Lake Travis Boat Party */}
      <SectionReveal>
        <section id="party-tips" className="mb-12" data-testid="section-party-tips">
          <h2 className="heading-unbounded text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white" data-testid="heading-party-tips">
            Tips for a Legendary Lake Travis Party Boat Experience
          </h2>

          <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <LazyImage
              src={lakeTravisBachelorBoatImages[11].src}
              alt="Lake Travis party boat tips for Austin bachelor party planning"
              className="rounded-lg shadow-lg w-full h-auto"
              data-testid="image-party-tips-1"
            />
            <LazyImage
              src={lakeTravisBachelorBoatImages[12].src}
              alt="Bachelor party group celebrating on party boat Austin Lake Travis"
              className="rounded-lg shadow-lg w-full h-auto"
              data-testid="image-party-tips-2"
            />
          </div>

          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            To make the most of your Lake Travis bachelor boat adventure, keep these tips in mind:
          </p>

          <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            1. Plan Ahead & Book Early
          </h3>

          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            These <Link href="/party-boat-austin" className="text-brand-blue hover:underline font-semibold" data-testid="link-party-boat-austin-1">
            party cruises</Link> are in high demand, especially in spring and summer. <strong>Weekends can sell 
            out weeks (or months) in advance.</strong> As soon as you have your trip dates, reserve your boat slots.
          </p>

          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            Premier Party Cruises allows online booking to check availability – snag your spots and lock it in. 
            Trust us, nothing causes bachelor party panic like finding out every boat is booked.
          </p>

          <h3 className="text-2xl font-bold mb-4 mt-8 text-gray-900 dark:text-white">
            2. Morning Prep
          </h3>

          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            Don't arrive at the boat starving or hungover to oblivion. Grab a solid breakfast (breakfast tacos 
            from a spot like Juan in a Million will cure what ails you) and drink some water. Bringing breakfast 
            tacos on board isn't a bad idea either – a little egg and bacon taco mid-party can be a lifesaver.
          </p>

          <h3 className="text-2xl font-bold mb-4 mt-8 text-gray-900 dark:text-white">
            3. What to Bring
          </h3>

          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            Pack your cooler smartly. Cans of beer, hard seltzers, ready-to-drink cocktails, and canned wines 
            are ideal (no glass allowed on the boats!). Bring plenty – a 4-hour party with the sun beating down, 
            you might drink more than a usual bar day.
          </p>

          <ul className="list-disc pl-6 mb-4 text-lg text-gray-700 dark:text-gray-300 space-y-2">
            <li>Throw in some Gatorade or Waterboy packets for electrolyte replenishment</li>
            <li>Don't forget <strong>sunscreen</strong> (you will roast without it)</li>
            <li>Hats, shades, and swimsuits are a must</li>
            <li>Maybe a fun floatie or inflatable to toss in the water</li>
            <li>Coordinate matching outfits or theme costumes – you get major style points!</li>
          </ul>

          <div className="bg-brand-blue/10 border-l-4 border-brand-blue p-6 my-6 rounded">
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              😎 Style Tip: One bachelor party all wore 70s short shorts and fake mustaches – it was glorious. 
              Don't be shy about getting creative with your group outfits!
            </p>
          </div>

          <h3 className="text-2xl font-bold mb-4 mt-8 text-gray-900 dark:text-white">
            4. Hydrate Like Your Life Depends On It
          </h3>

          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            Seriously. The Texas sun + alcohol + 4 hours of partying = dehydration is real. Premier provides 
            ice-cold water on board – take advantage! A smart move is to make a little rule within your group: 
            after each alcoholic drink, you down a cup of water.
          </p>

          <h3 className="text-2xl font-bold mb-4 mt-8 text-gray-900 dark:text-white">
            5. Afternoon Recovery
          </h3>

          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            After the boat docks around 5-6pm, you'll all be sun-drunk and happy. Head back to your hotel or 
            Airbnb for a strategic nap/shower/recharge session. Trying to power straight through to dinner and 
            nightlife without any recovery is a rookie mistake (you'll crash hard by 9 PM).
          </p>

          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            Give the crew a couple hours to rally, maybe order pizzas, then you'll be primed for another epic 
            night on <Link href="/party-boat-austin" className="text-brand-blue hover:underline font-semibold" data-testid="link-party-boat-austin-2">
            Rainey Street or 6th Street</Link>.
          </p>

          <div className="my-8">
            <LazyImage
              src={lakeTravisBachelorBoatImages[13].src}
              alt={lakeTravisBachelorBoatImages[13].alt}
              className="rounded-lg shadow-lg w-full h-auto"
              data-testid="image-recovery-party"
            />
          </div>
        </section>
      </SectionReveal>

      {/* Sample Itinerary */}
      <SectionReveal>
        <section id="sample-itinerary" className="mb-12" data-testid="section-sample-itinerary">
          <h2 className="heading-unbounded text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white" data-testid="heading-sample-itinerary">
            Sample 3-Day Bachelor Party Itinerary
          </h2>

          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            Want to see how a <strong>Lake Travis party boat</strong> fits into the ultimate{' '}
            <Link href="/bachelor-party-austin" className="text-brand-blue hover:underline font-semibold" data-testid="link-bachelor-party-3">
            Austin bachelor weekend</Link>? Here's a sample itinerary:
          </p>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 my-6">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="bg-brand-blue text-white rounded-full w-8 h-8 flex items-center justify-center">1</span>
              Friday: Arrival & Warm-Up
            </h3>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Arrive in Austin, check into Airbnb/hotel</li>
              <li>Grab breakfast tacos at Juan in a Million or Veracruz All Natural</li>
              <li>Afternoon: Texas BBQ feast at Franklin or Terry Black's</li>
              <li>Evening: Bar hop on Rainey Street for a chill first night</li>
              <li>Late night: Food trucks and nightcap back at the house</li>
            </ul>
          </div>

          <div className="bg-brand-blue/10 dark:bg-brand-blue/20 rounded-lg p-6 my-6">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="bg-brand-blue text-white rounded-full w-8 h-8 flex items-center justify-center">2</span>
              Saturday: THE BIG DAY - Lake Travis Disco Cruise
            </h3>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>
                <strong>12:00 PM:</strong> Arrive at Anderson Mill Marina for the{' '}
                <Link href="/atx-disco-cruise" className="text-brand-blue hover:underline font-bold" data-testid="link-atx-disco-cruise-7">
                ATX Disco Cruise</Link>
              </li>
              <li><strong>12:30 PM - 4:30 PM:</strong> Party on the lake! DJ, dancing, swimming, lily pads</li>
              <li><strong>5:00 PM:</strong> Back to hotel for naps and recovery</li>
              <li><strong>8:00 PM:</strong> Group dinner at Salt Lick or a downtown steakhouse</li>
              <li><strong>10:00 PM:</strong> Hit 6th Street for epic bar crawl</li>
              <li><strong>2:00 AM:</strong> Late night tacos and stumble back</li>
            </ul>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 my-6">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="bg-brand-blue text-white rounded-full w-8 h-8 flex items-center justify-center">3</span>
              Sunday: Recovery & Farewells
            </h3>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Brunch at Banger's (Manmosas!) or Juan in a Million</li>
              <li>Quick dip at Barton Springs Pool for hangover cure</li>
              <li>Souvenir shopping on South Congress</li>
              <li>Head to airport with epic memories</li>
            </ul>
          </div>

          <div className="my-8 flex justify-center">
            <BlogCTA variant="primary" text="Start Planning Your Weekend" />
          </div>
        </section>
      </SectionReveal>

      {/* Section Image Break - More Party Shots */}
      <BlogPhotoStrip
        photos={[
          { src: capitalCityShots2, alt: 'Austin bachelor party on Lake Travis party boat', caption: 'Epic party moments' },
          { src: capitalCityShots3, alt: 'Lake Travis party cruise celebration', caption: 'Celebrating in style' },
        ]}
        columns={2}
      />

      {/* Do's and Don'ts */}
      <SectionReveal>
        <section id="dos-donts" className="mb-12" data-testid="section-dos-donts">
          <h2 className="heading-unbounded text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white" data-testid="heading-dos-donts">
            Do's and Don'ts for Your Lake Travis Bachelor Party
          </h2>

          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            To ensure you have an amazing (and safe) time on the{' '}
            <Link href="/atx-disco-cruise" className="text-brand-blue hover:underline font-bold" data-testid="link-atx-disco-cruise-8">
            ATX Disco Cruise</Link>, follow these essential do's and don'ts:
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-8">
            {/* DO's Column */}
            <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-4 text-green-700 dark:text-green-400 flex items-center gap-2">
                <CheckCircle className="h-6 w-6" />
                DO's
              </h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                  <span><strong>Dress to impress (and amuse):</strong> Wear outrageous, hilarious, or coordinated 
                  outfits. Matching sailor hats, 70s disco gear, or Hawaiian shirts – the more over-the-top, the better!</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                  <span><strong>Hydrate between beers:</strong> Drink water between alcoholic drinks. Premier provides 
                  free ice-cold water – use it! Consider electrolyte packets too.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                  <span><strong>Make friends:</strong> Chat with other bachelor and{' '}
                  <Link href="/bachelorette-party-austin" className="text-brand-blue hover:underline" data-testid="link-bachelorette-party-2">bachelorette parties</Link> on 
                  the boat. Form a supergroup for the after-party!</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                  <span><strong>Bring snacks:</strong> Pack breakfast tacos, sandwiches, or pizza. Food extends your 
                  stamina and prevents early burnout.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                  <span><strong>Party hard AND smart:</strong> Go all-in on the fun but know your limits. Watch out 
                  for your bachelor and keep track of valuables.</span>
                </li>
              </ul>
            </div>

            {/* DON'T's Column */}
            <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-500 rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-4 text-red-700 dark:text-red-400 flex items-center gap-2">
                <AlertCircle className="h-6 w-6" />
                DON'T's
              </h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-1" />
                  <span><strong>Don't overdo the hard liquor:</strong> Save shots for later at night on solid ground. 
                  Stick to beers, seltzers, or light mixed drinks in the Texas heat.</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-1" />
                  <span><strong>Don't be creepy or rude:</strong> Keep boundaries and respect levels in check. 
                  Flirting and mingling? Cool. Being handsy or making someone uncomfortable? Not cool.</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-1" />
                  <span><strong>Don't forget you're on a boat:</strong> Listen to safety briefings, don't jump 
                  while boat is moving, and respect the crew's instructions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-1" />
                  <span><strong>Don't litter or damage property:</strong> No glass bottles, clean up after yourself, 
                  and treat the boat with respect. You want to be invited back!</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-1" />
                  <span><strong>Don't skip the sunscreen:</strong> Seriously. A sunburned bachelor is a miserable 
                  bachelor. Reapply every 2 hours.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-brand-blue/10 border-l-4 border-brand-blue p-6 my-6 rounded">
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              🎯 Captain Brian's Golden Rule: "Don't be a dick and don't die." Follow that and you'll have an 
              amazing time while respecting the boat, crew, and fellow partiers!
            </p>
          </div>
        </section>
      </SectionReveal>

      {/* Final CTA Section */}
      <SectionReveal>
        <div className="bg-gradient-to-r from-brand-blue/10 to-purple-100 dark:from-brand-blue/20 dark:to-purple-900/20 p-8 rounded-lg text-center my-12">
          <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Ready for the Ultimate Lake Travis Bachelor Party?
          </h3>
          <p className="text-lg mb-6 text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Join countless happy partiers who've experienced the legendary{' '}
            <Link href="/atx-disco-cruise" className="text-brand-blue hover:underline font-bold" data-testid="link-atx-disco-cruise-9">
            ATX Disco Cruise</Link>. Perfect safety record, 14+ years of epic parties, and unforgettable 
            Lake Travis memories await!
          </p>
          
          <div className="flex justify-center gap-4 flex-wrap mb-6">
            <BlogCTA variant="primary" text="Book Your Disco Cruise" />
            <BlogCTA variant="secondary" text="Get Free Custom Quote" />
          </div>

          <div className="flex justify-center gap-6 flex-wrap text-sm">
            <Link href="/bachelor-party-austin" className="text-brand-blue hover:underline font-semibold" data-testid="link-bachelor-party-packages">
              Bachelor Party Packages →
            </Link>
            <Link href="/combined-bachelor-bachelorette" className="text-brand-blue hover:underline font-semibold" data-testid="link-combined-parties">
              Combined Parties →
            </Link>
            <Link href="/private-cruises" className="text-brand-blue hover:underline font-semibold" data-testid="link-private-charters">
              Private Charters →
            </Link>
            <Link href="/gallery" className="text-brand-blue hover:underline font-semibold" data-testid="link-gallery">
              Party Photos →
            </Link>
          </div>
        </div>
      </SectionReveal>
    </BlogPostLayout>
  );
}

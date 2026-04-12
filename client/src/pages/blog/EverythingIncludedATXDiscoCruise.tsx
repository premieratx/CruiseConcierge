import { useEffect } from 'react';
import { m, LazyMotionProvider, fadeInUp } from '@/components/LazyMotion';
import { Link } from 'wouter';
import { BlogPostLayout, TOCSection } from '@/components/blog/BlogPostLayout';
import { BlogImageBreak } from '@/components/BlogImageBreak';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Music, 
  Camera, 
  Waves, 
  IceCream, 
  GlassWater, 
  CheckCircle2, 
  Ban,
  PackageCheck
} from 'lucide-react';

// Photo Imports
import discoFun5 from '@assets/disco_fun5_1765193453548.jpg';
import capitalShots2 from '@assets/@capitalcityshots-2_1760080740017.jpg';
import dancingScene from '@assets/dancing-party-scene.webp';
import InlineCTABar from '@/components/InlineCTABar';

const sections: TOCSection[] = [
  { id: 'whats-included', title: "The All-Inclusive List" },
  { id: 'entertainment', title: 'DJ & Photographer: Professional Perks' },
  { id: 'what-to-bring', title: 'The Packing List: What to Bring' },
  { id: 'what-not-to-bring', title: 'The Forbidden List: What NOT to Bring' },
  { id: 'byob-guide', title: 'BYOB Like a Pro' },
  { id: 'faqs', title: 'Frequently Asked Questions' },
];

export default function EverythingIncludedATXDiscoCruise() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LazyMotionProvider>
      <BlogPostLayout
        pageRoute="/blogs/everything-thats-included-on-the-atx-disco-cruise-so-you-dont-have-to-bring-anything"
        title="Everything That's Included on the ATX Disco Cruise (So You Don't Have to Bring Anything)"
        metaDescription="Complete guide to what's included on the ATX Disco Cruise: professional DJ, photographer, 14 disco balls, giant lily pad floats, coolers with ice, cups, koozies. BYOB. The only thing you need is your drinks."
        keywords={["what's included ATX Disco Cruise", 'ATX Disco Cruise all-inclusive', 'what to bring ATX Disco Cruise', 'ATX Disco Cruise packing list', 'ATX Disco Cruise amenities']}
        publishDate="2025-05-20"
        author="Captain Brian"
        heroImage={discoFun5}
        heroImageAlt="All-inclusive amenities on the ATX Disco Cruise"
        sections={sections}
      >
        <div className="mb-8 flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm">
          <span className="text-blue-600 font-bold text-lg leading-none mt-0.5">→</span>
          <p className="text-slate-700 leading-relaxed m-0">
            <span className="font-semibold text-slate-900">Complete guide: </span>
            <Link href="/atx-disco-cruise" className="text-blue-600 hover:underline font-semibold">ATX Disco Cruise — Austin's all-inclusive disco boat cruise on Lake Travis</Link>
            {' '}— full pricing, schedule, and booking. This post is a focused deep-dive on one aspect of the experience.
          </p>
        </div>
        <section id="whats-included" className="scroll-mt-24 mb-16">
          <Badge className="mb-4 bg-blue-600 text-white font-bold">ALL-INCLUSIVE GUIDE</Badge>
          <h2 className="heading-unbounded text-2xl sm:text-3xl font-bold mb-6 text-slate-900 dark:text-white">
            The ATX Disco Cruise: Truly All-Inclusive Entertainment
          </h2>
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
            Planning an <Link href="/bachelor-party-austin" className="text-blue-600 hover:underline font-semibold">Austin bachelor party</Link> or <Link href="/bachelorette-party-austin" className="text-blue-600 hover:underline font-semibold">bachelorette party</Link> can be a logistical nightmare. Who's bringing the ice? Do we need to hire a photographer? What about music? 
          </p>
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
            The <strong>ATX Disco Cruise</strong> was designed to take all that stress off your plate. We provide the "production value" of a massive event, even if you're just a small group of six. Here is the exhaustive list of what is included in your ticket.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
            {[
              { icon: Music, text: "Professional DJ (4 hours)" },
              { icon: Camera, text: "Professional Photographer" },
              { icon: Waves, text: "6x20 ft Giant Lily Pad Floats" },
              { icon: PackageCheck, text: "14 Disco Balls & Pro Lighting" },
              { icon: IceCream, text: "Coolers Pre-Filled with Ice" },
              { icon: GlassWater, text: "Cups, Koozies, & Bubbles" },
              { icon: CheckCircle2, text: "USCG-Certified Captain & Crew" },
              { icon: CheckCircle2, text: "All Taxes & Gratuities Included" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl shadow-sm">
                <item.icon className="h-6 w-6 text-blue-600" />
                <span className="font-semibold text-slate-900 dark:text-white">{item.text}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="entertainment" className="scroll-mt-24 mb-16">
          <h2 className="heading-unbounded text-2xl sm:text-3xl font-bold mb-6 text-slate-900 dark:text-white">
            DJ & Photographer: The Professional Perks
          </h2>
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
            This is what sets the <Link href="/atx-disco-cruise" className="text-blue-600 hover:underline font-semibold">ATX Disco Cruise</Link> apart from every other <strong>party boat in Austin</strong>. 
          </p>
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
            Our <strong>Professional DJ</strong> doesn't just play music; they read the crowd. Whether you're feeling throwback disco vibes or the latest club hits, they keep the energy high for the full 4 hours.
          </p>
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
            Our <strong>Professional Photographer</strong> captures both candid moments and those essential "posed" group shots. Within a few days of your cruise, you'll receive a link to high-res photos that are ready for social media—at no extra charge.
          </p>
          <BlogImageBreak 
            src={capitalShots2} 
            alt="Pro photographer shots on ATX Disco Cruise" 
            caption="High-quality group photos are included with every booking."
          />
        </section>

      <InlineCTABar variant="amber" />

        <section id="what-to-bring" className="scroll-mt-24 mb-16">
          <h2 className="heading-unbounded text-2xl sm:text-3xl font-bold mb-6 text-slate-900 dark:text-white">
            The Packing List: What You Should Bring
          </h2>
          <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl mb-8 border-l-4 border-blue-600">
            <h3 className="font-bold text-xl mb-4 text-slate-900 dark:text-white">Bring These Essentials:</h3>
            <ul className="space-y-3 text-slate-700 dark:text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-blue-600" /> <strong>Drinks:</strong> Beer and seltzers in cans are ideal. Wine, champagne, and spirits in bottles are welcome — just keep them in your cooler. No glass beer bottles.</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-blue-600" /> <strong>Snacks:</strong> Easy, non-messy finger foods — sandwiches, breakfast tacos, granola bars.</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-blue-600" /> <strong>Sunscreen:</strong> Spray or cream — both are fine. Apply at the rails to keep it off the dance floor.</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-blue-600" /> <strong>Towels:</strong> For after you hit the lake.</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-blue-600" /> <strong>Themes/Costumes:</strong> Matching shirts or disco gear are highly encouraged!</li>
            </ul>
          </div>
          <BlogImageBreak 
            src={dancingScene} 
            alt="Groups dancing on Lake Travis party boat" 
            caption="Come ready to dance—everything else is handled."
          />
        </section>

        <section id="what-not-to-bring" className="scroll-mt-24 mb-16">
          <h2 className="heading-unbounded text-2xl sm:text-3xl font-bold mb-6 text-slate-900 dark:text-white">
            The Forbidden List: What NOT to Bring
          </h2>
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
            Safety is our #1 priority. To keep our 100% safety record intact, we have a few non-negotiable rules.
          </p>
          <div className="bg-red-50 dark:bg-red-900/10 p-8 rounded-2xl border-l-4 border-red-600">
            <ul className="space-y-4 text-slate-700 dark:text-slate-300 font-semibold">
              <li className="flex items-center gap-3"><Ban className="h-6 w-6 text-red-600" /> No glass beer bottles — beer must be in cans. Wine, champagne, and spirits in a cooler are fine.</li>
              <li className="flex items-center gap-3"><Ban className="h-6 w-6 text-red-600" /> No messy food. Help us keep the boat clean — no jello shots or anything that stains.</li>
              <li className="flex items-center gap-3"><Ban className="h-6 w-6 text-red-600" /> No illegal substances.</li>
            </ul>
          </div>
        </section>

      <InlineCTABar variant="navy" />

        <section id="byob-guide" className="scroll-mt-24 mb-16">
          <h2 className="heading-unbounded text-2xl sm:text-3xl font-bold mb-6 text-slate-900 dark:text-white">
            BYOB Like a Pro
          </h2>
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
            Since we don't serve alcohol, you can save massive amounts of money compared to club pricing. A round of drinks for 10 people at a bar runs $80–$150. On the Disco Cruise, you buy a case for $25–$40 and keep it cold in our pre-iced coolers the entire four hours.
          </p>
          <Card className="bg-amber-50 dark:bg-slate-800 border-none mb-4">
            <CardContent className="pt-6">
              <p className="text-lg font-bold text-slate-900 dark:text-white mb-2">Pro Tip: Stick to Beer & Seltzers</p>
              <p className="text-slate-700 dark:text-slate-300">
                You want to actually <em>remember</em> this day. Beer and hard seltzers in cans are the move — they stay cold, they're easy to carry, and they pace you perfectly across four hours on the lake. Wine and spirits are welcome too, just keep bottles in your cooler.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-blue-50 dark:bg-slate-800 border-none">
            <CardContent className="pt-6">
              <p className="text-lg font-bold text-slate-900 dark:text-white mb-2">Pro Tip: Use Party On Delivery</p>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                Visit <a href="https://partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold hover:underline">Party On Delivery</a>. They deliver beer, seltzers, liquor, and mixers directly to <strong>Anderson Mill Marina (13993 FM 2769, Leander TX 78641)</strong>. Your drinks will be waiting for you when you arrive — no heavy cooler hauling needed.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="scroll-mt-24 mb-16">
          <h2 className="heading-unbounded text-2xl sm:text-3xl font-bold mb-6 text-slate-900 dark:text-white">
            What Your Day Actually Looks Like
          </h2>
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
            Knowing the day-of flow helps you plan. Here's a realistic picture of what happens from parking to post-cruise:
          </p>
          <div className="space-y-4 mb-8">
            {[
              { time: "T-20 min", label: "Arrive at the marina", detail: "Park at Anderson Mill Marina, grab your drinks from Party On Delivery or your own cooler, and check in at the dock." },
              { time: "T-5 min", label: "Board the boat", detail: "Load drinks into the built-in coolers. The DJ is already set up. Your photographer will capture candid boarding shots." },
              { time: "Hour 1", label: "Depart + open water", detail: "The DJ gets the music going immediately. Captain navigates out to open Lake Travis. The photographer starts working the crowd." },
              { time: "Hours 1–2", label: "Party cove stop", detail: "Captain anchors at a cove. Giant lily pads deploy. Groups swim, float, and mingle between boats." },
              { time: "Hours 2–4", label: "Full party mode", detail: "Return to open water or stay anchored. DJ hits peak energy. Photographer captures the best moments of the trip." },
              { time: "Return", label: "Back at the marina", detail: "Captain docks. You'll receive your photo gallery link within a few days." },
            ].map((step, i) => (
              <div key={i} className="flex gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
                <div className="shrink-0 w-20 font-black text-blue-600 text-sm pt-1">{step.time}</div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{step.label}</p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="scroll-mt-24 mb-16">
          <h2 className="heading-unbounded text-2xl sm:text-3xl font-bold mb-6 text-slate-900 dark:text-white">
            Themes, Costumes &amp; Matching Outfits
          </h2>
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
            The ATX Disco Cruise is full of groups with matching outfits, custom sashes, and themed costumes. Your group doesn't need a theme, but having one makes the photos exponentially better and helps the photographer find your crew across the boat.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {[
              "Matching neon or white t-shirts",
              "Disco-era platform shoes and bell-bottoms",
              "Custom bride tribe tanks with everyone's name",
              "Coordinated swimsuits (great for the lily pad section)",
              "Sashes, tiaras, or matching hats",
              "Anything that screams 'we are CELEBRATING'",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0" />
                <span className="text-slate-700 dark:text-slate-300">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-base">
            The professional photographer knows how to capture group shots on a moving boat with disco balls refracting light everywhere. Lean into it.
          </p>
        </section>

        <section id="faqs" className="scroll-mt-24 mb-16">
          <h2 className="heading-unbounded text-2xl sm:text-3xl font-bold mb-8 text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Do they provide cups and ice?</AccordionTrigger>
              <AccordionContent>
                Yes! We provide high-quality plastic cups, koozies, and large coolers that are already pre-filled with ice before you arrive. You just need to bring the liquid.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is there food on board?</AccordionTrigger>
              <AccordionContent>
                We do not serve food, but you are welcome to bring your own! We recommend easy-to-eat items like sandwiches, granola bars, or pre-ordered snack boxes.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Can I bring a cooler?</AccordionTrigger>
              <AccordionContent>
                You can, but you don't need to! We have large, built-in coolers on all our vessels (<em>Day Tripper, Meeseeks, Clever Girl</em>) that are pre-iced for your convenience.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>What's the exact BYOB policy?</AccordionTrigger>
              <AccordionContent>
                You can bring any alcoholic beverage as long as it is in a <strong>can or plastic container</strong>. Glass is strictly prohibited on Lake Travis for safety reasons. Hard liquor must be transferred to plastic bottles before boarding.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Is the photographer really included at no extra charge?</AccordionTrigger>
              <AccordionContent>
                Yes, it is truly included. No watermarks, no hidden "photo package" fees. We believe every group deserves professional memories of their trip.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </BlogPostLayout>
    </LazyMotionProvider>
  );
}

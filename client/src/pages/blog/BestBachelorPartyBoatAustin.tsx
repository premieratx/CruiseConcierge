import { m, fadeInUp } from '@/components/LazyMotion';
import { Link } from 'wouter';
import { 
  DollarSign, CheckCircle2, XCircle, ShieldCheck, 
  HelpCircle, ArrowRight, TrendingUp, Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { BlogPostLayout, type TOCSection } from '@/components/blog/BlogPostLayout';
import { BlogImageBreak } from '@/components/BlogImageBreak';

import discoFun from '@assets/disco_fun_best2_1765193453547.jpg';
import capitalShots1 from '@assets/@capitalcityshots-1_1760080740012.jpg';
import cleverGirl from '@assets/clever-girl-50-person-boat.webp';
import InlineCTABar from '@/components/InlineCTABar';

const sections: TOCSection[] = [
  { id: 'atx-disco-pricing', title: 'ATX Disco Cruise Pricing' },
  { id: 'private-charter-pricing', title: 'Private Charter Pricing' },
  { id: 'cost-comparison', title: 'The Side-by-Side Cost Comparison' },
  { id: 'what-you-avoid', title: 'Hidden Costs You Avoid' },
  { id: 'which-is-better', title: 'Which Is Better for Your Budget?' },
  { id: 'faqs', title: 'Frequently Asked Questions' },
];

export default function WhatYouGetForMoneyPartyBoat() {
  return (
    <BlogPostLayout
      title="What You Actually Get for Your Money on an Austin Party Boat: Full Cost Breakdown"
      metaDescription="Full Austin party boat cost breakdown 2026. ATX Disco Cruise from $85/person all-inclusive vs. private charters from $200/hr. Includes pricing tables for groups of 5, 10, 15, 20+ people."
      publishDate="2025-05-17"
      author="Captain Brian"
      heroImage={discoFun}
      heroImageAlt="Group of friends celebrating on a Lake Travis party boat with disco balls"
      keywords={['Austin party boat cost', 'Lake Travis party boat price', 'ATX Disco Cruise price 2026', 'party boat rental Austin cost', 'how much does ATX Disco Cruise cost', 'Austin party boat comparison']}
      pageRoute="/blogs/what-you-actually-get-for-your-money-on-an-austin-party-boat-full-cost-breakdown"
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
      <section id="atx-disco-pricing" className="mb-12">
        <p className="text-lg leading-relaxed mb-6">
          When you're planning a trip to Austin, budgeting is everything. Whether you're organizing a <Link href="/bachelorette-party-austin" className="text-blue-600 hover:underline font-semibold">bachelorette party</Link> or a <Link href="/bachelor-party-austin" className="text-blue-600 hover:underline font-semibold">bachelor party</Link>, between Airbnbs, dinners on Rainey Street, and bar tabs on 6th, the costs add up quickly.
        </p>
        <p className="text-lg leading-relaxed mb-10">
          The <Link href="/atx-disco-cruise" className="text-blue-600 hover:underline font-semibold font-bold">ATX Disco Cruise</Link> was built to provide the most transparent, all-inclusive pricing in Austin. Here is exactly what you pay and what you get in 2026.
        </p>

        <div className="bg-slate-900 rounded-3xl p-8 text-white mb-12 shadow-xl border border-slate-800">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="text-blue-400" />
            2026 ATX Disco Cruise Rates
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 text-center">
              <p className="text-slate-400 font-bold uppercase tracking-wider text-xs mb-2">Friday 12pm</p>
              <p className="text-4xl font-bold text-white mb-2">$95</p>
              <p className="text-slate-400">per person</p>
            </div>
            <div className="bg-blue-600 p-6 rounded-2xl border border-blue-400 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-amber-400 text-slate-900 text-[10px] font-black px-3 py-1 uppercase transform rotate-45 translate-x-3 translate-y-2">Popular</div>
              <p className="text-blue-100 font-bold uppercase tracking-wider text-xs mb-2">Saturday 11am</p>
              <p className="text-4xl font-bold text-white mb-2">$105</p>
              <p className="text-blue-100">per person</p>
            </div>
            <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 text-center">
              <p className="text-slate-400 font-bold uppercase tracking-wider text-xs mb-2">Saturday 3:30pm</p>
              <p className="text-4xl font-bold text-white mb-2">$85</p>
              <p className="text-slate-400">per person</p>
            </div>
          </div>
          <p className="mt-8 text-slate-400 italic text-center">
            *All prices are <strong>all-in</strong>. We include tax (8.25%) and gratuity (20%) in our per-person pricing so there are no surprises.
          </p>
        </div>
      </section>

      <BlogImageBreak 
        src={capitalShots1} 
        alt="Happy guests on the ATX Disco Cruise" 
        caption="Our pricing includes everything you need for a legendary 4-hour party."
      />

      <section id="private-charter-pricing" className="mb-12">
        <h2 className="heading-unbounded text-2xl font-bold mb-6 text-slate-900">Private Charter Pricing</h2>
        <p className="text-lg leading-relaxed mb-6">
          If you prefer an exclusive experience, <Link href="/private-cruises" className="text-blue-600 hover:underline">private charters</Link> are priced by the hour. Note that these are base rates and typically exclude a DJ and photographer.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <Card>
            <CardContent className="pt-6 text-center">
              <h4 className="font-bold text-lg mb-2">Day Tripper</h4>
              <p className="text-blue-600 font-bold text-xl mb-1">From $200/hr</p>
              <p className="text-slate-500 text-sm">Up to 14 guests</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <h4 className="font-bold text-lg mb-2">Meeseeks</h4>
              <p className="text-blue-600 font-bold text-xl mb-1">From $225/hr</p>
              <p className="text-slate-500 text-sm">Up to 30 guests</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <h4 className="font-bold text-lg mb-2">Clever Girl</h4>
              <p className="text-blue-600 font-bold text-xl mb-1">From $250/hr</p>
              <p className="text-slate-500 text-sm">Up to 75 guests</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <InlineCTABar variant="amber" />

      <section id="cost-comparison" className="mb-12">
        <h2 className="heading-unbounded text-2xl font-bold mb-8 text-slate-900 text-center">The Side-by-Side Cost Comparison</h2>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full border-collapse bg-white">
            <thead>
              <tr className="bg-slate-900">
                <th className="p-4 text-left border-r border-slate-700 text-white font-semibold">Group Size</th>
                <th className="p-4 text-left border-r border-slate-700 text-white font-semibold">ATX Disco Cruise (All-In)</th>
                <th className="p-4 text-left text-white font-semibold">Private Charter (Estimated)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-4 border-b border-r border-slate-100 font-bold">8 People</td>
                <td className="p-4 border-b border-r border-slate-100 font-bold text-blue-600">$840 total</td>
                <td className="p-4 border-b border-slate-100">$1,400+ total</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="p-4 border-b border-r border-slate-100 font-bold">12 People</td>
                <td className="p-4 border-b border-r border-slate-100 font-bold text-blue-600">$1,260 total</td>
                <td className="p-4 border-b border-slate-100">$1,600+ total</td>
              </tr>
              <tr>
                <td className="p-4 border-b border-r border-slate-100 font-bold">15 People</td>
                <td className="p-4 border-b border-r border-slate-100 font-bold text-blue-600">$1,575 total</td>
                <td className="p-4 border-b border-slate-100">$1,800+ total</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="p-4 border-r border-slate-100 font-bold">25 People</td>
                <td className="p-4 border-r border-slate-100 font-bold text-blue-600">$2,625 total</td>
                <td className="p-4 font-bold text-slate-900">$2,200+ total</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-slate-600 text-sm italic">
          *Private charter estimate includes 4 hours + tax + standard gratuity. Does not include DJ or Photographer costs.
        </p>
      </section>

      <BlogImageBreak 
        src={cleverGirl} 
        alt="The Clever Girl boat at Anderson Mill Marina" 
        caption="Our flagship vessel is where the ATX Disco Cruise magic happens."
      />

      <section id="what-you-avoid" className="mb-12">
        <h2 className="heading-unbounded text-2xl font-bold mb-6 text-slate-900">Hidden Costs You Avoid</h2>
        <p className="text-lg leading-relaxed mb-6">
          When you book a standard boat rental, the listed price is rarely the final price. Here are the line items you avoid with the ATX Disco Cruise:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <div className="flex gap-3 items-center bg-slate-50 p-4 rounded-lg">
            <XCircle className="text-red-500 shrink-0" />
            <span className="font-semibold text-slate-700">DJ Hire: Save $300–$500</span>
          </div>
          <div className="flex gap-3 items-center bg-slate-50 p-4 rounded-lg">
            <XCircle className="text-red-500 shrink-0" />
            <span className="font-semibold text-slate-700">Photographer: Save $200–$400</span>
          </div>
          <div className="flex gap-3 items-center bg-slate-50 p-4 rounded-lg">
            <XCircle className="text-red-500 shrink-0" />
            <span className="font-semibold text-slate-700">Ice & Cups: Save $40–$60</span>
          </div>
          <div className="flex gap-3 items-center bg-slate-50 p-4 rounded-lg">
            <XCircle className="text-red-500 shrink-0" />
            <span className="font-semibold text-slate-700">"Tip Anxiety": Gratuity is already included</span>
          </div>
        </div>
      </section>

      <InlineCTABar variant="navy" />

      <section id="which-is-better" className="mb-12">
        <h2 className="heading-unbounded text-2xl font-bold mb-6 text-slate-900">Which Is Better for Your Budget?</h2>
        <p className="text-lg leading-relaxed mb-6">
          The math is simple:
        </p>
        <ul className="space-y-4 text-lg mb-8">
          <li className="flex gap-3">
            <Info className="h-6 w-6 text-blue-600 shrink-0" />
            <span><strong>Choose ATX Disco Cruise</strong> if you have 2 to 20 people and want a high-energy party with a live DJ and professional photos. It's the best dollar-for-dollar value in Austin — and there's no minimum group size.</span>
          </li>
          <li className="flex gap-3">
            <Info className="h-6 w-6 text-blue-600 shrink-0" />
            <span><strong>Choose a Private Charter</strong> if you have 25+ people or specifically want to be alone with your crew with no other groups on board.</span>
          </li>
        </ul>

        <h3 className="text-xl font-bold mb-4 text-slate-900">Total Budget by Group Size (ATX Disco Cruise)</h3>
        <div className="overflow-x-auto rounded-xl border border-slate-200 mb-8">
          <table className="w-full border-collapse bg-white">
            <thead>
              <tr className="bg-slate-900">
                <th className="p-4 text-left border-r border-slate-700 text-white font-semibold">Group Size</th>
                <th className="p-4 text-left border-r border-slate-700 text-white font-semibold">Friday ($95)</th>
                <th className="p-4 text-left border-r border-slate-700 text-white font-semibold">Sat 11am ($105)</th>
                <th className="p-4 text-left text-white font-semibold">Sat 3:30pm ($85)</th>
              </tr>
            </thead>
            <tbody>
              {[
                { size: "5 people", fri: "$475", sat1: "$525", sat2: "$425" },
                { size: "10 people", fri: "$950", sat1: "$1,050", sat2: "$850" },
                { size: "15 people", fri: "$1,425", sat1: "$1,575", sat2: "$1,275" },
                { size: "20 people", fri: "$1,900", sat1: "$2,100", sat2: "$1,700" },
              ].map((row, i) => (
                <tr key={i} className={i % 2 === 1 ? "bg-slate-50" : ""}>
                  <td className="p-4 border-b border-r border-slate-100 font-bold">{row.size}</td>
                  <td className="p-4 border-b border-r border-slate-100 text-blue-600 font-semibold">{row.fri}</td>
                  <td className="p-4 border-b border-r border-slate-100 text-blue-600 font-semibold">{row.sat1}</td>
                  <td className="p-4 border-b border-slate-100 text-blue-600 font-semibold">{row.sat2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-slate-500 text-sm italic mb-10">All prices all-inclusive: tax + 20% gratuity already included. No hidden fees.</p>
      </section>

      <section className="mb-12">
        <h2 className="heading-unbounded text-2xl font-bold mb-6 text-slate-900">How to Book &amp; What Happens Next</h2>
        <p className="text-lg leading-relaxed mb-6">
          Booking the ATX Disco Cruise is straightforward. Here's the full flow so you know exactly what to expect:
        </p>
        <div className="space-y-4 mb-8">
          {[
            { step: "1", title: "Choose your time slot", detail: "Friday 12–4pm, Saturday 11am–3pm, or Saturday 3:30–7:30pm. Saturday 11am sells out first — book that one at least 2–3 months ahead in peak season." },
            { step: "2", title: "Book individual tickets", detail: "Each person buys a ticket. No need to reserve an entire boat. Group members can pay separately." },
            { step: "3", title: "Receive confirmation", detail: "You get a confirmation email with the marina address (13993 FM 2769, Leander TX 78641), arrival instructions, and a packing reminder." },
            { step: "4", title: "Arrange transportation", detail: "Plan for 30–35 minutes from downtown Austin. Many groups book a party bus or rideshare van so everyone rides together and no one has to worry about driving." },
            { step: "5", title: "Arrive 15–20 minutes early", detail: "Check in at the dock, load your drinks into the on-board coolers, and meet your captain and photographer." },
          ].map((item) => (
            <div key={item.step} className="flex gap-4 p-5 bg-slate-50 rounded-xl border border-slate-100">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0">{item.step}</div>
              <div>
                <p className="font-bold text-slate-900">{item.title}</p>
                <p className="text-slate-600 text-sm mt-1">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="faqs" className="mb-12">
        <h2 className="heading-unbounded text-2xl font-bold mb-8 text-slate-900 text-center">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left font-bold text-lg">Is gratuity included in the per-person price?</AccordionTrigger>
            <AccordionContent className="text-slate-700 text-lg">
              Yes! Our per-person pricing ($85–$105) is "all-in," meaning it already includes 8.25% sales tax and a 20% gratuity for the captain and crew. No math required on the boat!
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-left font-bold text-lg">When does a private charter become cheaper?</AccordionTrigger>
            <AccordionContent className="text-slate-700 text-lg">
              Mathematically, if you have more than 25-30 guests, a private charter on our larger vessels can become more cost-effective per person. However, remember that you lose the live DJ and professional photographer included on the Disco Cruise.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-left font-bold text-lg">Are there group discounts?</AccordionTrigger>
            <AccordionContent className="text-slate-700 text-lg">
              Because our per-person pricing is already optimized for value and includes all-inclusive features like a DJ and photographer, we do not offer additional group discounts for the ATX Disco Cruise.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-left font-bold text-lg">What about weekday vs weekend pricing?</AccordionTrigger>
            <AccordionContent className="text-slate-700 text-lg">
              The ATX Disco Cruise runs on Fridays ($95) and Saturdays ($105 for 11am slot, $85 for 3:30pm slot). Weekdays (Mon-Thu) are reserved for private charters.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger className="text-left font-bold text-lg">How far in advance should we book?</AccordionTrigger>
            <AccordionContent className="text-slate-700 text-lg">
              Saturdays in prime season (April-September) typically sell out 2–3 months in advance. We recommend booking your tickets as soon as your group has finalized their Austin dates.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 text-center mt-16 shadow-2xl">
        <h2 className="heading-unbounded text-3xl font-bold mb-6 text-blue-400">Ready to Book the Best Value in Austin?</h2>
        <p className="text-xl mb-10 text-slate-300 max-w-2xl mx-auto">
          Don't wait for the prices to go up or the slots to fill. Secure your spot on the #1 party boat today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/atx-disco-cruise">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-6 text-lg">
              Book ATX Disco Cruise
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-bold">
              Get Price Quote
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </BlogPostLayout>
  );
}

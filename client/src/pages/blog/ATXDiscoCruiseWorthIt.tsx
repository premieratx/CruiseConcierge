import { useEffect } from 'react';
import { m, LazyMotionProvider, fadeInUp } from '@/components/LazyMotion';
import { Link } from 'wouter';
import BlogV2Layout from '@/components/BlogV2Layout';
import { TOCSection } from '@/components/blog/BlogPostLayout';
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
  DollarSign, 
  CheckCircle2, 
  XCircle, 
  TrendingUp, 
  Users, 
  Ship 
} from 'lucide-react';

// Photo Imports
import discoFun2 from '@assets/disco_fun2_1765193453547.jpg';
import capitalShots3 from '@assets/@capitalcityshots-3_1760080740017.jpg';
import cleverGirl from '@assets/clever-girl-50-person-boat.webp';
import InlineCTABar from '@/components/InlineCTABar';

const sections: TOCSection[] = [
  { id: 'whats-included', title: "What's Included in the Ticket?" },
  { id: 'cost-breakdown', title: 'The Real Cost Breakdown' },
  { id: 'vs-private-charter', title: 'Disco Cruise vs. Private Charter' },
  { id: 'when-private-wins', title: 'When Does Private Make More Sense?' },
  { id: 'verdict', title: 'The Verdict: Is It Worth It?' },
  { id: 'faqs', title: 'Frequently Asked Questions' },
];

export default function ATXDiscoCruiseWorthIt() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LazyMotionProvider>
      <BlogV2Layout
        slug="is-the-atx-disco-cruise-worth-it-breaking-down-the-value-vs-a-private-boat"
        title="Is the ATX Disco Cruise Worth It? Breaking Down the Value vs. a Private Boat"
        description="Is the ATX Disco Cruise worth it? Full value breakdown: $85–$105/person all-inclusive with DJ + photographer vs. private boat rental costs. The honest comparison most Austin party planners need."
        publishDate="2025-05-18"
        author="Captain Brian"
        heroImage={discoFun2}
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
          <Badge className="mb-4 bg-slate-900 text-white font-bold">VALUE ANALYSIS</Badge>
          <h2 className="heading-unbounded text-2xl sm:text-3xl font-bold mb-6 text-slate-900 dark:text-white">
            What's Actually Included in Your Ticket?
          </h2>
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
            When you're planning a <Link href="/bachelor-party-austin" className="text-blue-600 hover:underline font-semibold">Lake Travis bachelor party</Link> or <Link href="/bachelorette-party-austin" className="text-blue-600 hover:underline font-semibold">bachelorette party</Link>, the first thing you look at is the price. At first glance, a per-person ticket might seem different than a flat hourly rate for a boat. But to understand if the <strong>ATX Disco Cruise</strong> is worth it, you have to look at what's included.
          </p>
          <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl mb-8">
            <h3 className="font-bold text-xl mb-4 text-slate-900 dark:text-white">The "All-Inclusive" List:</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-blue-600" /> 4-Hour Cruise on Lake Travis</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-blue-600" /> Professional DJ (ATX Disco Cruise ONLY)</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-blue-600" /> Professional Photographer</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-blue-600" /> Giant Lily Pad Floats</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-blue-600" /> Coolers with Ice</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-blue-600" /> Cups, Koozies, & Bubbles</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-blue-600" /> All Taxes & Gratuity Included</li>
            </ul>
          </div>
        </section>

        <section id="cost-breakdown" className="scroll-mt-24 mb-16">
          <h2 className="heading-unbounded text-2xl sm:text-3xl font-bold mb-6 text-slate-900 dark:text-white">
            The Real Cost Breakdown
          </h2>
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
            Let's look at the numbers for 2026. A Saturday morning ATX Disco Cruise is $105/person. For a group of 12, that's $1,260 total. 
          </p>
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-6">
            If you were to book a <strong>private charter</strong> for the same 4 hours, you'd typically pay:
          </p>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800">
                  <th className="py-4 font-bold text-slate-900 dark:text-white">Item</th>
                  <th className="py-4 font-bold text-slate-900 dark:text-white">Private Charter Est.</th>
                  <th className="py-4 font-bold text-slate-900 dark:text-white">Disco Cruise</th>
                </tr>
              </thead>
              <tbody className="text-slate-700 dark:text-slate-400">
                <tr className="border-b border-slate-100 dark:border-slate-800/50">
                  <td className="py-4">Boat Rental (4 hrs)</td>
                  <td className="py-4">$800 – $1,400</td>
                  <td className="py-4">Included</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-800/50">
                  <td className="py-4">Professional DJ</td>
                  <td className="py-4">$300 – $500</td>
                  <td className="py-4">Included</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-800/50">
                  <td className="py-4">Professional Photographer</td>
                  <td className="py-4">$200 – $400</td>
                  <td className="py-4">Included</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-800/50">
                  <td className="py-4">Taxes & Mandatory Gratuity</td>
                  <td className="py-4">25-30% on top</td>
                  <td className="py-4">Included</td>
                </tr>
                <tr className="font-bold text-slate-900 dark:text-white">
                  <td className="py-4">Estimated Total</td>
                  <td className="py-4">$1,600 – $2,500+</td>
                  <td className="py-4">$1,260 (for 12 people)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <BlogImageBreak 
            src={capitalShots3} 
            alt="Photography included on ATX Disco Cruise" 
            caption="The professional photography alone is worth $300+, and it's included with every ticket."
          />
        </section>

      <InlineCTABar variant="amber" />

        <section id="vs-private-charter" className="scroll-mt-24 mb-16">
          <h2 className="heading-unbounded text-2xl sm:text-3xl font-bold mb-6 text-slate-900 dark:text-white">
            Disco Cruise vs. Private Charter
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-bold text-xl text-blue-600 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" /> ATX Disco Cruise Wins If:
              </h3>
              <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                <li>• Your group is 2–25+ people celebrating a bach party</li>
                <li>• You want a high-energy DJ atmosphere</li>
                <li>• You want professional photos for the "Gram"</li>
                <li>• You want to meet other bachelor/bachelorette groups</li>
                <li>• You want zero "bill anxiety" (everything is pre-paid)</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-bold text-xl text-slate-600 flex items-center gap-2">
                <Ship className="h-5 w-5" /> Private Charter Wins If:
              </h3>
              <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                <li>• Your group is 25+ people</li>
                <li>• You want complete exclusivity</li>
                <li>• You have a very specific playlist/vibe in mind</li>
                <li>• You're celebrating a family milestone where mixing isn't ideal</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="when-private-wins" className="scroll-mt-24 mb-16">
          <h2 className="heading-unbounded text-2xl sm:text-3xl font-bold mb-6 text-slate-900 dark:text-white">
            When Does a Private Charter Make More Sense?
          </h2>
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
            While the <strong>ATX Disco Cruise</strong> is an incredible value for most <Link href="/bachelorette-party-austin" className="text-blue-600 hover:underline font-semibold">Austin bachelorette parties</Link>, there are times when a <Link href="/private-cruises" className="text-blue-600 hover:underline font-semibold">private charter</Link> is actually the better move.
          </p>
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
            For large groups of 25 to 75 people, booking our flagship <em>Clever Girl</em> for a private event can be more cost-effective and provides total control over the experience. You won't have a live DJ (private charters use a high-end Bluetooth sound system), but you get the entire 14-disco-ball vessel to yourselves.
          </p>
          <BlogImageBreak 
            src={cleverGirl} 
            alt="Clever Girl flagship boat for private charters" 
            caption="The Clever Girl: Best for groups of 30-75 wanting a private experience."
          />
        </section>

      <InlineCTABar variant="navy" />

        <section id="verdict" className="scroll-mt-24 mb-16">
          <div className="bg-blue-600 text-white p-10 rounded-2xl shadow-xl">
            <h2 className="text-3xl font-bold mb-6">The Verdict: Is It Worth It?</h2>
            <p className="text-xl mb-8 leading-relaxed">
              <strong>YES.</strong> For the vast majority of bachelor and bachelorette groups visiting Austin, the ATX Disco Cruise is the best ROI on the lake. 
            </p>
            <p className="text-lg mb-8 opacity-90">
              You're getting $1,500+ worth of entertainment (DJ, photos, boat, crew, ice) for a fraction of the price, plus a built-in party atmosphere that's impossible to replicate on a private boat with just 10-12 people.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/atx-disco-cruise">
                <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-100 transition-colors w-full">
                  Book the Disco Cruise
                </button>
              </Link>
              <Link href="/pricing-breakdown">
                <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-colors w-full">
                  View Pricing Table
                </button>
              </Link>
            </div>
          </div>
        </section>

        <section id="faqs" className="scroll-mt-24 mb-16">
          <h2 className="heading-unbounded text-2xl sm:text-3xl font-bold mb-8 text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What's the real all-in cost after tax and gratuity?</AccordionTrigger>
              <AccordionContent>
                The prices we list ($85-$105) are truly all-in. We include the 8.25% Texas sales tax and a 20% crew gratuity in the ticket price so your group doesn't have to worry about math or extra payments on the day of the cruise.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>When does a private charter make more sense?</AccordionTrigger>
              <AccordionContent>
                A private charter makes sense if you have 25+ people, or if you strictly want a private family-only vibe. If you have 15 people and want a private boat, you'll likely pay 50-80% more than the Disco Cruise for a less "produced" experience.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Are there hidden fees?</AccordionTrigger>
              <AccordionContent>
                None. No fuel surcharges, no "captain fees," no ice fees. The only extra cost is whatever you choose to spend on your BYOB drinks and snacks.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>What if I have 25+ people?</AccordionTrigger>
              <AccordionContent>
                If you have a large group, we recommend looking at our <Link href="/private-cruises" className="text-blue-600 hover:underline">Private Cruise options</Link>. For groups over 25, the per-person cost of a private charter starts to align closer with the Disco Cruise, and you get the benefit of exclusivity.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Is there a group discount?</AccordionTrigger>
              <AccordionContent>
                Our per-person pricing is already optimized for group value. Because the boat is shared, small groups of 6-10 get the "big boat" experience and pro amenities that would normally only be affordable for 50+ person corporate events.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </BlogV2Layout>
    </LazyMotionProvider>
  );
}

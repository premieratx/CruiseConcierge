import { useEffect } from 'react';
import { m, LazyMotionProvider, fadeInUp } from '@/components/LazyMotion';
import { Link } from 'wouter';
import { 
  Ship, Users, CheckCircle2, XCircle,
  Music, Waves, Beer, Star, ArrowRight, Camera,
  Instagram, DollarSign, Heart, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BlogPostLayout, TOCSection } from '@/components/blog/BlogPostLayout';
import { BlogImageBreak } from '@/components/BlogImageBreak';
import { SectionReveal } from '@/components/SectionReveal';

import cleverGirl3 from '@assets/clever-girl-3-bachelorette-boat.jpg';
import capitalShots1 from '@assets/@capitalcityshots-1_1760080740012.jpg';
import discoFun from '@assets/disco_fun_best2_1765193453547.jpg';
import cleverGirl2 from '@assets/clever-girl-2-party-boat-austin.jpg';
import InlineCTABar from '@/components/InlineCTABar';

const sections: TOCSection[] = [
  { id: 'the-key-differences', title: 'The Key Differences' },
  { id: 'why-bachelorettes-choose-disco', title: 'Why Bachelorettes Choose Disco' },
  { id: 'photographer-matters', title: 'Why the Photographer Matters' },
  { id: 'when-private-wins', title: 'When Private Wins' },
  { id: 'our-recommendation', title: 'Our Recommendation' },
  { id: 'faqs', title: 'Frequently Asked Questions' },
];

export default function ATXDiscoCruiseVsPrivateBachelorette() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LazyMotionProvider>
      <BlogPostLayout
        title="ATX Disco Cruise vs. Private Boat: Which Is Better for a Bachelorette Party?"
        metaDescription="ATX Disco Cruise vs. private boat rental for your Austin bachelorette party? Full comparison of cost, photos, vibe, and logistics. For most groups of 6–20, the Disco Cruise wins. Here's exactly why."
        publishDate="2025-05-25"
        author="Captain Brian"
        heroImage={cleverGirl3}
        heroImageAlt="Bachelorette party on a Lake Travis party boat"
        keywords={['Austin bachelorette boat rental', 'bachelorette party boat Austin', 'ATX Disco Cruise bachelorette', 'private boat bachelorette Austin', 'Lake Travis bachelorette party 2026', 'bachelorette cruise Austin']}
        pageRoute="/blogs/atx-disco-cruise-vs-private-boat-which-is-better-for-a-bachelorette-party"
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
        <SectionReveal id="the-key-differences">
          <h2 className="heading-unbounded text-2xl font-bold mb-6">The Bachelorette Boat Dilemma</h2>
          <p>
            When you're planning an <Link href="/bachelorette-party-austin" className="text-blue-600 hover:underline">Austin bachelorette party</Link>, the "Boat Day" is usually the non-negotiable event. But you're faced with a choice: Do you rent a private boat or join the **ATX Disco Cruise**?
          </p>
          <p>
            While a <Link href="/private-cruises" className="text-blue-600 hover:underline">private boat rental</Link> offers exclusivity, the <Link href="/atx-disco-cruise" className="text-blue-600 hover:underline">ATX Disco Cruise</Link> was designed specifically to solve the problems bachelorette groups face most. Here's how the two stack up for 2026. Planning a combined trip? The <Link href="/bachelor-party-austin" className="text-blue-600 hover:underline">Austin Bachelor Party page</Link> covers everything for the groom's crew.
          </p>

          <div className="grid md:grid-cols-2 gap-8 my-10">
            <div className="bg-blue-50 dark:bg-slate-900 p-6 rounded-xl border border-blue-100 dark:border-blue-900">
              <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                <Star className="text-amber-500 h-5 w-5" />
                ATX Disco Cruise
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-600 mt-1" /> All-inclusive entertainment (DJ & Photographer)</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-600 mt-1" /> Co-ed party mixer atmosphere</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-600 mt-1" /> Predictable per-person pricing</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-600 mt-1" /> High-energy disco theme & aesthetics</li>
              </ul>
            </div>
            <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                <Ship className="text-slate-500 h-5 w-5" />
                Private Charter
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-600 mt-1" /> Complete exclusivity for your group</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-600 mt-1" /> You control the music and itinerary</li>
                <li className="flex items-start gap-2"><XCircle className="h-4 w-4 text-red-600 mt-1" /> No professional DJ (Bluetooth only)</li>
                <li className="flex items-start gap-2"><XCircle className="h-4 w-4 text-red-600 mt-1" /> No photographer included</li>
              </ul>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal id="why-bachelorettes-choose-disco">
          <h2 className="heading-unbounded text-2xl font-bold mb-6">Why the Disco Cruise Wins for Bachelorettes</h2>
          <p>
            For bachelorette groups of 2 to 25+, the ATX Disco Cruise is the clear winner — and it isn't close. Why? Because it's a <strong>ready-made party built exclusively for bach celebrations.</strong>
          </p>
          <div className="space-y-6 my-10">
            <div className="flex gap-4">
              <div className="mt-1"><Instagram className="h-6 w-6 text-amber-500" /></div>
              <div>
                <h3 className="font-bold text-xl mb-2">The Aesthetic Factor</h3>
                <p>14 disco balls, bubbles, party lights, and matching koozies. The boat is designed to look good in your group photos. A standard private boat just can't compete with the "Disco" aesthetic.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="mt-1"><Music className="h-6 w-6 text-blue-600" /></div>
              <div>
                <h3 className="font-bold text-xl mb-2">The "Supergroup" Experience</h3>
                <p>Bachelorette groups consistently tell us that meeting other groups (both bachelor and bachelorette) was the highlight. It turns a 12-person gathering into a 75-person festival atmosphere.</p>
              </div>
            </div>
          </div>
          
          <BlogImageBreak 
            src={capitalShots1} 
            alt="Bachelorette group on Lake Travis" 
            caption="Bachelorette groups love the energy of meeting other groups on the water."
          />
        </SectionReveal>

      <InlineCTABar variant="amber" />

        <SectionReveal id="photographer-matters">
          <h2 className="heading-unbounded text-2xl font-bold mb-6">The "Instagram Insurance" (Professional Photography)</h2>
          <p>
            The #1 reason bachelorette planners choose the ATX Disco Cruise is the **included professional photographer.** 
          </p>
          <p>
            On a private boat, you're constantly asking each other to take photos, or struggling with selfies. On the Disco Cruise, you can actually **put your phone away and be present.** Our photographer captures high-resolution candid and posed shots of your entire group, which are sent to you in a digital gallery after the cruise.
          </p>
          <p className="font-bold italic text-blue-600">Cost comparison: Hiring a private boat photographer for 4 hours would typically cost an extra $300–$500. On the Disco Cruise, it's $0.</p>
        </SectionReveal>

        <SectionReveal id="when-private-wins">
          <h2 className="heading-unbounded text-2xl font-bold mb-6">When Does a Private Boat Make Sense?</h2>
          <p>
            Private charters aren't "bad"—they're just different. We recommend a private charter for:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-8">
            <li>**Very Large Groups:** If you have 25–75 people, you can book the *Clever Girl* as a private charter and essentially have your own private Disco Cruise.</li>
            <li>**Conservative Vibe:** If your group wants a quiet, low-key day of lounging without the "club energy" and loud DJ.</li>
            <li>**Total Control:** If you have a very specific playlist or itinerary you want to follow.</li>
          </ul>
          <BlogImageBreak 
            src={cleverGirl2} 
            alt="Clever Girl private boat" 
            caption="Large groups can book the Clever Girl for their own private event."
          />
        </SectionReveal>

      <InlineCTABar variant="navy" />

        <SectionReveal id="our-recommendation">
          <div className="bg-amber-50 dark:bg-slate-900/80 p-8 rounded-2xl border-2 border-amber-200 dark:border-amber-900/50 my-12 text-center">
            <h2 className="heading-unbounded text-2xl font-bold mb-4">The Captain's Recommendation</h2>
            <p className="text-xl mb-6 font-medium">"If you have 8–20 girls and want the most fun, best photos, and easiest planning—book the **ATX Disco Cruise**."</p>
            <div className="flex justify-center gap-4">
               <Link href="/atx-disco-cruise">
                 <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4">View Disco Cruise</Button>
               </Link>
               <Link href="/private-cruises">
                 <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">View Private Options</Button>
               </Link>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal id="faqs">
          <h2 className="heading-unbounded text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="faq-1">
              <AccordionTrigger>Does the private boat include a photographer?</AccordionTrigger>
              <AccordionContent>
                No. Standard private boat rentals in Austin are just the boat and captain. You'll need to handle your own photos or hire a separate photographer.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-2">
              <AccordionTrigger>What's better for a small group of 6?</AccordionTrigger>
              <AccordionContent>
                Definitely the ATX Disco Cruise. A private boat for 6 people is very expensive per person and often lacks the "party energy" that a larger shared cruise provides.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-3">
              <AccordionTrigger>Can we decorate the boat for the bachelorette?</AccordionTrigger>
              <AccordionContent>
                On a private charter, yes. On the ATX Disco Cruise, we've already done the decorating for you with 14 disco balls and party lighting! Groups are welcome to wear matching costumes and accessories.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-4">
              <AccordionTrigger>Are there other bachelorette groups on the Disco Cruise?</AccordionTrigger>
              <AccordionContent>
                Yes! It's very common to have 4-6 different bachelorette groups on one cruise. It's one big shared celebration.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-5">
              <AccordionTrigger>What does all-inclusive really mean?</AccordionTrigger>
              <AccordionContent>
                It means we handle the DJ, photographer, ice, cups, koozies, and floats. You only need to bring your drinks (BYOB) and snacks!
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </SectionReveal>
      </BlogPostLayout>
    </LazyMotionProvider>
  );
}

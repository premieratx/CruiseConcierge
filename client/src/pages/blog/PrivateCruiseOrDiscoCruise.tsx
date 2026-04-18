import { useEffect } from 'react';
import { m, LazyMotionProvider, fadeInUp } from '@/components/LazyMotion';
import { Link } from 'wouter';
import { 
  Ship, Users, PartyPopper, CheckCircle2, XCircle,
  Music, Waves, Beer, Star, ArrowRight, Camera, Shield, 
  Search, ClipboardCheck, Zap, Heart, Sparkles, MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import BlogV2Layout from '@/components/BlogV2Layout';
import { TOCSection } from '@/components/blog/BlogPostLayout';
import { BlogImageBreak } from '@/components/BlogImageBreak';
import { SectionReveal } from '@/components/SectionReveal';

import capitalShots3 from '@assets/@capitalcityshots-3_1760080740017.jpg';
import discoFun2 from '@assets/disco_fun2_1765193453547.jpg';
import cleverGirl2 from '@assets/clever-girl-2-party-boat-austin.jpg';
import bachelorHero from '@assets/bachelor-party-group-guys.webp';
import InlineCTABar from '@/components/InlineCTABar';
import InlineCTABar from '@/components/InlineCTABar';

const sections: TOCSection[] = [
  { id: 'the-key-question', title: 'The Key Question' },
  { id: 'choose-disco-if', title: 'Choose Disco Cruise If...' },
  { id: 'choose-private-if', title: 'Choose Private Charter If...' },
  { id: 'decision-checklist', title: 'Decision Checklist' },
  { id: 'faqs', title: 'Frequently Asked Questions' },
];

export default function PrivateCruiseOrDiscoCruise() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LazyMotionProvider>
      <BlogV2Layout
        title="Private Cruise or Disco Cruise: How Real Bach Groups Decide"
        description="Trying to decide between the ATX Disco Cruise and a private charter for your Austin bach party? Here's the decision framework real groups use — based on size, budget, vibe, and what matters most."
        publishDate="2025-05-15"
        author="Captain Brian"
        heroImage={capitalShots3}
        slug="private-cruise-or-disco-cruise-how-real-bach-groups-decide"
      >
        <div className="mb-8 flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm">
          <span className="text-blue-600 font-bold text-lg leading-none mt-0.5">→</span>
          <p className="text-slate-700 leading-relaxed m-0">
            <span className="font-semibold text-slate-900">Complete guide: </span>
            <Link href="/atx-disco-cruise" className="text-blue-600 hover:underline font-semibold">ATX Disco Cruise — Austin's all-inclusive disco boat cruise on Lake Travis</Link>
            {' '}— full pricing, schedule, and booking. This post is a focused deep-dive on one aspect of the experience.
          </p>
        </div>
        <SectionReveal id="the-key-question">
          <h2 className="heading-unbounded text-2xl font-bold mb-6">The Key Question: Shared Energy or Exclusive Privacy?</h2>
          <p>
            When planning a <Link href="/bachelorette-party-austin" className="text-blue-600 hover:underline">bachelorette party</Link> or <Link href="/bachelor-party-austin" className="text-blue-600 hover:underline">bachelor party in Austin</Link>, the boat day is almost always the highlight. But a common dilemma emerges: Do you book a <Link href="/private-cruises" className="text-blue-600 hover:underline">private boat rental</Link> or join the legendary <Link href="/atx-disco-cruise" className="text-blue-600 hover:underline">ATX Disco Cruise</Link>?
          </p>
          <p>
            The choice typically comes down to four factors: **Group Size, Budget, Vibe Preference, and Convenience.** After hosting over 150,000 guests on Lake Travis, we've seen exactly how real groups make this decision. Here is the framework to help your crew choose the perfect experience.
          </p>
        </SectionReveal>

        <SectionReveal id="choose-disco-if">
          <div className="bg-blue-50 dark:bg-slate-900/50 p-8 rounded-2xl border border-blue-100 dark:border-blue-900/50 my-12">
            <h2 className="heading-unbounded text-2xl font-bold mb-6 flex items-center gap-3">
              <Star className="text-amber-500 h-8 w-8" />
              Choose the ATX Disco Cruise If...
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="mt-1"><Users className="h-6 w-6 text-blue-600" /></div>
                <div>
                  <h3 className="font-bold text-xl mb-2">You have 8–20 people</h3>
                  <p>The ATX Disco Cruise is the most cost-effective and high-energy option for small to medium-sized groups. You get the big-boat feel without the big-boat price tag.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1"><Music className="h-6 w-6 text-blue-600" /></div>
                <div>
                  <h3 className="font-bold text-xl mb-2">You want a built-in DJ & Photographer</h3>
                  <p>You don't want to worry about a playlist or asking strangers to take photos. The Disco Cruise includes a professional DJ and photographer at no extra charge.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1"><Zap className="h-6 w-6 text-blue-600" /></div>
                <div>
                  <h3 className="font-bold text-xl mb-2">You love a high-energy "Mixer" vibe</h3>
                  <p>You're open to meeting other bachelor and bachelorette groups. The "Supergroup" phenomenon is real—groups often meet on the boat and head to 6th Street together later.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1"><ClipboardCheck className="h-6 w-6 text-blue-600" /></div>
                <div>
                  <h3 className="font-bold text-xl mb-2">You want "Done-for-You" planning</h3>
                  <p>Ice, cups, koozies, floats, and entertainment are all provided. You just bring the drinks (BYOB) and show up.</p>
                </div>
              </div>
            </div>
            
            <BlogImageBreak 
              src={discoFun2} 
              alt="High energy dance floor on the ATX Disco Cruise" 
              caption="The ATX Disco Cruise is all about energy, music, and meeting other party groups."
            />
          </div>
        </SectionReveal>

      <InlineCTABar variant="navy" />

        <SectionReveal id="choose-private-if">
          <h2 className="heading-unbounded text-2xl font-bold mb-6">Choose a Private Charter If...</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="border-slate-200 dark:border-slate-800">
              <CardContent className="pt-6">
                <div className="mb-4"><Ship className="h-10 w-10 text-slate-700 dark:text-slate-300" /></div>
                <h3 className="font-bold text-xl mb-2">25+ Guests</h3>
                <p className="text-slate-600 dark:text-slate-400">Once your group hits 25-30+ people, booking the whole boat often becomes more cost-effective and manageable for keeping everyone together.</p>
              </CardContent>
            </Card>
            <Card className="border-slate-200 dark:border-slate-800">
              <CardContent className="pt-6">
                <div className="mb-4"><Shield className="h-10 w-10 text-slate-700 dark:text-slate-300" /></div>
                <h3 className="font-bold text-xl mb-2">Exclusivity is Key</h3>
                <p className="text-slate-600 dark:text-slate-400">If the bride or groom specifically requested an intimate day with just their closest friends, a private charter is the only way to ensure 100% privacy.</p>
              </CardContent>
            </Card>
            <Card className="border-slate-200 dark:border-slate-800">
              <CardContent className="pt-6">
                <div className="mb-4"><Search className="h-10 w-10 text-slate-700 dark:text-slate-300" /></div>
                <h3 className="font-bold text-xl mb-2">Total Control</h3>
                <p className="text-slate-600 dark:text-slate-400">You want to play your own specific music via Bluetooth and control exactly where the boat goes and when it stops to swim.</p>
              </CardContent>
            </Card>
            <Card className="border-slate-200 dark:border-slate-800">
              <CardContent className="pt-6">
                <div className="mb-4"><MessageSquare className="h-10 w-10 text-slate-700 dark:text-slate-300" /></div>
                <h3 className="font-bold text-xl mb-2">Custom Itinerary</h3>
                <p className="text-slate-600 dark:text-slate-400">You have specific timing needs outside of the standard Disco Cruise slots (e.g., a 2pm to 6pm window).</p>
              </CardContent>
            </Card>
          </div>

          <BlogImageBreak 
            src={cleverGirl2} 
            alt="Clever Girl private boat rental on Lake Travis" 
            caption="Private charters like the Clever Girl offer total exclusivity for your group."
          />
        </SectionReveal>

        <SectionReveal id="decision-checklist">
          <h2 className="heading-unbounded text-2xl font-bold mb-6">The Decision Checklist</h2>
          <div className="space-y-4 mb-12">
            {[
              "Is our group size between 6 and 20? (Check: Disco Cruise)",
              "Do we want a professional DJ included? (Check: Disco Cruise)",
              "Do we want professional photos of the whole group? (Check: Disco Cruise)",
              "Is our total budget under $1,500? (Check: Disco Cruise)",
              "Do we have 30+ people? (Check: Private Charter)",
              "Do we want to play our own music exclusively? (Check: Private Charter)",
              "Is a private, intimate environment non-negotiable? (Check: Private Charter)"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800">
                <CheckCircle2 className="h-6 w-6 text-green-600 mt-0.5" />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>

          <div className="my-12">
            <h3 className="text-2xl font-bold mb-6 text-center italic">"Most groups of 8–15 realize that on a private boat, they're just a few friends on the water. On the Disco Cruise, they're at the center of the best party in Austin."</h3>
            <BlogImageBreak 
              src={bachelorHero} 
              alt="Bachelor party group on a boat" 
              caption="Bachelor groups especially love the co-ed energy of the Disco Cruise."
            />
          </div>
        </SectionReveal>

      <InlineCTABar variant="amber" />

        <SectionReveal id="faqs">
          <h2 className="heading-unbounded text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="faq-1">
              <AccordionTrigger>Can we upgrade from Disco Cruise to private charter?</AccordionTrigger>
              <AccordionContent>
                Yes! If you book the Disco Cruise and your group grows significantly (e.g., from 15 to 30 people), we can often switch you to a private charter on the Meeseeks or Clever Girl, depending on availability.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-2">
              <AccordionTrigger>What's the minimum group for a private charter?</AccordionTrigger>
              <AccordionContent>
                There is no minimum group size, but there is a 4-hour minimum rental. For groups under 10, the per-person cost of a private charter is significantly higher than the Disco Cruise.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-3">
              <AccordionTrigger>Is the DJ better on a private charter?</AccordionTrigger>
              <AccordionContent>
                Private charters actually do NOT include a live DJ—they have a high-quality Bluetooth sound system for you to play your own music. The ATX Disco Cruise is the only option that includes a live professional DJ.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-4">
              <AccordionTrigger>Can we customize the Disco Cruise?</AccordionTrigger>
              <AccordionContent>
                The Disco Cruise follows a proven high-energy format (specific route, DJ set, and swim stop). While you can't change the itinerary, you can fully customize your group's "vibe" with costumes, themes, and your own BYOB drinks.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-5">
              <AccordionTrigger>Which option gets better photos?</AccordionTrigger>
              <AccordionContent>
                The ATX Disco Cruise includes a professional photographer who knows exactly how to capture the best angles on Lake Travis. On a private charter, you are responsible for your own photos.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </SectionReveal>

        <div className="mt-16 text-center">
          <Link href="/atx-disco-cruise">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-6 text-xl rounded-full shadow-xl">
              Book Your Disco Cruise Now
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
          </Link>
        </div>
      </BlogV2Layout>
    </LazyMotionProvider>
  );
}

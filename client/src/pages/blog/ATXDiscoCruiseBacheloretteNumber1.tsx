import { useEffect } from 'react';
import { m, LazyMotionProvider, fadeInUp } from '@/components/LazyMotion';
import { Link } from 'wouter';
import { 
  Ship, Users, PartyPopper, CheckCircle2,
  Music, Waves, Star, ArrowRight, Camera, Shield, 
  Heart, Sparkles, Instagram, MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BlogPostLayout, TOCSection } from '@/components/blog/BlogPostLayout';
import { BlogImageBreak, BlogPhotoStrip } from '@/components/BlogImageBreak';
import { SectionReveal } from '@/components/SectionReveal';

import cleverGirl3 from '@assets/clever-girl-3-bachelorette-boat.jpg';
import capitalShots2 from '@assets/@capitalcityshots-2_1760080740017.jpg';
import discoFun5 from '@assets/disco_fun5_1765193453548.jpg';
import dancingScene from '@assets/dancing-party-scene.webp';
import InlineCTABar from '@/components/InlineCTABar';

const sections: TOCSection[] = [
  { id: 'why-number-one', title: 'Why It\'s #1' },
  { id: 'what-bachelorette-groups-love', title: 'What Bachelorette Groups Love' },
  { id: 'the-photographer-factor', title: 'The Photographer Factor' },
  { id: 'austin-as-bachelorette-destination', title: 'Austin: The Bachelorette City' },
  { id: 'how-to-book', title: 'How to Book' },
  { id: 'faqs', title: 'Frequently Asked Questions' },
];

export default function ATXDiscoCruiseBacheloretteNumber1() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LazyMotionProvider>
      <BlogPostLayout
        title="Why the ATX Disco Cruise Has Been Austin's #1 Bachelorette Party Activity Since 2019"
        metaDescription="Why is the ATX Disco Cruise Austin's #1 bachelorette party activity since 2019? DJ, pro photographer, Lake Travis views, and all-inclusive from $85/person. The only multi-group bachelorette cruise in the U.S."
        publishDate="2025-05-20"
        author="Captain Brian"
        heroImage={cleverGirl3}
        heroImageAlt="Bachelorette party group celebrating on the Clever Girl boat"
        keywords={['Austin bachelorette party activity', 'best bachelorette party activity Austin 2026', 'ATX Disco Cruise bachelorette', 'Austin bachelorette boat party', 'bachelorette party Lake Travis', 'Austin bachelorette party ideas']}
        pageRoute="/blogs/why-the-atx-disco-cruise-has-been-austins-1-bachelorette-party-activity-since-2019"
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
        <SectionReveal id="why-number-one">
          <Badge className="bg-amber-500 text-slate-900 mb-4 font-bold">AUSTIN'S TOP RATED ACTIVITY</Badge>
          <h2 className="heading-unbounded text-2xl font-bold mb-6">The Undisputed Champ of Austin Bachelorette Parties</h2>
          <p>
            Since 2019, one activity has consistently topped the "must-do" list for every <Link href="/bachelorette-party-austin" className="text-blue-600 hover:underline">bachelorette party in Austin</Link>: the <strong>ATX Disco Cruise</strong>. 
          </p>
          <p>
            It's not just another boat rental. It is the <strong>only multi-group, all-inclusive bachelorette cruise in the U.S.</strong> While other companies offer plain pontoon rentals, we built a floating nightclub experience specifically for the 150,000+ guests who have celebrated with us on Lake Travis.
          </p>
          <p>
            What makes it the #1 choice year after year? It's the perfect combination of professional entertainment, effortless planning, and that unique Austin energy. It's also a favorite for <Link href="/bachelor-party-austin" className="text-blue-600 hover:underline">Austin bachelor parties</Link> — groups regularly book the same cruise for a combined celebration. For the full planning picture, the <Link href="/bachelorette-party-austin" className="text-blue-600 hover:underline">Austin Bachelorette Party page</Link> is your complete hub.
          </p>
          
          <BlogImageBreak 
            src={capitalShots2} 
            alt="Bachelorette group cheering on Lake Travis" 
            caption="The energy on the ATX Disco Cruise is unmatched anywhere else in Austin."
          />
        </SectionReveal>

        <SectionReveal id="what-bachelorette-groups-love">
          <h2 className="heading-unbounded text-2xl font-bold mb-6">What Bachelorette Groups Actually Love</h2>
          <div className="grid md:grid-cols-3 gap-6 my-10">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-blue-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-blue-600">
                <Music className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg">The Professional DJ</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">No awkward silence or fighting over the aux cord. Our DJ plays a mix of 70s disco, 90s bops, and today's hits to keep the dance floor packed.</p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-blue-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-blue-600">
                <Waves className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg">Giant Lily Pad Floats</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Our 6x20ft floating lounges are the perfect spot for the group to chill, swim, and snap photos in the crystal clear water of Lake Travis.</p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-blue-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-blue-600">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg">Zero Planning Stress</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">We provide the ice, cups, koozies, bubbles, and 14 disco balls. You just bring your favorite drinks and your best crew.</p>
            </div>
          </div>
        </SectionReveal>

      <InlineCTABar variant="amber" />

        <SectionReveal id="the-photographer-factor">
          <div className="bg-slate-900 text-white p-8 rounded-2xl my-12 relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="heading-unbounded text-2xl font-bold mb-6 flex items-center gap-3">
                <Instagram className="text-amber-500 h-8 w-8" />
                The Photographer Factor
              </h2>
              <p className="text-slate-300 mb-6">
                Let's be honest: If it's not on Instagram, did the bachelorette party even happen? Bachelorette groups value photos more than almost anything else, which is why <strong>every ATX Disco Cruise includes a professional photographer.</strong>
              </p>
              <p className="text-slate-300 mb-6">
                Our photographers know the "Golden Hour" on Lake Travis, the best angles for group shots, and how to capture those candid dance floor moments. You'll receive a link to your high-resolution photos within days—no extra charge.
              </p>
              <BlogPhotoStrip 
                photos={[
                  { src: discoFun5, alt: 'Group photo on boat' },
                  { src: dancingScene, alt: 'Dancing on the boat' }
                ]}
              />
            </div>
          </div>
        </SectionReveal>

        <SectionReveal id="austin-as-bachelorette-destination">
          <h2 className="heading-unbounded text-2xl font-bold mb-6">Why Austin is the Ultimate Bachelorette City</h2>
          <p>
            Austin has surpassed Vegas and Nashville as the top choice for bachelorette parties, and Lake Travis is the reason why. The combination of incredible food on 6th Street and the refreshing water of the lake makes for the perfect weekend balance.
          </p>
          <div className="flex flex-col md:flex-row gap-8 items-center my-10">
            <div className="md:w-1/2">
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <CheckCircle2 className="h-6 w-6 text-blue-600 flex-shrink-0" />
                  <span><strong>Co-ed Mixing:</strong> Join forces with bachelor parties for a "Supergroup" experience.</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="h-6 w-6 text-blue-600 flex-shrink-0" />
                  <span><strong>BYOB Convenience:</strong> Order via <a href="https://partyondelivery.com" className="text-blue-600 hover:underline">Party On Delivery</a> for drinks delivered to the dock.</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="h-6 w-6 text-blue-600 flex-shrink-0" />
                  <span><strong>Flagship Boats:</strong> Ride on the Clever Girl, featuring 14 disco balls and 75-person capacity.</span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2">
               <Card className="bg-blue-50 border-none">
                 <CardContent className="p-6">
                   <h3 className="font-bold mb-2 flex items-center gap-2">
                     <MapPin className="h-5 w-5 text-blue-600" />
                     Pro Tip: The Marina
                   </h3>
                   <p className="text-sm">We depart from Anderson Mill Marina. It's about a 30-35 minute Uber from downtown Austin. Plan ahead and book your ride 45 minutes before departure!</p>
                 </CardContent>
               </Card>
            </div>
          </div>
        </SectionReveal>

      <InlineCTABar variant="navy" />

        <SectionReveal id="how-to-book">
          <h2 className="heading-unbounded text-2xl font-bold mb-6 text-center">How to Secure Your Date</h2>
          <p className="text-center mb-8">The ATX Disco Cruise sells out nearly every weekend from March through October. Here's the winning strategy:</p>
          <div className="grid md:grid-cols-3 gap-4 mb-12">
            <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">1</div>
              <p className="text-sm font-bold">Pick Your Time</p>
              <p className="text-xs text-slate-500 mt-1">Saturday morning is our most popular slot!</p>
            </div>
            <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">2</div>
              <p className="text-sm font-bold">Confirm Your Count</p>
              <p className="text-xs text-slate-500 mt-1">We can handle groups of 2 to 75.</p>
            </div>
            <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">3</div>
              <p className="text-sm font-bold">Book Online</p>
              <p className="text-xs text-slate-500 mt-1">Simple per-person pricing, no hidden fees.</p>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal id="faqs">
          <h2 className="heading-unbounded text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="faq-1">
              <AccordionTrigger>Is the ATX Disco Cruise only for bachelor and bachelorette parties?</AccordionTrigger>
              <AccordionContent>
                Yes — the ATX Disco Cruise is exclusively for bachelor parties, bachelorette parties, and combined bachelor/bachelorette groups. It is the world's only party cruise designed exclusively for bach celebrations, and that exclusivity is what makes the atmosphere so electric. Every group on board is celebrating the same milestone, which creates an energy no other venue can replicate.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-2">
              <AccordionTrigger>How many bachelorette groups are usually on each cruise?</AccordionTrigger>
              <AccordionContent>
                On a typical Saturday, you'll see anywhere from 3 to 8 different groups on the boat together. It creates a massive, shared celebration vibe.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-3">
              <AccordionTrigger>Is it appropriate for more conservative groups?</AccordionTrigger>
              <AccordionContent>
                While the vibe is high-energy and fun, our professional crew and Captain Brian ensure a respectful environment for everyone. Our motto is "Don't be a dick and don't die."
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-4">
              <AccordionTrigger>What makes Austin the best bachelorette party city?</AccordionTrigger>
              <AccordionContent>
                It's the variety! You can have a "Boots & Bubbles" brunch downtown, a 4-hour disco party on the lake, and world-class live music at night.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-5">
              <AccordionTrigger>Do I need to book a whole boat?</AccordionTrigger>
              <AccordionContent>
                Nope! That's the beauty of the ATX Disco Cruise—you just buy tickets for your specific number of guests. No need to worry about filling a 75-person boat yourself.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </SectionReveal>

        <div className="mt-16 flex flex-col items-center gap-6">
          <Link href="/atx-disco-cruise">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-12 py-8 text-2xl rounded-full shadow-2xl">
              Book the #1 Activity
              <ArrowRight className="ml-2 h-7 w-7" />
            </Button>
          </Link>
          <p className="text-slate-500 font-medium">Tickets include DJ, Photographer, and Lake Travis Views!</p>
        </div>
      </BlogPostLayout>
    </LazyMotionProvider>
  );
}

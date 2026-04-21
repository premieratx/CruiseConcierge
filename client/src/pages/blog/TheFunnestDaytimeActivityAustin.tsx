import { useEffect } from 'react';
import { m, LazyMotionProvider, fadeInUp } from '@/components/LazyMotion';
import { Link } from 'wouter';
import BlogV2Layout from '@/components/BlogV2Layout';
import { TOCSection } from '@/components/blog/BlogPostLayout';
import { BlogImageBreak, BlogPhotoStrip } from '@/components/BlogImageBreak';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Star, 
  Users, 
  Waves, 
  Music, 
  Camera, 
  PartyPopper, 
  Heart, 
  Navigation,
  CheckCircle2
} from 'lucide-react';

// Photo Imports
import discoFun from '@assets/disco_fun_best2_1765193453547.jpg';
import capitalShots1 from '@assets/@capitalcityshots-1_1760080740012.jpg';
import capitalShots2 from '@assets/@capitalcityshots-2_1760080740017.jpg';
import discoParty from '@assets/atx-disco-cruise-party.webp';

const sections: TOCSection[] = [
  { id: 'what-makes-it-fun', title: 'What Makes It So Fun?' },
  { id: 'social-proof', title: 'The Social Proof: 30,000+ Happy Guests' },
  { id: 'vs-bars-clubs', title: 'Why Choose This Over Bars and Clubs?' },
  { id: 'how-it-works', title: 'How the ATX Disco Cruise Works' },
  { id: 'faqs', title: 'Frequently Asked Questions' },
];

export default function TheFunnestDaytimeActivityAustin() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LazyMotionProvider>
      <BlogV2Layout
        slug="the-funnest-daytime-activity-in-austin-according-to-30000-guests"
        title="The Funnest Daytime Activity in Austin, According to 30,000 Guests"
        description="What's the most fun daytime activity in Austin? Over 30,000 guests say it's the ATX Disco Cruise on Lake Travis — DJ, photographer, giant floats, BYOB from $85/person. Austin's must-do bach party experience."
        publishDate="2025-05-15"
        author="Captain Brian"
        heroImage={discoFun}
      >
        <div className="mb-8 flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm">
          <span className="text-blue-600 font-bold text-lg leading-none mt-0.5">→</span>
          <p className="text-slate-700 leading-relaxed m-0">
            <span className="font-semibold text-slate-900">Complete guide: </span>
            <Link href="/atx-disco-cruise" className="text-blue-600 hover:underline font-semibold">ATX Disco Cruise — Austin's all-inclusive disco boat cruise on Lake Travis</Link>
            {' '}— full pricing, schedule, and booking. This post is a focused deep-dive on one aspect of the experience.
          </p>
        </div>
        <section id="what-makes-it-fun" className="scroll-mt-24 mb-16">
          <Badge className="mb-4 bg-amber-500 text-slate-900 font-bold">#1 DAYTIME ACTIVITY</Badge>
          <h2 className="heading-unbounded text-2xl sm:text-3xl font-bold mb-6 text-slate-900 dark:text-white">
            What Makes the ATX Disco Cruise the Funnest Thing to Do in Austin?
          </h2>
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
            When you're planning an <strong>Austin bachelor party</strong> or bachelorette weekend, the pressure is on to find activities that everyone will actually enjoy. You've done the bars on 6th Street and the dinners on Rainey, but what about the daytime? 
          </p>
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
            Over 30,000 guests have consistently rated the <strong>ATX Disco Cruise</strong> on <Link href="/party-boat-lake-travis" className="text-blue-600 hover:underline font-semibold">Lake Travis</Link> as the highlight of their trip. It's not just a boat rental; it's a high-energy, all-inclusive floating party that solves the "what do we do today?" dilemma perfectly.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
            <Card className="border-none bg-slate-50 dark:bg-slate-900 shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <Music className="h-6 w-6 text-blue-600" />
                  <h3 className="font-bold text-xl text-slate-900 dark:text-white">Professional DJ Energy</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400">
                  While other <Link href="/party-boat-austin" className="text-blue-600 hover:underline font-semibold">party boats in Austin</Link> leave you fumbling with a Bluetooth speaker, we have a pro DJ spinning 4 hours of non-stop hits, from 70s disco to today's bangers.
                </p>
              </CardContent>
            </Card>
            <Card className="border-none bg-slate-50 dark:bg-slate-900 shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <Waves className="h-6 w-6 text-blue-600" />
                  <h3 className="font-bold text-xl text-slate-900 dark:text-white">Giant Lily Pad Floats</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400">
                  Every cruise includes 6x20 ft floating lounges. Swimming in the clear waters of Lake Travis is the ultimate way to cool off under the Texas sun.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <BlogPhotoStrip 
          photos={[
            { src: capitalShots1, alt: 'Guests dancing on ATX Disco Cruise', caption: 'Non-stop energy on the water' },
            { src: capitalShots2, alt: 'Group photo on Lake Travis party boat', caption: 'Memories captured by our pro photographer' }
          ]}
        />

        <section id="social-proof" className="scroll-mt-24 mb-16">
          <h2 className="heading-unbounded text-2xl sm:text-3xl font-bold mb-6 text-slate-900 dark:text-white">
            The Social Proof: 30,000+ Happy Guests
          </h2>
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
            We don't just say we're the best; our guests do. Since 2019, the ATX Disco Cruise has been the go-to activity for <Link href="/bachelorette-party-austin" className="text-blue-600 hover:underline font-semibold">Austin bachelorette parties</Link> and <Link href="/bachelor-party-austin" className="text-blue-600 hover:underline font-semibold">bachelor parties</Link>. 
          </p>
          <div className="bg-blue-50 dark:bg-slate-800 p-8 rounded-2xl border-l-4 border-blue-600 mb-8">
            <div className="flex mb-4">
              {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="h-5 w-5 text-amber-500 fill-amber-500" />)}
            </div>
            <p className="text-xl italic text-slate-800 dark:text-slate-200 mb-4">
              "We've been to Austin five times for different parties, and this was hands down the funnest thing we've ever done. The DJ was incredible, and meeting three other bachelorette groups made it feel like a massive festival on the water!"
            </p>
            <p className="font-bold text-slate-900 dark:text-white">— Sarah M., Maid of Honor</p>
          </div>
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-6">
            The secret sauce? It's the <strong>multi-group atmosphere</strong>. Unlike a private rental where it's just your crew, the Disco Cruise is a mixer. You'll dance alongside 4-6 other groups, forming a "supergroup" of party-goers that often continues the celebration together on 6th Street later that night.
          </p>
        </section>

        <section id="vs-bars-clubs" className="scroll-mt-24 mb-16">
          <h2 className="heading-unbounded text-2xl sm:text-3xl font-bold mb-6 text-slate-900 dark:text-white">
            Why Austin Bach Parties Choose This Over Bars and Clubs
          </h2>
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
            Austin nightlife is legendary, but doing it for three days straight can be exhausting. Here's why the <strong>Lake Travis bachelor party</strong> experience on our boat beats a crowded bar every time:
          </p>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
              <span className="text-slate-700 dark:text-slate-300"><strong>No Lines, No Cover:</strong> Your ticket is your all-access pass to the funnest dance floor in Texas.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
              <span className="text-slate-700 dark:text-slate-300"><strong>BYOB Value:</strong> Save hundreds on "club-priced" drinks. Bring your own cans/plastic and we'll provide the coolers and ice.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
              <span className="text-slate-700 dark:text-slate-300"><strong>Instagram Ready:</strong> Our pro photographer captures the shots you'd never get in a dark bar.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
              <span className="text-slate-700 dark:text-slate-300"><strong>Lake Views:</strong> Nothing beats the scenery of Lake Travis, especially from our flagship 75-person boat, the <em>Clever Girl</em>.</span>
            </li>
          </ul>
          <BlogImageBreak 
            src={discoParty} 
            alt="Bachelor and bachelorette groups celebrating together on Lake Travis" 
            caption="The unique co-ed mixing atmosphere of the ATX Disco Cruise"
          />
        </section>

        <section id="how-it-works" className="scroll-mt-24 mb-16">
          <h2 className="heading-unbounded text-2xl sm:text-3xl font-bold mb-6 text-slate-900 dark:text-white">
            How the ATX Disco Cruise Works
          </h2>
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-6">
            Ready to book the <strong>funnest thing to do in Austin</strong>? Here's the logistics:
          </p>
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 font-bold">1</div>
              <div>
                <h3 className="font-bold text-xl mb-2 text-slate-900 dark:text-white">Choose Your Slot</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Fridays (12-4pm) for $95/person, or Saturdays (11am-3pm for $105 or 3:30-7:30pm for $85). All prices include tax and gratuity.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 font-bold">2</div>
              <div>
                <h3 className="font-bold text-xl mb-2 text-slate-900 dark:text-white">Coordinate Your BYOB</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Bring cans and plastic (no glass!). For the ultimate experience, use <a href="https://partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Party On Delivery</a> to have your drinks waiting at the marina.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 font-bold">3</div>
              <div>
                <h3 className="font-bold text-xl mb-2 text-slate-900 dark:text-white">Arrive and Party</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Meet at Anderson Mill Marina. From there, our licensed crew takes care of everything while you enjoy 4 hours of pure entertainment.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="faqs" className="scroll-mt-24 mb-16">
          <h2 className="heading-unbounded text-2xl sm:text-3xl font-bold mb-8 text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it appropriate for groups who aren't heavy partiers?</AccordionTrigger>
              <AccordionContent>
                Absolutely! While the energy is high and there's a DJ, many groups come just for the lake views, the swimming, and the social atmosphere. You can be as wild or as chill as you want on our large, stable boats.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Can you actually swim during the cruise?</AccordionTrigger>
              <AccordionContent>
                Yes! Every cruise includes a stop in a scenic cove where we deploy our 6x20 ft giant lily pad floats. It's one of the highlights of the experience.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>What's the atmosphere like?</AccordionTrigger>
              <AccordionContent>
                Imagine a floating nightclub meets a backyard BBQ. It's high-energy, friendly, and very social. The 14 disco balls and pro lighting on the <em>Clever Girl</em> create a vibe you won't find anywhere else in Austin.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>How does meeting other groups work?</AccordionTrigger>
              <AccordionContent>
                The boat is shared between multiple bachelor and bachelorette groups (typically 4-6 groups per cruise). The shared dance floor and swimming cove naturally lead to groups mingling. It's the only multi-group co-ed bach cruise in the U.S.!
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>How does it compare to Austin nightlife?</AccordionTrigger>
              <AccordionContent>
                It's a perfect complement. While nightlife is great, the Disco Cruise offers a daytime alternative where you can enjoy the sun, the lake, and social mixing without the crowds and high prices of 6th Street. Plus, our pro photographer ensures you have the memories to prove it.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <div className="mt-12 p-8 bg-blue-600 rounded-2xl text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Don't Miss Austin's #1 Activity</h2>
          <p className="text-xl mb-8">Slots for the ATX Disco Cruise fill up months in advance. Secure your spot today!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/atx-disco-cruise">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-slate-100 transition-colors">
                Book Now
              </button>
            </Link>
            <Link href="/contact">
              <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-white/10 transition-colors">
                Get a Quote
              </button>
            </Link>
          </div>
        </div>
      </BlogV2Layout>
    </LazyMotionProvider>
  );
}

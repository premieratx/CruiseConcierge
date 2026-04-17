import { m, fadeInUp } from '@/components/LazyMotion';
import { Link } from 'wouter';
import { 
  Users, Music, Camera, Heart, PartyPopper, 
  MessageCircle, Star, Shield, ArrowRight, CheckCircle2 
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
import { type TOCSection } from '@/components/blog/BlogPostLayout';
import BlogV2Layout from '@/components/BlogV2Layout';
import SEOHead from '@/components/SEOHead';
import { BlogImageBreak } from '@/components/BlogImageBreak';

import dancingScene from '@assets/dancing-party-scene.webp';
import capitalShots1 from '@assets/@capitalcityshots-1_1760080740012.jpg';
import discoFun from '@assets/disco_fun_best2_1765193453547.jpg';
import capitalShots3 from '@assets/@capitalcityshots-3_1760080740017.jpg';
import InlineCTABar from '@/components/InlineCTABar';

const sections: TOCSection[] = [
  { id: 'why-co-ed-works', title: 'Why Co-Ed Party Boat Mixers Work' },
  { id: 'how-it-works', title: 'How the Combined Experience Works' },
  { id: 'unique-advantages', title: 'Unique Advantages for Combined Groups' },
  { id: 'tips-for-combined-groups', title: 'Tips for Combined Bachelor & Bachelorette Groups' },
  { id: 'faqs', title: 'Frequently Asked Questions' },
];

export default function WhyCombinedBachLoveDiscoCruise() {
  return (
    <BlogV2Layout
      title="Why Combined Bachelor & Bachelorette Parties Love the ATX Disco Cruise"
      description="Planning a combined bachelor bachelorette party in Austin? The ATX Disco Cruise is the ONLY multi-group all-inclusive co-ed bach cruise in the U.S. From $85/person with DJ and photographer on Lake Travis."
      slug="why-combined-bachelor-bachelorette-parties-love-the-atx-disco-cruise"
      category="Combined Bach Guides"
      categoryHref="/combined-bachelor-bachelorette-austin"
      pillarTitle="Combined Bachelor/Bachelorette Party Guide"
      pillarHref="/combined-bachelor-bachelorette-austin"
      relatedArticles={[
        { title: "Epic Austin Bachelorette Party Guide", href: "/blogs/epic-austin-bachelorette-party-guide" },
        { title: "Epic Austin Bachelor Party Guide", href: "/blogs/epic-bachelor-party-austin-guide" },
        { title: "ATX Disco Cruise Experience", href: "/atx-disco-cruise" },
      ]}
    >
      <SEOHead
        pageRoute="/blogs/why-combined-bachelor-bachelorette-parties-love-the-atx-disco-cruise"
        defaultTitle="Why Combined Bachelor & Bachelorette Parties Love the ATX Disco Cruise"
        defaultDescription="Planning a combined bachelor bachelorette party in Austin? The ATX Disco Cruise is the ONLY multi-group all-inclusive co-ed bach cruise in the U.S. From $85/person with DJ and photographer on Lake Travis."
        defaultKeywords={['combined bachelor bachelorette party Austin', 'joint bach party Lake Travis', 'co-ed bach party Austin', 'combined bachelor bachelorette cruise', 'Austin co-ed party boat']}
        image="https://premierpartycruises.com/attached_assets/dancing-party-scene.webp"
      />
      <div className="mb-8 flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm">
        <span className="text-blue-600 font-bold text-lg leading-none mt-0.5">→</span>
        <p className="text-slate-700 leading-relaxed m-0">
          <span className="font-semibold text-slate-900">Complete guide: </span>
          <Link href="/atx-disco-cruise" className="text-blue-600 hover:underline font-semibold">ATX Disco Cruise — Austin's all-inclusive disco boat cruise on Lake Travis</Link>
          {' '}— full pricing, schedule, and booking. This post is a focused deep-dive on one aspect of the experience.
        </p>
      </div>
      <section id="why-co-ed-works" className="mb-12">
        <p className="text-lg leading-relaxed mb-6">
          The traditional bachelor or bachelorette party often involves a "separation of church and state"—the guys go one way, the girls go another. But in Austin, a new trend has taken over: <strong>the combined bachelor-bachelorette party</strong> (or "Joint Bach"). 
        </p>
        <p className="text-lg leading-relaxed mb-6">
          Whether you're a couple with overlapping friend groups or two separate crews looking to double the fun, the <Link href="/atx-disco-cruise" className="text-blue-600 hover:underline font-semibold">ATX Disco Cruise</Link> is uniquely designed for this. It is the <strong>ONLY multi-group, all-inclusive co-ed bachelor/bachelorette cruise in the United States</strong>.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
          <Card className="border-blue-100 bg-blue-50/50">
            <CardContent className="pt-6">
              <div className="rounded-full bg-blue-500 w-12 h-12 flex items-center justify-center mb-4">
                <Users className="text-white h-6 w-6" />
              </div>
              <h3 className="font-bold text-xl mb-2 text-slate-900">Instant Mixer</h3>
              <p className="text-slate-700">The boat is naturally a social environment where groups blend effortlessly.</p>
            </CardContent>
          </Card>
          <Card className="border-amber-100 bg-amber-50/50">
            <CardContent className="pt-6">
              <div className="rounded-full bg-amber-500 w-12 h-12 flex items-center justify-center mb-4">
                <Music className="text-white h-6 w-6" />
              </div>
              <h3 className="font-bold text-xl mb-2 text-slate-900">Universal Vibe</h3>
              <p className="text-slate-700">70s Disco hits to modern bangers ensure every guest is on the dance floor.</p>
            </CardContent>
          </Card>
          <Card className="border-blue-100 bg-blue-50/50">
            <CardContent className="pt-6">
              <div className="rounded-full bg-blue-500 w-12 h-12 flex items-center justify-center mb-4">
                <Camera className="text-white h-6 w-6" />
              </div>
              <h3 className="font-bold text-xl mb-2 text-slate-900">Pro Photos</h3>
              <p className="text-slate-700">Candid and group shots of both parties together, included at no extra cost.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <BlogImageBreak 
        src={capitalShots1} 
        alt="Bachelor and bachelorette groups mixing on Lake Travis" 
        caption="The magic happens when separate groups become one big party on the water."
      />

      <section id="how-it-works" className="mb-12">
        <h2 className="heading-unbounded text-2xl font-bold mb-6 text-slate-900">How the Combined Experience Works</h2>
        <p className="text-lg leading-relaxed mb-6">
          The beauty of the Disco Cruise for combined groups is the flexibility. You don't have to organize a massive private charter for 40 people (though we can do that too via <Link href="/private-cruises" className="text-blue-600 hover:underline font-semibold">private cruises</Link>).
        </p>
        <ul className="space-y-4 mb-8">
          <li className="flex gap-3">
            <CheckCircle2 className="h-6 w-6 text-blue-600 shrink-0" />
            <span className="text-lg"><strong>Book Separately:</strong> The guys can book their tickets, and the girls can book theirs. This keeps budgets separate while ensuring you're on the same boat.</span>
          </li>
          <li className="flex gap-3">
            <CheckCircle2 className="h-6 w-6 text-blue-600 shrink-0" />
            <span className="text-lg"><strong>The 4-Hour Voyage:</strong> You'll share the same dance floor, same DJ, and same Lake Travis swimming cove.</span>
          </li>
          <li className="flex gap-3">
            <CheckCircle2 className="h-6 w-6 text-blue-600 shrink-0" />
            <span className="text-lg"><strong>BYOB Simplified:</strong> Coordinate with <a href="https://partyondelivery.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold font-bold">Party On Delivery</a> to have all drinks delivered to the marina in one go.</span>
          </li>
        </ul>
      </section>

      <InlineCTABar variant="amber" />

      <section id="unique-advantages" className="mb-12">
        <h2 className="heading-unbounded text-2xl font-bold mb-6 text-slate-900">Unique Advantages for Combined Groups</h2>
        <p className="text-lg leading-relaxed mb-6">
          Why choose a co-ed mixer over a segregated event? Most Austin visitors tell us it's the <strong>energy</strong>. A boat full of bachelor and bachelorette parties creates a celebratory atmosphere that a single-group boat simply can't match.
        </p>
        
        <div className="bg-slate-900 text-white p-8 rounded-2xl mb-10 shadow-xl">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Star className="text-amber-400" />
            The "Supergroup" Phenomenon
          </h3>
          <p className="text-lg text-slate-300 leading-relaxed mb-4">
            It happens every weekend. A <Link href="/bachelorette-party-austin" className="text-blue-300 hover:underline font-semibold">bachelorette party</Link> from NYC meets a <Link href="/bachelor-party-austin" className="text-blue-300 hover:underline font-semibold">bachelor party</Link> from Chicago. By the time we hit the swimming cove, they've exchanged numbers and formed a "Supergroup" that hits 6th Street together that night.
          </p>
          <p className="text-lg text-slate-300 leading-relaxed">
            For <Link href="/combined-bachelor-bachelorette-austin" className="text-blue-300 hover:underline font-semibold">combined groups</Link>, this means you get to mingle with other groups while still having your partner and core friends right there. It's the best of both worlds.
          </p>
        </div>
      </section>

      <BlogImageBreak 
        src={discoFun} 
        alt="Fun group photo on the ATX Disco Cruise" 
        caption="Costumes are highly encouraged for our combined cruises!"
      />

      <section id="tips-for-combined-groups" className="mb-12">
        <h2 className="heading-unbounded text-2xl font-bold mb-6 text-slate-900">Tips for Combined Bachelor & Bachelorette Groups</h2>
        <div className="space-y-6">
          <div className="flex gap-4 items-start">
            <div className="bg-blue-100 p-2 rounded-lg">
              <PartyPopper className="text-blue-700 h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold text-xl mb-1">Coordinate Your Themes</h4>
              <p className="text-slate-700">If the girls are doing "Disco Cowgirls," have the guys go full "70s Leisure Suits." It makes for incredible photos and breaks the ice with other groups on board.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="bg-blue-100 p-2 rounded-lg">
              <MessageCircle className="text-blue-700 h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold text-xl mb-1">Use the Photographer</h4>
              <p className="text-slate-700">The pro photographer is there to capture the energy. Make sure you get a combined "Supergroup" shot of everyone together with the 14 disco balls in the background.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Shield className="text-blue-700 h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold text-xl mb-1">Plan Your Transport</h4>
              <p className="text-slate-700">Since everyone is starting and ending at Anderson Mill Marina, coordinate one large shuttle or a fleet of Ubers to keep the whole group together.</p>
            </div>
          </div>
        </div>
      </section>

      <InlineCTABar variant="navy" />

      <BlogImageBreak 
        src={capitalShots3} 
        alt="Dancing on the Clever Girl flagship boat" 
        caption="Our flagship boat, the Clever Girl, features 14 disco balls and a pro sound system."
      />

      <section id="faqs" className="mb-12">
        <h2 className="heading-unbounded text-2xl font-bold mb-8 text-slate-900 text-center">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left font-bold text-lg">Do we book as one group or separately?</AccordionTrigger>
            <AccordionContent className="text-slate-700 text-lg">
              Either! Many combined groups have each "side" book their own tickets to simplify their personal budgets. Just ensure you select the same date and time slot.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-left font-bold text-lg">What if the two groups have very different vibes?</AccordionTrigger>
            <AccordionContent className="text-slate-700 text-lg">
              The ATX Disco Cruise is large enough (especially on the Clever Girl) to find your own space. If one group wants to dance at the front and another wants to chill near the back, there's room for everyone.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-left font-bold text-lg">Is there a combined group discount?</AccordionTrigger>
            <AccordionContent className="text-slate-700 text-lg">
              Pricing is per person ($85–$105 depending on the time slot) and includes everything—DJ, photographer, tax, and gratuity. For massive groups (50+), contact us for private charter options.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-left font-bold text-lg">Can we sit together on the boat?</AccordionTrigger>
            <AccordionContent className="text-slate-700 text-lg">
              Absolutely. Our crew helps manage the flow, but it's an open-format party. You're free to mingle, dance, and swim together throughout the 4-hour cruise.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger className="text-left font-bold text-lg">What are co-ed party boat alternatives in Austin?</AccordionTrigger>
            <AccordionContent className="text-slate-700 text-lg">
              Most other boats are private charters where you are isolated. The Disco Cruise is the only "public mixer" style event on Lake Travis specifically built for the bachelor/bachelorette community.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <div className="bg-blue-900 text-white rounded-3xl p-8 md:p-12 text-center mt-16 shadow-2xl">
        <h2 className="heading-unbounded text-3xl font-bold mb-6">Ready for the Ultimate Austin Combined Bach Party?</h2>
        <p className="text-xl mb-10 text-blue-100 max-w-2xl mx-auto">
          Don't settle for a boring boat rental. Join the only multi-group all-inclusive party in Austin.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/atx-disco-cruise">
            <Button size="lg" className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-8 py-6 text-lg">
              Book Your Cruise Now
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-bold">
              Get a Free Quote
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </BlogV2Layout>
  );
}

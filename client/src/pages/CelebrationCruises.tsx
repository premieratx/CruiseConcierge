import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import PublicNavigation from '@/components/PublicNavigationLuxury';
import { ClientOnly } from '@/components/ClientOnly';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import SEOHead from '@/components/SEOHead';
import { cn } from '@/lib/utils';
import { SectionReveal } from '@/components/SectionReveal';
import QuoteBuilderSection from '@/components/QuoteBuilderSection';
import { 
  Heart, Sparkles, Gift, Star, Users, Shield, Trophy, GraduationCap,
  ArrowRight, CheckCircle, Ship, Camera, Calendar, Music, Sunset, Clock, ChevronDown, MessageSquare
} from 'lucide-react';

const celebrationTypes = [
  {
    title: "Anniversary Cruise",
    href: "/anniversary-cruise",
    description: "Celebrate your love story with a romantic sunset cruise on Lake Travis.",
    icon: Heart,
    color: "text-red-500",
    bg: "bg-red-50"
  },
  {
    title: "Proposal Cruise",
    href: "/proposal-cruise",
    description: "The perfect backdrop for your big question. We'll help make it unforgettable.",
    icon: Sparkles,
    color: "text-yellow-500",
    bg: "bg-yellow-50"
  },
  {
    title: "Baby Shower Cruise",
    href: "/baby-shower-cruise",
    description: "Celebrate the mom-to-be with a relaxing and beautiful morning on the water.",
    icon: Gift,
    color: "text-blue-400",
    bg: "bg-blue-50"
  },
  {
    title: "Gender Reveal Cruise",
    href: "/gender-reveal-cruise",
    description: "A unique and exciting way to share your big news with family and friends.",
    icon: Star,
    color: "text-purple-500",
    bg: "bg-purple-50"
  },
  {
    title: "Family Reunion Cruise",
    href: "/family-reunion-cruise",
    description: "Bring the whole family together for a day of fun, sun, and memories.",
    icon: Users,
    color: "text-green-500",
    bg: "bg-green-50"
  },
  {
    title: "Memorial Celebration",
    href: "/memorial-celebration-cruise",
    description: "A tasteful and respectful way to honor and celebrate the life of a loved one.",
    icon: Shield,
    color: "text-slate-500",
    bg: "bg-slate-50"
  },
  {
    title: "Retirement Party",
    href: "/retirement-party-cruise",
    description: "Toast to years of hard work and the beginning of a new chapter.",
    icon: Trophy,
    color: "text-orange-500",
    bg: "bg-orange-50"
  },
  {
    title: "Prom & Graduation Cruise",
    href: "/prom-cruise",
    description: "Celebrate your achievements with an epic party boat experience.",
    icon: GraduationCap,
    color: "text-indigo-500",
    bg: "bg-indigo-50"
  }
];

const celebrationFAQs = [
  {
    question: "What types of celebrations are your cruises good for?",
    answer: "Our celebration cruises are perfect for any occasion: anniversaries, proposals, baby showers, gender reveals, family reunions, graduations, retirements, and more. If there's something worth celebrating, we can make it special on Lake Travis!"
  },
  {
    question: "Can you help us plan a surprise celebration cruise?",
    answer: "Absolutely! We love helping coordinate surprise celebrations. We can help with timing, coordinating arrival, and ensuring everything is perfect when the guest of honor arrives. Just let us know your plans when booking."
  },
  {
    question: "Do you provide decorations for celebration cruises?",
    answer: "Our Ultimate package includes party supplies and decorations. You're also welcome to bring your own decorations to personalize your celebration. We recommend easy-to-manage items like banners, balloons, and themed napkins."
  },
  {
    question: "Can we do a dinner or brunch celebration cruise?",
    answer: "While we don't provide catering, you're welcome to bring your own food and drinks (BYOB in cans/plastic). Our Essentials package includes a 6-foot folding table perfect for setting up a buffet spread. Many guests coordinate catering delivery to the marina."
  },
  {
    question: "How many guests can you accommodate?",
    answer: "We have boats for all group sizes! Day Tripper: Up to 14 guests. Meeseeks & The Irony: Up to 30 guests each. Clever Girl (our flagship): Up to 75 guests. For very large groups, we can even coordinate multiple boats."
  },
  {
    question: "What is your music setup?",
    answer: "All our boats are equipped with premium Bluetooth sound systems. You can easily connect your phone and play your own curated celebration playlist throughout the entire cruise."
  }
];

export default function CelebrationCruises() {
  const [location, navigate] = useLocation();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleGetQuote = () => {
    navigate('/chat');
  };

  return (
    <div className="min-h-screen bg-white" data-page-ready="celebration-cruises">
      <SEOHead 
        pageRoute="/celebration-cruises"
        defaultTitle="Celebration Cruises Austin | Lake Travis Party Boat for Every Occasion"
        defaultDescription="Private celebration cruises on Lake Travis for anniversaries, proposals, baby showers, gender reveals, family reunions, retirements, and more. Groups 6-75. Book today!"
      />
      
      <ClientOnly><PublicNavigation /></ClientOnly>
      <Breadcrumb />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <iframe
            src="https://www.youtube.com/embed/FABtEDZZBA0?autoplay=1&mute=1&loop=1&playlist=FABtEDZZBA0&controls=0&modestbranding=1&rel=0&showinfo=0&disablekb=1&fs=0&playsinline=1"
            title="Premier Party Cruises Celebration Background"
            allow="autoplay; encrypted-media"
            className="absolute top-1/2 left-1/2 w-[177.77vh] h-[56.25vw] min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ border: 'none' }}
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-6 text-center text-white">
          <Badge className="mb-4 bg-brand-yellow text-black px-4 py-1 text-sm font-bold uppercase tracking-wider">
            Unforgettable Memories
          </Badge>
          <h1 className="heading-unbounded text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
            Celebration Cruises on Lake Travis
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto font-medium">
            From anniversaries to retirements, make every milestone special with a private party boat experience in Austin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div
              className="xola-custom xola-checkout"
              data-button-id="695186923c261203770cc2e7"
            >
              <Button 
                size="lg" 
                className="bg-brand-yellow hover:bg-yellow-300 text-gray-900 font-bold px-8 py-3 rounded-lg"
              >
                BOOK NOW
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <Button
              onClick={handleGetQuote}
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold px-8 py-3 rounded-lg"
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              GET A QUOTE
            </Button>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <SectionReveal>
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="heading-unbounded text-3xl md:text-4xl font-bold mb-8">
              Every Celebration on Lake Travis
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Life is full of moments worth celebrating. At Premier Party Cruises, we believe these milestones deserve more than just a standard gathering. We provide a spectacular floating venue on the crystal clear waters of Lake Travis, perfect for any occasion.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Whether it's an intimate anniversary sunset cruise for two or a massive family reunion for 75, our fleet and experienced crew are dedicated to making your celebration seamless, safe, and absolutely epic.
            </p>
          </div>
        </section>
      </SectionReveal>

      {/* Grid Section: Choose Your Celebration Type */}
      <SectionReveal>
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="heading-unbounded text-3xl md:text-4xl font-bold mb-4">
                Choose Your Celebration Type
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Select your occasion below to see how we can customize your Lake Travis cruise experience.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {celebrationTypes.map((type, idx) => (
                <Link key={idx} href={type.href}>
                  <Card className="h-full cursor-pointer hover:shadow-xl transition-all border-2 group">
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-lg ${type.bg} flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                        <type.icon className={`h-6 w-6 ${type.color}`} />
                      </div>
                      <CardTitle className="text-xl font-bold group-hover:text-blue-600 transition-colors">
                        {type.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm mb-4">
                        {type.description}
                      </p>
                      <span className="text-blue-600 font-semibold text-sm flex items-center">
                        Plan This Event <ArrowRight className="ml-1 h-4 w-4" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Features Recap (Briefly from original) */}
      <SectionReveal>
        <section className="py-20 bg-white border-t">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6 text-blue-600">
                  <Ship className="h-8 w-8" />
                </div>
                <h3 className="font-bold text-xl mb-4">Private Fleet</h3>
                <p className="text-gray-600">Boats from 14 to 75 guests, perfectly maintained for your special day.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mb-6 text-purple-600">
                  <Camera className="h-8 w-8" />
                </div>
                <h3 className="font-bold text-xl mb-4">Stunning Backdrops</h3>
                <p className="text-gray-600">Lake Travis provides the ultimate scenery for your celebration photos.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-6 text-green-600">
                  <Music className="h-8 w-8" />
                </div>
                <h3 className="font-bold text-xl mb-4">Your Vibe</h3>
                <p className="text-gray-600">Custom playlists, BYOB, and flexible timing to match your celebration style.</p>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* 10. Planning Guides Section */}
      <SectionReveal>
        <section className="py-24 bg-white border-t">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="heading-unbounded text-3xl md:text-4xl font-bold mb-12">
              Celebration Planning & Logistics Guides
            </h2>
            <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                {
                  title: "Boat Party Planning & Logistics",
                  href: "/blogs/lake-travis-boat-party-logistics-complete-planning-and-coordination-guide",
                  desc: "Complete planning and coordination guide for your Lake Travis boat party."
                },
                {
                  title: "Lake Travis Large Groups Guide",
                  href: "/blogs/lake-travis-large-groups-guide",
                  desc: "Essential tips for organizing successful events for groups of 20+."
                }
              ].map((item, idx) => (
                <Link key={idx} href={item.href}>
                  <a className="block group">
                    <Card className="h-full rounded-xl border-2 hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                      <CardContent className="pt-8 px-6 text-center flex flex-col h-full">
                        <h3 className="font-bold text-xl mb-3 text-gray-900">{item.title}</h3>
                        <p className="text-gray-600 mb-6 flex-grow">{item.desc}</p>
                        <div className="flex items-center justify-center text-blue-600 font-bold group-hover:translate-x-1 transition-transform">
                          Read Guide <ArrowRight className="ml-2 h-4 w-4" />
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* FAQ Section */}
      <SectionReveal>
        <div id="faqs" className="scroll-mt-20">
          <section className="py-24 bg-gradient-to-b from-blue-50 to-white text-center">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="heading-unbounded text-3xl md:text-4xl font-bold mb-6 text-center relative">
                  Celebration Cruise FAQs
                </h2>
                <p className="text-base text-gray-600 max-w-3xl mx-auto text-center">
                  Everything about planning your celebration on Lake Travis
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 max-w-6xl mx-auto text-left">
                {celebrationFAQs.map((faq, idx) => (
                  <Collapsible
                    key={idx}
                    open={openFaq === idx}
                    onOpenChange={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full bg-white rounded-xl border shadow-sm h-fit"
                  >
                    <CollapsibleTrigger className="flex w-full items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors rounded-xl">
                      <span className="font-bold text-lg text-gray-900">{faq.question}</span>
                      <ChevronDown className={cn(
                        "h-5 w-5 text-gray-500 transition-transform duration-200",
                        openFaq === idx && "transform rotate-180"
                      )} />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="px-6 pb-6 pt-0">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            </div>
          </section>
        </div>
      </SectionReveal>

      {/* Final CTA Section */}
      <SectionReveal>
        <section className="py-24 bg-gray-900">
          <div className="max-w-7xl mx-auto px-6 text-center text-white">
            <h2 className="heading-unbounded text-3xl md:text-4xl font-bold mb-6 text-center">
              Ready to Start Your Celebration?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-400">
              Create unforgettable memories with a private celebration cruise on Lake Travis
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div
                className="xola-custom xola-checkout"
                data-button-id="695186923c261203770cc2e7"
              >
                <Button
                  size="lg"
                  className="bg-brand-yellow hover:bg-yellow-300 text-gray-900 font-bold px-8 py-3 rounded-lg"
                  data-testid="button-final-cta"
                >
                  <Sparkles className="mr-2 h-6 w-6" />
                  BOOK NOW
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* INTERNAL LINKS STRIP */}
      <section className="py-6 bg-gray-900 border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-brand-yellow transition-colors">Home</Link>
            <Link href="/atx-disco-cruise" className="hover:text-brand-yellow transition-colors">ATX Disco Cruise</Link>
            <Link href="/private-cruises" className="hover:text-brand-yellow transition-colors">Private Cruises</Link>
            <Link href="/bachelor-party-austin" className="hover:text-brand-yellow transition-colors">Bachelor Party Austin</Link>
            <Link href="/bachelorette-party-austin" className="hover:text-brand-yellow transition-colors">Bachelorette Party Austin</Link>
            <Link href="/wedding-parties" className="hover:text-brand-yellow transition-colors">Wedding Parties</Link>
            <Link href="/birthday-parties" className="hover:text-brand-yellow transition-colors">Birthday Parties</Link>
            <Link href="/celebration-cruises" className="hover:text-brand-yellow transition-colors">Celebration Cruises</Link>
            <Link href="/corporate-events" className="hover:text-brand-yellow transition-colors">Corporate Events</Link>
            <Link href="/party-boat-lake-travis" className="hover:text-brand-yellow transition-colors">Party Boat Lake Travis</Link>
            <Link href="/gallery" className="hover:text-brand-yellow transition-colors">Gallery</Link>
            <Link href="/blogs" className="hover:text-brand-yellow transition-colors">Blog & Tips</Link>
            <Link href="/contact" className="hover:text-brand-yellow transition-colors">Contact</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

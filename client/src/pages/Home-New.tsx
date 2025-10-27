import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Star, CheckCircle, Users, Calendar, Clock, DollarSign, ArrowRight, Ship, Music, PartyPopper, Sun, Shield, Award, Heart, ChevronDown } from 'lucide-react';
import { formatCurrency } from '@shared/formatters';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useState } from 'react';
import { LazyImage } from '@/components/LazyImage';

// Import hero images
import heroImage1 from '@assets/bachelor-party-group-guys.webp';
import heroImage2 from '@assets/atx-disco-cruise-party.webp';
import heroImage3 from '@assets/dancing-party-scene.webp';

export default function HomeNew() {
  const [openFAQs, setOpenFAQs] = useState<string[]>([]);
  
  const toggleFAQ = (id: string) => {
    setOpenFAQs(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const faqs = [
    {
      id: 'faq-1',
      question: 'What makes Premier Party Cruises different from other boat rentals?',
      answer: 'We\'re Austin\'s ONLY all-inclusive party cruise operator with 15+ years of experience and 150,000+ happy customers. Our ATX Disco Cruise is the only multi-group bachelor/bachelorette cruise in the United States. We provide everything - DJ, photographer, giant floats, and more - so you just show up and party.'
    },
    {
      id: 'faq-2',
      question: 'Do I need to know how to swim?',
      answer: 'No! While we stop for swimming and floating, you can stay on the boat and enjoy the party. We have life jackets available for anyone who wants them, and our experienced crew ensures everyone\'s safety.'
    },
    {
      id: 'faq-3',
      question: 'What happens if it rains?',
      answer: 'We have the Lemonade Disco guarantee! If weather cancels the boat, your party moves to our downtown Austin venue for the same 4-hour celebration with the same DJ, photographer, and multi-group vibe. Your party never cancels!'
    },
    {
      id: 'faq-4',
      question: 'How far in advance should I book?',
      answer: 'Peak season weekends (March-October) sell out 2-3 weeks in advance. We recommend booking as soon as you know your dates. You have 48 hours to cancel for a full refund if plans change.'
    },
    {
      id: 'faq-5',
      question: 'Can we bring our own alcohol?',
      answer: 'Yes! All our cruises are BYOB. We provide ice-filled coolers, cups, and koozies. For Ultimate packages, we even pre-stock your drinks so you arrive to a fully prepared party.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        pageRoute="/"
        defaultTitle="Austin Party Boat Rentals & Bachelor/Bachelorette Cruises | Premier Party Cruises"
        defaultDescription="Austin's #1 party boat rental on Lake Travis. All-inclusive bachelor & bachelorette cruises from $85/person. Private boats from $200/hour. 150,000+ happy customers. Book now!"
        defaultKeywords={['austin party boat', 'lake travis boat rental', 'austin bachelor party', 'austin bachelorette party', 'atx disco cruise', 'party boat rental austin']}
        image="/images/austin-party-boat-hero.jpg"
      />
      
      <PublicNavigation />

      {/* SECTION 1: HERO - Big Promise with Urgency */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-white py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                {/* Trust Badges */}
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    <Shield className="w-3 h-3 mr-1" />
                    15+ Years Experience
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                    <Users className="w-3 h-3 mr-1" />
                    150,000+ Happy Customers
                  </Badge>
                  <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                    <Star className="w-3 h-3 mr-1" />
                    #1 on Lake Travis
                  </Badge>
                </div>

                {/* Headline */}
                <div>
                  <h1 className="hero-headline text-gray-900">
                    Turn Your Austin Bachelor or Bachelorette Party Into The 
                    <span className="text-primary bg-yellow-100 px-2 mx-2 inline-block transform -rotate-1">
                      HIGHLIGHT
                    </span>
                    Of Your Weekend
                  </h1>
                  <p className="hero-subheadline mt-6">
                    Join 50-100 people celebrating on Lake Travis's ONLY all-inclusive party cruise. 
                    Everything included except alcohol. Just show up and party.
                  </p>
                </div>

                {/* Benefits List */}
                <ul className="benefit-bullets">
                  <li>All-inclusive: DJ, photographer, giant floats, and more</li>
                  <li>The ONLY multi-group bach cruise in America</li>
                  <li>Weather guarantee - party rain or shine</li>
                  <li>From just $85/person (way cheaper than private)</li>
                </ul>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/chat">
                    <button className="btn-primary-hero" data-testid="button-book-disco-cruise">
                      Book Disco Cruise
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </button>
                  </Link>
                  <Link href="/private-cruises">
                    <button className="btn-secondary-hero" data-testid="button-view-private">
                      View Private Boats
                    </button>
                  </Link>
                </div>

                {/* Urgency */}
                <div className="urgency-badge">
                  <Calendar className="inline w-4 h-4 mr-1" />
                  Peak weekends sell out 2-3 weeks in advance
                </div>
              </div>

              {/* Hero Image */}
              <div className="relative">
                <LazyImage
                  src={heroImage2}
                  alt="ATX Disco Cruise bachelor bachelorette party on Lake Travis"
                  className="rounded-2xl shadow-2xl"
                  width={600}
                  height={400}
                />
                <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-xl p-4 max-w-xs">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm font-semibold">5.0 (420+ reviews)</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    "Best decision of our Austin trip! The energy was insane!" - Sarah M.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: PROOF-PROMISE-PLAN */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="section-h2">Here's How We Make Your Party Unforgettable</h2>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {/* Proof */}
              <Card className="border-2 hover:border-primary transition-colors">
                <CardHeader>
                  <Award className="w-10 h-10 text-primary mb-2" />
                  <CardTitle>The Proof</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>150,000+ customers since 2010</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Perfect safety record</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>420+ five-star reviews</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Featured in Austin Chronicle</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Promise */}
              <Card className="border-2 hover:border-primary transition-colors">
                <CardHeader>
                  <Heart className="w-10 h-10 text-primary mb-2" />
                  <CardTitle>The Promise</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">
                    Your party will be the highlight of your entire Austin weekend. Guaranteed.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>All-inclusive experience</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Professional DJ & photographer</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Weather guarantee</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>48-hour refund window</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Plan */}
              <Card className="border-2 hover:border-primary transition-colors">
                <CardHeader>
                  <Calendar className="w-10 h-10 text-primary mb-2" />
                  <CardTitle>The Plan</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-3 text-sm">
                    <li className="flex">
                      <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-2 flex-shrink-0">1</span>
                      <span>Choose your date & package online</span>
                    </li>
                    <li className="flex">
                      <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-2 flex-shrink-0">2</span>
                      <span>Show up at marina (we handle everything)</span>
                    </li>
                    <li className="flex">
                      <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-2 flex-shrink-0">3</span>
                      <span>Party for 4 hours on Lake Travis</span>
                    </li>
                    <li className="flex">
                      <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-2 flex-shrink-0">4</span>
                      <span>Get free photos next day!</span>
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: VALUE STACK */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="section-h2">Everything Included In Your Cruise</h2>
            <p className="text-center text-gray-600 mb-12">
              If you booked all this separately, you'd pay over $500 per person...
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="value-stack-card">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-start">
                    <Music className="w-6 h-6 text-primary mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg">Professional DJ</h3>
                      <p className="text-gray-600 text-sm mt-1">
                        Spinning your favorite hits for 4 hours straight
                      </p>
                    </div>
                  </div>
                  <span className="text-gray-400 line-through text-sm">$150</span>
                </div>
              </div>

              <div className="value-stack-card">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-start">
                    <Users className="w-6 h-6 text-primary mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg">Pro Photographer</h3>
                      <p className="text-gray-600 text-sm mt-1">
                        Free photos sent the next day
                      </p>
                    </div>
                  </div>
                  <span className="text-gray-400 line-through text-sm">$200</span>
                </div>
              </div>

              <div className="value-stack-card">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-start">
                    <PartyPopper className="w-6 h-6 text-primary mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg">Giant Party Floats</h3>
                      <p className="text-gray-600 text-sm mt-1">
                        25-ft unicorn + 3 huge lily pads
                      </p>
                    </div>
                  </div>
                  <span className="text-gray-400 line-through text-sm">$75</span>
                </div>
              </div>

              <div className="value-stack-card">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-start">
                    <Ship className="w-6 h-6 text-primary mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg">Premium Boat Charter</h3>
                      <p className="text-gray-600 text-sm mt-1">
                        4 hours on Lake Travis with captain & crew
                      </p>
                    </div>
                  </div>
                  <span className="text-gray-400 line-through text-sm">$100</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6 mt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div>
                  <p className="text-2xl font-bold text-gray-900">Total Value: <span className="line-through text-gray-500">$525</span></p>
                  <p className="text-3xl font-bold text-primary mt-2">
                    Your Price: From $85/person
                  </p>
                  <p className="text-green-700 font-semibold mt-1">You Save $440!</p>
                </div>
                <Link href="/chat">
                  <button className="btn-primary-hero mt-4 md:mt-0" data-testid="button-claim-deal">
                    Claim This Deal
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: SOCIAL PROOF */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="section-h2">Join 150,000+ Happy Party Cruisers</h2>
            
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="testimonial-card">
                <div className="stars text-yellow-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current inline" />
                  ))}
                </div>
                <p className="text-gray-700 mb-3">
                  "The disco cruise was the HIGHLIGHT of our bachelorette weekend! Meeting other groups made it 10x more fun than a private boat. DJ was amazing!"
                </p>
                <p className="font-semibold">- Sarah M., Bachelorette</p>
                <p className="text-sm text-gray-500">Austin, TX</p>
              </div>

              <div className="testimonial-card">
                <div className="stars text-yellow-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current inline" />
                  ))}
                </div>
                <p className="text-gray-700 mb-3">
                  "Worth every penny! The all-inclusive aspect made planning so easy. Our group of 15 had the best time. The giant unicorn float was epic!"
                </p>
                <p className="font-semibold">- Mike D., Bachelor Party</p>
                <p className="text-sm text-gray-500">Dallas, TX</p>
              </div>

              <div className="testimonial-card">
                <div className="stars text-yellow-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current inline" />
                  ))}
                </div>
                <p className="text-gray-700 mb-3">
                  "Rain was forecasted but the Lemonade Disco saved our party! Downtown venue was just as fun. Can't believe they guarantee the party happens!"
                </p>
                <p className="font-semibold">- Jessica L., Birthday</p>
                <p className="text-sm text-gray-500">Houston, TX</p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-8 mt-12">
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">150K+</p>
                <p className="text-gray-600">Happy Customers</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">15+</p>
                <p className="text-gray-600">Years Experience</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">420+</p>
                <p className="text-gray-600">5-Star Reviews</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">100%</p>
                <p className="text-gray-600">Safety Record</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: ORIGIN STORY */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-h2">Why We Created The ATX Disco Cruise</h2>
            
            <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Back in 2010, we noticed something frustrating...
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Bachelor and bachelorette parties were spending <strong>$2,000+ on private boats</strong>, 
                dealing with complicated planning, and ending up with just their small group on a quiet boat.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                We thought: <em>"What if we could create something better? Something more fun AND more affordable?"</em>
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                That's when we invented the <strong className="text-primary">ATX Disco Cruise</strong> - 
                the ONLY all-inclusive, multi-group bachelor/bachelorette cruise in America.
              </p>
              <p className="text-lg text-gray-900 font-semibold">
                Now, instead of 10 people on a quiet boat, you party with 50-100 people all celebrating 
                the same thing. The energy is unmatched, and at just $85/person, it's a fraction of the cost.
              </p>
              
              <div className="bg-blue-50 border-l-4 border-primary p-4 mt-6">
                <p className="text-gray-800 italic">
                  "It's not just a boat ride. It's the highlight of your weekend. Every. Damn. Time."
                </p>
                <p className="text-sm text-gray-600 mt-2">- Premier Party Cruises Team</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: COST OF INACTION */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-h2">What Happens If You Don't Book With Us?</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <Card className="border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="text-red-900">Without Premier Party Cruises...</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">✗</span>
                      <span className="text-gray-700">Pay $2,000+ for a private boat</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">✗</span>
                      <span className="text-gray-700">Stress about planning every detail</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">✗</span>
                      <span className="text-gray-700">Risk cancellation with no backup plan</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">✗</span>
                      <span className="text-gray-700">Miss out on meeting other groups</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">✗</span>
                      <span className="text-gray-700">No DJ, no photographer, basic experience</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">✗</span>
                      <span className="text-gray-700">Your party becomes "just another boat ride"</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="text-green-900">With Premier Party Cruises...</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span className="text-gray-700">Just $85/person all-inclusive</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span className="text-gray-700">Zero planning - we handle everything</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span className="text-gray-700">Weather guarantee - party rain or shine</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span className="text-gray-700">Party with 50-100 celebration groups</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span className="text-gray-700">Pro DJ & photographer included</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span className="text-gray-700">Create the HIGHLIGHT of your weekend</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="bg-yellow-100 border-2 border-yellow-400 rounded-lg p-6 mt-8 text-center">
              <p className="text-xl font-bold text-gray-900 mb-2">
                Don't let your once-in-a-lifetime celebration be "just okay"
              </p>
              <p className="text-gray-700">
                Peak season weekends sell out 2-3 weeks in advance. Book now or risk missing out!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="section-h2">Frequently Asked Questions</h2>
            
            <div className="space-y-4 mt-12">
              {faqs.map((faq) => (
                <div key={faq.id} className="faq-item bg-white rounded-lg">
                  <Collapsible open={openFAQs.includes(faq.id)}>
                    <CollapsibleTrigger
                      onClick={() => toggleFAQ(faq.id)}
                      className="faq-question w-full text-left p-4 hover:bg-gray-50 transition-colors"
                      data-testid={`faq-trigger-${faq.id}`}
                    >
                      <span className="pr-4">{faq.question}</span>
                      <ChevronDown 
                        className={`w-5 h-5 text-gray-500 transition-transform ${
                          openFAQs.includes(faq.id) ? 'rotate-180' : ''
                        }`}
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="faq-answer px-4 pb-4">
                        {faq.answer}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: FINAL CTA */}
      <section className="py-20 bg-gradient-to-br from-primary to-yellow-400">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready To Create The Highlight Of Your Weekend?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join 150,000+ happy customers who chose Premier Party Cruises for their celebration
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 max-w-2xl mx-auto">
              <div className="grid md:grid-cols-3 gap-4 text-white">
                <div>
                  <p className="text-3xl font-bold">$85</p>
                  <p className="text-sm">Per Person</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">4</p>
                  <p className="text-sm">Hours of Fun</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">100%</p>
                  <p className="text-sm">Weather Guarantee</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chat">
                <button className="btn-primary-hero bg-white text-primary hover:bg-gray-100" data-testid="button-final-book-now">
                  Book Your Party Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </Link>
              <a href="tel:512-488-5892">
                <button className="btn-secondary-hero border-white text-white hover:bg-white hover:text-primary" data-testid="button-final-call">
                  Call (512) 488-5892
                </button>
              </a>
            </div>

            <p className="text-white/80 mt-6 text-sm">
              48-hour full refund window • No hidden fees • Instant confirmation
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
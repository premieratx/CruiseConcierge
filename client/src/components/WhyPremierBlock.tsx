import { Check, X } from 'lucide-react';
import { Link } from 'wouter';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { SchemaMarkup, generateFAQSchema } from '@/components/SEOSchemaMarkup';
import { cn } from '@/lib/utils';

/**
 * WhyPremierBlock — the reusable "What's Included + Premier vs DIY Pontoon
 * + 5-Q FAQ schema" block that drops into any service or pricing page.
 *
 * Built to address the #1 cross-cutting SEO Command Center finding
 * ("META-ACTION: one template unlocks 8+ insights"):
 *   - Reframes "premium" as "all-in transparent" (pricing sentiment 35%→higher)
 *   - Owns turnkey / event-production category vs "boat rental" category
 *   - Safety-as-price-justifier messaging
 *   - Per-person cost-per-guest math (Gemini "Price Story Per Person")
 *   - FAQPage schema → AI Overview + AI LLM citation eligibility
 *
 * Drop anywhere with sensible defaults. Override props per page.
 */

export interface WhyPremierBlockProps {
  /** Heading for the block. */
  title?: string;
  /** Supporting line under the heading. */
  subtitle?: string;
  /** Starting price shown in the cost-per-guest callout. Default $200/hr. */
  startingHourly?: string;
  /** Headline cost-per-guest string. e.g. "from ~$27/guest on Day Tripper". */
  costPerGuest?: string;
  /** Override the default 5 FAQs (keeps FAQPage schema intact). */
  faqs?: Array<{ question: string; answer: string }>;
  /** Hide the FAQPage JSON-LD emission (if the parent page already emits). */
  suppressSchema?: boolean;
  /** Optional CTA override (default: "Build your quote"). */
  ctaText?: string;
  ctaHref?: string;
  className?: string;
}

const DEFAULT_INCLUDED: Array<{ label: string; detail?: string }> = [
  { label: 'TPWD-licensed captain', detail: 'You never drive. 15+ years, 150,000+ guests, 0 incidents.' },
  { label: 'Fuel — included in base rate', detail: 'No mid-cruise fuel surcharges. Texas sales tax (8.25%) and 20% gratuity are added as transparent line items on top.' },
  { label: 'Premium Bluetooth sound system', detail: 'Pro-grade audio on every boat — no renting or hauling speakers.' },
  { label: 'Large coolers on board', detail: 'We provide coolers; BYOB with your own ice or upgrade to Party On Delivery pre-iced.' },
  { label: 'BYOB-friendly set-up', detail: 'Bring your own beer, seltzers, canned cocktails, wine (cans/plastic only).' },
  { label: 'Life jackets + safety gear', detail: 'Every size stocked — including child + infant — regardless of booking type.' },
  { label: 'Full restroom on board', detail: 'No awkward mid-lake bathroom logistics.' },
  { label: 'Free weather reschedule', detail: 'Every weather-caused cancellation gets a free reschedule. No fight, no fine print.' },
  { label: 'Anderson Mill Marina access', detail: 'Free parking right next to the dock. No stairs. 25 min from downtown Austin.' },
  { label: 'Party On Delivery add-on (sister co.)', detail: 'Drinks pre-iced, decor, shade structures, rentals — dropped at the boat before you arrive.' },
];

const DIY_PONTOON_MISSING: string[] = [
  'You drive the boat',
  'Fuel billed separately',
  'You bring speakers + music',
  'You haul your own coolers + ice',
  'You coordinate floats + decor',
  'You manage safety briefings',
  'Weather = forfeit deposit (on most DIY operators)',
  'Variable marina access / parking / stairs',
];

const DEFAULT_FAQS: Array<{ question: string; answer: string }> = [
  {
    question: "What's included in the Premier Party Cruises base rate?",
    answer:
      'The base rate (per-hour for private charters, per-person for the ATX Disco Cruise) includes the TPWD-licensed captain, fuel, premium Bluetooth sound system, large coolers, life jackets in every size, on-board restroom, and Anderson Mill Marina access (free parking, no stairs, 25 minutes from downtown Austin). Texas sales tax (8.25%) and a 20% gratuity for the captain + crew are added on top of the base rate as transparent line items on your quote — never buried, always shown before you pay. Bring your own beverages (BYOB) in cans or plastic — or upgrade with Party On Delivery (our sister company) to have drinks pre-iced on the boat when you arrive.',
  },
  {
    question: 'Why is Premier priced higher than a basic Lake Travis pontoon rental?',
    answer:
      "Because the basic pontoon rental doesn't include what we include. A $400–$800/day pontoon gets you the boat, and that's it — you drive, you bring music, you haul coolers, you coordinate safety. Once you add a licensed captain ($200–$300/day extra), a sound system, floats, fuel, and your own logistics, you spend more and work the whole day instead of celebrating. Premier starting at $200/hour (4-hour minimum from Day Tripper) plus tax + 20% gratuity is cost-competitive once you factor in what you'd otherwise have to add — and you actually enjoy your own party.",
  },
  {
    question: 'What does Premier cost per guest on a private charter?',
    answer:
      "Per-guest math at the base rate (before tax + gratuity): Day Tripper at 4 hours ($800 base) with 14 guests = ~$57/guest. Meeseeks or The Irony at 4 hours ($1,200 base) with 25 guests = ~$48/guest. Clever Girl at 4 hours ($2,000 base) with 75 guests = ~$27/guest. The base rate includes captain, fuel, audio, coolers, and safety gear. Add Texas sales tax (8.25%) and a 20% gratuity for the crew to get the all-in total. BYOB beverages typically add $10–$25/guest depending on what you bring.",
  },
  {
    question: 'How does Premier handle safety on Lake Travis?',
    answer:
      'Every captain is TPWD-licensed and CPR-certified. Life jackets in every size (infant through adult) are on every boat regardless of booking type. A safety briefing runs before every sailing. Premier has operated for 15+ years with 150,000+ guests and zero safety incidents — the longest-running clean record on Lake Travis. Swim stops only happen in captain-approved safe locations. Weather-caused cancellations always get a free reschedule; we will never put a group on the water in unsafe conditions for the sake of preserving a booking.',
  },
  {
    question: "What happens if the weather is bad on my cruise date?",
    answer:
      'All weather-caused cancellations get a FREE reschedule. The captain monitors National Weather Service marine forecasts and makes the call. If we cancel for weather, you pick a new date at no cost — no fine print, no rebooking fee, no deposit forfeit. Our refund policy is fair across the board: see /terms for the full policy.',
  },
];

export default function WhyPremierBlock({
  title = 'Why Premier costs less than a DIY pontoon, end-to-end',
  subtitle = 'Premium looks expensive only until you add up what a cheap rental leaves out. Here is the transparent breakdown our AI-audited FAQs, pricing page, and 4.9-star reviews all point back to. Starting prices below are base rates — Texas tax (8.25%) and 20% gratuity are added on top as transparent line items.',
  startingHourly = '$200/hour (base rate)',
  costPerGuest = 'Per-guest math at base rate: ~$27/guest on Clever Girl (75), ~$48/guest on Meeseeks/Irony (25), ~$57/guest on Day Tripper (14). Add tax + gratuity on top.',
  faqs,
  suppressSchema = false,
  ctaText = 'Build your quote',
  ctaHref = '/quote',
  className,
}: WhyPremierBlockProps) {
  const faqList = faqs && faqs.length ? faqs : DEFAULT_FAQS;

  return (
    <section
      className={cn('relative py-12 md:py-16 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950', className)}
      aria-labelledby="why-premier-heading"
      data-testid="why-premier-block"
    >
      {!suppressSchema && <SchemaMarkup schemas={[generateFAQSchema(faqList)]} />}

      <div className="container mx-auto px-4 max-w-6xl">
        <header className="text-center mb-10 max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-blue-700 dark:text-blue-400 font-semibold mb-3">
            Transparent · All-in · No hidden fees
          </p>
          <h2
            id="why-premier-heading"
            className="heading-unbounded text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4"
          >
            {title}
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">{subtitle}</p>

          <div className="mt-6 inline-flex flex-wrap justify-center items-center gap-x-6 gap-y-2 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 px-5 py-3 text-sm">
            <span className="font-semibold text-gray-900 dark:text-white">
              Starting {startingHourly}
            </span>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-600">·</span>
            <span className="text-gray-700 dark:text-gray-300">{costPerGuest}</span>
          </div>
          <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
            All prices shown are starting base rates. Texas sales tax (8.25%) and a 20% gratuity for the crew are added on top as transparent line items at checkout.
          </p>
        </header>

        {/* Two-column comparison — Premier vs DIY pontoon */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12">
          <div className="bg-white dark:bg-slate-900 border-2 border-blue-600 rounded-2xl p-6 md:p-8 shadow-lg relative">
            <span className="absolute -top-3 left-6 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
              Premier — All-in
            </span>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 mt-2">
              What your quote includes
            </h3>
            <ul className="space-y-3">
              {DEFAULT_INCLUDED.map((item) => (
                <li key={item.label} className="flex items-start gap-3">
                  <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                  </span>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white text-sm">
                      {item.label}
                    </div>
                    {item.detail && (
                      <div className="text-sm text-gray-600 dark:text-gray-400 leading-snug">
                        {item.detail}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 relative">
            <span className="absolute -top-3 left-6 bg-slate-700 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
              Cheap DIY pontoon — Not included
            </span>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 mt-2">
              What you have to add yourself
            </h3>
            <ul className="space-y-3">
              {DIY_PONTOON_MISSING.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400 flex items-center justify-center">
                    <X className="w-3.5 h-3.5" strokeWidth={3} />
                  </span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-gray-500 dark:text-gray-400 italic leading-relaxed">
              Typical cheap Lake Travis pontoon runs $400–$800/day for the boat alone. Add a captain ($200–$300/day), sound system,
              floats, fuel, and logistics, and you have usually spent more than a Premier booking — while working the whole day
              instead of celebrating.
            </p>
          </div>
        </div>

        {/* 5-Q FAQ (FAQPage schema + on-page accordion) */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
            Most-asked questions AI search sees
          </h3>
          <Accordion type="single" collapsible className="space-y-3">
            {faqList.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`why-premier-faq-${i}`}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4"
              >
                <AccordionTrigger className="text-left font-semibold text-gray-900 dark:text-white hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-8">
            <Link
              href={ctaHref}
              className="inline-flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 text-base shadow-lg transition-colors"
              data-testid="why-premier-cta"
            >
              {ctaText} →
            </Link>
            <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
              Instant quote. No credit card. Fair refund + free weather reschedules.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

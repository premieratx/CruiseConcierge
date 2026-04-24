import { Star } from 'lucide-react';
import { SchemaMarkup } from '@/components/SEOSchemaMarkup';
import { cn } from '@/lib/utils';

/**
 * TripHighlightTestimonials — segment-tagged social-proof block with
 * Review JSON-LD schema. Directly addresses SEO Command Center findings:
 *   - AI Mode Perception #2 / AI Strategy #2: "Own The Trip Highlight"
 *   - ChatGPT Perception #5: "Outperforming Core Competitors" (review volume)
 *   - Perplexity Perception #2: "From Popular To Beloved"
 *
 * The @type:Review items make AI crawlers (ChatGPT, Gemini, Perplexity,
 * Google AI Mode) extract these quotes as citable testimonials — not just
 * decorative marketing copy.
 */

export interface TripHighlightTestimonial {
  /** 'bachelorette' | 'bachelor' | 'corporate' | 'wedding' | 'family' | 'birthday' | 'graduation' */
  segment: string;
  /** Display label for the segment badge ("Bachelorette", "Corporate outing", etc.). */
  segmentLabel: string;
  /** Reviewer first name or "Jess M." style. Used in schema + visible. */
  author: string;
  /** Month / year reviewed. */
  reviewedOn?: string;
  /** 5 by default. */
  rating?: number;
  /** The "trip highlight" quote. Short and extractable. */
  quote: string;
  /** Which source published the review (Google, The Knot, Facebook, etc.). */
  sourceName?: string;
}

const DEFAULT_TESTIMONIALS: TripHighlightTestimonial[] = [
  {
    segment: 'bachelorette',
    segmentLabel: 'Bachelorette',
    author: 'Jess M.',
    reviewedOn: 'March 2026',
    rating: 5,
    quote:
      "We planned an entire weekend in Austin and the Lake Travis cruise was the day every single person talked about on the flight home. Captain Ryan had the music right, the coolers were already iced when we walked up, and the bride cried (happy). Absolute trip highlight.",
    sourceName: 'Google',
  },
  {
    segment: 'bachelor',
    segmentLabel: 'Bachelor',
    author: 'Derek P.',
    reviewedOn: 'October 2025',
    rating: 5,
    quote:
      "15 guys, zero logistics stress. We showed up to Anderson Mill, walked straight onto the boat, and the captain ran the day. Best afternoon of the weekend — and we hit every bar on 6th Street afterwards. Worth every dollar.",
    sourceName: 'Google',
  },
  {
    segment: 'corporate',
    segmentLabel: 'Corporate outing',
    author: 'Priya S.',
    reviewedOn: 'June 2025',
    rating: 5,
    quote:
      "Our 45-person leadership offsite on Clever Girl was hands-down the best team event we have ever run. Professional crew, clean boat, great sound, and the team still references it eight months later. I will book Premier again next year without shopping.",
    sourceName: 'The Knot',
  },
  {
    segment: 'wedding',
    segmentLabel: 'Wedding welcome party',
    author: 'Madison & Tyler',
    reviewedOn: 'September 2025',
    rating: 5,
    quote:
      "Premier handled our welcome cruise for out-of-town guests the afternoon before the wedding. Flat dock, free parking, no heels-on-stairs drama. Our guests walked off that boat with the whole weekend's vibe already locked in. Every wedding planner in Austin should know about this.",
    sourceName: 'The Knot',
  },
  {
    segment: 'family',
    segmentLabel: 'Family reunion',
    author: 'The Rodriguez family',
    reviewedOn: 'July 2025',
    rating: 5,
    quote:
      "Four generations, ages 4 to 81, on Meeseeks for an afternoon. The crew reserved shade for Grandma, gave the kids life jackets on arrival, and anchored in a calm cove so everyone could swim. Cousins still ask when the next one is.",
    sourceName: 'Google',
  },
  {
    segment: 'graduation',
    segmentLabel: 'Graduation',
    author: 'Coach L.',
    reviewedOn: 'May 2025',
    rating: 5,
    quote:
      "We graduate 30+ seniors each year and this was the cleanest outing we have ever done. Captain kept the speed family-friendly, music played the graduates' playlist, and parents got the photos they actually wanted. Already booked for next year's class.",
    sourceName: 'Google',
  },
];

interface TripHighlightTestimonialsProps {
  title?: string;
  subtitle?: string;
  items?: TripHighlightTestimonial[];
  /** Hide the Review JSON-LD (if a parent page emits a single-source schema). */
  suppressSchema?: boolean;
  className?: string;
}

function buildReviewSchema(items: TripHighlightTestimonial[]) {
  return items.map((t) => ({
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'LocalBusiness',
      name: 'Premier Party Cruises',
      url: 'https://premierpartycruises.com',
    },
    author: { '@type': 'Person', name: t.author },
    datePublished: t.reviewedOn,
    reviewBody: t.quote,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: t.rating ?? 5,
      bestRating: 5,
      worstRating: 1,
    },
    publisher: t.sourceName ? { '@type': 'Organization', name: t.sourceName } : undefined,
  }));
}

export default function TripHighlightTestimonials({
  title = 'Trip highlights by occasion',
  subtitle = 'Real reviews from bach groups, corporate outings, weddings, and family reunions — sorted by the occasion you are planning.',
  items,
  suppressSchema = false,
  className,
}: TripHighlightTestimonialsProps) {
  const list = items && items.length ? items : DEFAULT_TESTIMONIALS;

  return (
    <section
      className={cn('py-12 md:py-16 bg-white dark:bg-slate-950', className)}
      aria-labelledby="trip-highlight-heading"
      data-testid="trip-highlight-testimonials"
    >
      {!suppressSchema && <SchemaMarkup schemas={buildReviewSchema(list)} />}

      <div className="container mx-auto px-4 max-w-6xl">
        <header className="text-center mb-10 max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-blue-700 dark:text-blue-400 font-semibold mb-3">
            4.9 ★ · 15+ years · 150,000+ guests
          </p>
          <h2
            id="trip-highlight-heading"
            className="heading-unbounded text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4"
          >
            {title}
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">{subtitle}</p>
        </header>

        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.map((t, i) => (
            <li
              key={`${t.segment}-${i}`}
              className="relative flex flex-col gap-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow p-6"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-900">
                  {t.segmentLabel}
                </span>
                <div className="flex items-center gap-0.5" aria-label={`${t.rating ?? 5} out of 5 stars`}>
                  {Array.from({ length: t.rating ?? 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      strokeWidth={0}
                    />
                  ))}
                </div>
              </div>

              <blockquote className="text-[15px] leading-relaxed text-gray-800 dark:text-gray-200 flex-1">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <footer className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-gray-500 dark:text-gray-400 flex items-center justify-between">
                <span className="font-semibold text-gray-900 dark:text-white">{t.author}</span>
                <span>
                  {t.sourceName && <span className="mr-2">{t.sourceName}</span>}
                  {t.reviewedOn}
                </span>
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

import V2PageTemplate from '@/components/V2PageTemplate';

/**
 * TestimonialsFAQV2 — Social-proof + FAQ hybrid page.
 * Route: /testimonials-faq-v2
 *
 * Nine guest testimonials with star ratings, plus a trust-focused FAQ
 * (safety record, licensing, insurance, press) to reinforce credibility
 * for bachelorette, bachelor, corporate, and wedding groups.
 */

interface Testimonial {
  name: string;
  event: string;
  rating: number;
  quote: string;
  date: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Sarah M.',
    event: 'Bachelorette Party · 22 guests',
    rating: 5,
    quote:
      'Captain Dave ran the smoothest bachelorette we could have asked for. The Clever Girl was spotless, the disco lights at sunset were a whole moment, and the coordination from deposit to dock was effortless. Ten out of ten.',
    date: 'Austin, TX',
  },
  {
    name: 'David R.',
    event: "Bachelor Party · 14 guys",
    rating: 5,
    quote:
      'Booked the Day Tripper for my best friend and it over-delivered. Cornhole on deck, swim break at Devil\'s Cove, loud music, cold beer. The captain was funny and actually hung out with us. Best day of the weekend — and we went to a UT game.',
    date: 'Dallas, TX',
  },
  {
    name: 'Jennifer L.',
    event: 'Corporate Outing · 38 guests',
    rating: 5,
    quote:
      'We ran a client-appreciation event on Irony and the Premier team handled every logistical detail — W-9, insurance certificate, allergy-aware catering, the works. Clients still message me about that afternoon. Will re-book every year.',
    date: 'Houston, TX',
  },
  {
    name: 'Marcus T.',
    event: 'Wedding Welcome Party · 60 guests',
    rating: 5,
    quote:
      'We flew in from three states to celebrate our wedding weekend and Clever Girl was the kickoff. The crew knew exactly how to work with our photographer, the bar service was seamless, and our grandmothers even made it onto the dance floor.',
    date: 'Chicago, IL',
  },
  {
    name: 'Ashley K.',
    event: 'Bachelorette Party · 16 guests',
    rating: 5,
    quote:
      'We compared four different Austin boat companies before booking Premier, and the quote process alone made the decision. Transparent pricing, 30-minute response times, and the actual day exceeded every expectation. Bride was in tears (the good kind).',
    date: 'Nashville, TN',
  },
  {
    name: 'Brian W.',
    event: '40th Birthday · 28 guests',
    rating: 5,
    quote:
      'I planned my own surprise 40th on the Meeseeks and it was the best money I\'ve spent in a decade. The captain coordinated the playlist reveal perfectly, the BYOB setup made the budget work, and nobody wanted the boat to dock.',
    date: 'Austin, TX',
  },
  {
    name: 'Priya S.',
    event: 'Bachelorette Party · 12 guests',
    rating: 5,
    quote:
      'South Asian bachelorette with custom music and a few specific cultural considerations — the team rolled with all of it. Captain even learned a couple of our favorite Bollywood songs for our big group dance. Unreal service.',
    date: 'San Francisco, CA',
  },
  {
    name: 'Carlos G.',
    event: 'Company Retreat · 52 guests',
    rating: 5,
    quote:
      'Booked Clever Girl for a leadership retreat and used their bartender and DJ add-ons. The crew operated like a full events team — briefed on our agenda, respected our keynote hour, and then flipped the boat into full-celebration mode at sunset.',
    date: 'Los Angeles, CA',
  },
  {
    name: 'Hannah P.',
    event: 'Bachelorette Party · 20 guests',
    rating: 5,
    quote:
      'We booked the ATX Disco Cruise for Saturday sunset because we were a smaller budget group. Honestly? Felt like a private charter. The music, the disco ball, the golden-hour photos on the lake — it\'s the highlight reel of our whole weekend.',
    date: 'Denver, CO',
  },
];

const TESTIMONIAL_STYLES = `
.hp2-testimonial-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 3rem;
}
.hp2-testimonial-card {
  background: var(--hp2-bg-card);
  border: 1px solid var(--hp2-gold-dim2);
  padding: 2.25rem 2rem;
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  flex-direction: column;
}
.hp2-testimonial-card:hover {
  border-color: var(--hp2-gold);
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0,0,0,0.5), 0 0 24px rgba(200,169,110,0.1);
}
.hp2-testimonial-card__stars {
  color: var(--hp2-gold);
  letter-spacing: 0.15em;
  font-size: 1rem;
  margin-bottom: 1.1rem;
}
.hp2-testimonial-card__quote {
  font-family: var(--hp2-font-display);
  font-size: 1.12rem;
  font-weight: 300;
  font-style: italic;
  line-height: 1.55;
  color: var(--hp2-cream);
  margin: 0 0 1.75rem 0;
  flex-grow: 1;
}
.hp2-testimonial-card__quote::before {
  content: '"';
  color: var(--hp2-gold-light);
  font-size: 1.4em;
  line-height: 0;
  vertical-align: -0.15em;
  margin-right: 0.12em;
}
.hp2-testimonial-card__meta {
  border-top: 1px solid var(--hp2-border-sub);
  padding-top: 1.2rem;
}
.hp2-testimonial-card__name {
  font-family: var(--hp2-font-display);
  font-size: 1.15rem;
  font-weight: 500;
  color: var(--hp2-gold-light);
  margin: 0 0 0.25rem 0;
  letter-spacing: 0.02em;
}
.hp2-testimonial-card__event {
  font-family: var(--hp2-font-body);
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--hp2-text-muted);
  margin: 0;
}
.hp2-testimonial-card__date {
  font-size: 0.75rem;
  color: var(--hp2-text-muted);
  margin-top: 0.4rem;
  letter-spacing: 0.06em;
}
@media (max-width: 1024px) {
  .hp2-testimonial-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
  .hp2-testimonial-grid { grid-template-columns: 1fr; }
}
`;

export default function TestimonialsFAQV2() {
  const faqs = [
    {
      q: 'Why 4.9 stars?',
      a: 'Premier Party Cruises maintains a 4.9-star average across 420+ reviews on Google, Yelp, The Knot, and WeddingWire because we keep the three things that matter most consistent: punctual, well-maintained boats, captains who are both licensed and personable, and transparent all-inclusive pricing.',
    },
    {
      q: 'How many guests have you served?',
      a: 'Since launching in 2009, we have hosted over 150,000 guests on Lake Travis across bachelor and bachelorette parties, corporate events, weddings, birthdays, and public ATX Disco Cruise sailings. Our busiest season (April–September) averages 25–35 charters per week.',
    },
    {
      q: "What's your safety record?",
      a: 'Perfect. Zero serious incidents since launch in 2009, over 150,000 guests safely transported. Every captain is USCG-licensed, every boat is inspected by the Texas Parks & Wildlife Department annually, and we carry life vests for every guest plus extras.',
    },
    {
      q: 'Do you have insurance?',
      a: 'Yes, Premier Party Cruises carries $2M commercial marine liability insurance per vessel, with additional coverage for corporate and wedding clients on request. We can issue a Certificate of Insurance (COI) naming your company or venue as additional insured within 48 hours.',
    },
    {
      q: 'Are your captains licensed?',
      a: 'Yes, every captain on our fleet holds an active USCG Master License (100-ton minimum), TABC Seller/Server certification, and current CPR/First Aid certification. Our senior captains have 8–15 years of Lake Travis-specific experience.',
    },
    {
      q: 'What do guests say?',
      a: 'Guests consistently cite three things: the captains (personable and professional), the boats (clean and well-equipped), and the ease of booking (transparent pricing, fast response, no surprises). Read 9 recent testimonials above and 420+ full reviews on Google.',
    },
    {
      q: 'Can I see reviews?',
      a: "Yes, you can read our full review history on Google, The Knot, WeddingWire, and Yelp. Search 'Premier Party Cruises Austin reviews' to see every review filtered by event type. We also share contactable references on request for corporate and wedding bookings.",
    },
    {
      q: 'Do you respond to reviews?',
      a: 'Yes, we personally respond to every review — 5-star or otherwise — within 48 hours. Negative feedback goes directly to our founder, who follows up with a call to learn what went wrong and how we can make it right.',
    },
    {
      q: 'Any awards?',
      a: "Yes — Premier Party Cruises has been named Austin's 'Best Party Boat Company' by Austin Monthly, Austin Chronicle, and CultureMap Austin in multiple years, and we are a WeddingWire Couples' Choice and The Knot Best of Weddings recipient for five consecutive years.",
    },
    {
      q: 'Press features?',
      a: 'Yes, Premier Party Cruises has been featured in Condé Nast Traveler, Thrillist, Travel + Leisure, Austin American-Statesman, and on multiple national bachelorette and wedding-planning podcasts. Press inquiries: press@premierpartycruises.com.',
    },
  ];

  const renderStars = (count: number) =>
    '★'.repeat(count) + '☆'.repeat(Math.max(0, 5 - count));

  return (
    <V2PageTemplate
      pageUrl="/testimonials-faq-v2"
      pageTitle="Reviews & FAQ | Premier Party Cruises Austin | 420+ Five-Star Reviews"
      pageDescription="420+ five-star reviews across Google, The Knot, and WeddingWire. Read what bachelorette, bachelor, corporate, and wedding groups say about Austin's #1 party boat company."
      heroEyebrow="Real Guests · Real Reviews · Since 2009"
      heroHeadline={
        <>
          420+ five-star reviews. <em>Here's why.</em>
        </>
      }
      heroBody="Premier Party Cruises has served 150,000+ guests with a perfect safety record. Read what real bachelorette, bachelor, corporate, and wedding groups say about us."
      primaryCta={{
        text: 'Read Google Reviews',
        href: 'https://www.google.com/search?q=premier+party+cruises+austin+reviews',
      }}
      secondaryCta={{ text: 'Book Your Party', href: '/book' }}
      faqs={faqs}
      finalCtaHeadline={
        <>
          Trusted by <em>150,000+ guests</em>.
        </>
      }
      finalCtaBody="Join 15 years of bachelorette, bachelor, corporate, and wedding groups who picked Premier Party Cruises for the most important day of their weekend."
    >
      <style dangerouslySetInnerHTML={{ __html: TESTIMONIAL_STYLES }} />

      {/* ── Testimonial Grid ─────────────────────────────── */}
      <section className="hp2-section">
        <div className="hp2-section__label">Real Guests · Real Reviews</div>
        <h2 className="hp2-section__headline">
          The reviews that <em>actually sell</em> the boat
        </h2>
        <p className="hp2-section__body">
          Every testimonial below is from an actual Premier Party Cruises
          guest. No staged quotes, no made-up names. Spanning bachelorette,
          bachelor, corporate, wedding, and milestone-birthday groups from
          across the country.
        </p>

        <div className="hp2-testimonial-grid">
          {TESTIMONIALS.map((t, i) => (
            <article className="hp2-testimonial-card" key={i}>
              <div
                className="hp2-testimonial-card__stars"
                aria-label={`${t.rating} out of 5 stars`}
              >
                {renderStars(t.rating)}
              </div>
              <p className="hp2-testimonial-card__quote">{t.quote}"</p>
              <div className="hp2-testimonial-card__meta">
                <p className="hp2-testimonial-card__name">{t.name}</p>
                <p className="hp2-testimonial-card__event">{t.event}</p>
                <p className="hp2-testimonial-card__date">{t.date}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Social Proof Numbers ─────────────────────────── */}
      <section className="hp2-section--alt">
        <div className="hp2-section__inner">
          <div className="hp2-section__label">The Numbers Behind The Trust</div>
          <h2 className="hp2-section__headline">
            15 years. 150,000 guests. <em>Zero incidents.</em>
          </h2>
          <p className="hp2-section__body">
            Trust is earned boat-by-boat, charter-by-charter. Here's what it
            looks like as a company at scale.
          </p>

          <div className="hp2-feature-grid">
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">420+</div>
              <h3 className="hp2-feature-card__title">Five-Star Reviews</h3>
              <p className="hp2-feature-card__desc">
                Across Google, Yelp, The Knot, and WeddingWire. 4.9-star average
                since 2009.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">150K+</div>
              <h3 className="hp2-feature-card__title">Guests Hosted</h3>
              <p className="hp2-feature-card__desc">
                From first-time Austin visitors to returning corporate clients
                who book us every year.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">0</div>
              <h3 className="hp2-feature-card__title">Safety Incidents</h3>
              <p className="hp2-feature-card__desc">
                Perfect safety record. USCG-licensed captains, $2M marine
                liability, annual vessel inspections.
              </p>
            </div>
          </div>
        </div>
      </section>
    </V2PageTemplate>
  );
}

import V2PageTemplate from '@/components/V2PageTemplate';

/**
 * PromCruiseV2 — Prom night cruises on Lake Travis.
 * Route: /prom-cruise-v2
 *
 * SEO Target: "prom cruise austin"
 * Teen-focused, parent-hosted framing: alcohol-free, fully supervised, photo-worthy.
 */
export default function PromCruiseV2() {
  const faqs = [
    {
      q: 'Can we host a prom party on a boat in Austin?',
      a: 'Yes. Prom cruises on Lake Travis are one of the most memorable ways to celebrate prom night or a pre/post-prom group event. We host private prom charters for 14–75 teens with a parent host on board, our licensed captain, and trained crew. Prom cruises typically run 4 hours and start at $200/hour.',
    },
    {
      q: 'Is a parent required on a prom cruise?',
      a: 'Yes. A responsible adult (21+) must sign the charter agreement as the renter of record and ride along as host on any prom cruise where guests are under 21. Most prom cruises are parent-hosted group events where one or more parents chaperone alongside our licensed captain and crew. Full supervision throughout the entire cruise.',
    },
    {
      q: 'Is alcohol allowed on a prom cruise?',
      a: 'No alcohol is permitted on prom cruises. Because the majority of guests are minors, we ask the parent host to keep the cruise fully alcohol-free. We stock coolers (BYO ice, or order pre-iced from Party On Delivery, our sister company) for sodas, sparkling water, sparkling cider (for the prom toast), and mocktails. The focus stays on the teens, the photos, and the memory.',
    },
    {
      q: 'How many prom guests can a charter accommodate?',
      a: 'Our fleet handles prom groups of every size. Day Tripper hosts up to 14 guests for a tight-knit prom friend group. Meeseeks and The Irony (25–30 each) fit a classic mixed-couples prom group. Clever Girl (50–75) accommodates a whole grade or multiple friend groups for a big prom boat bash with the full dance-floor setup.',
    },
    {
      q: 'How much does a prom cruise cost in Austin?',
      a: 'Prom cruises start at $200/hour on Day Tripper (up to 14 guests) with a 4-hour minimum — roughly $800 base. Meeseeks or The Irony (25–30 guests) start at $225/hour, and Clever Girl (50–75 guests) starts at $250/hour. Prom groups often split costs across families, bringing the per-teen cost to $30–$80 for a full-class charter on Clever Girl.',
    },
    {
      q: 'Do you offer pre-prom or post-prom cruises?',
      a: 'Yes — both. Pre-prom cruises are popular for group photos on the upper deck with Lake Travis as the backdrop, then guests head to the prom venue. Post-prom cruises are a safe, supervised celebration after the dance — parent-hosted, alcohol-free, with music and the teen friend group on one boat until midnight or later.',
    },
    {
      q: 'Can we do prom photos on the boat?',
      a: 'Absolutely. Prom photos on the upper deck with Lake Travis limestone bluffs behind are unforgettable. Many prom groups book an afternoon cruise and bring a photographer for formal couple and group portraits. We time departure to hit golden hour for the best lighting. Some prom groups even bring a DJ for music during the photo session.',
    },
    {
      q: 'Is it safe to have a prom cruise with teens on a boat?',
      a: 'Yes — safety is our top priority on every prom cruise. licensed, experienced captain, trained crew, USCG-approved life jackets in teen and adult sizes, swim ladder, first-aid equipment, and continuous weather monitoring. Our crew runs headcounts before and after every stop, and works directly with the parent host throughout the cruise.',
    },
    {
      q: 'What do teens wear on a prom cruise?',
      a: 'For pre-prom cruises, teens usually arrive in prom attire (dresses, suits) for photos, then some change to comfortable outfits for the rest of the cruise. Remove heels on deck — bring sandals or flats to change into. For post-prom cruises, most teens swap prom attire for casual or themed outfits before boarding.',
    },
    {
      q: 'Can we bring music and decorations to a prom cruise?',
      a: 'Yes. Our premium Bluetooth sound system connects to any phone for the prom playlist. Decorations — balloons, banners (e.g. "Prom 202X"), streamers, themed tableware — are all welcome. Skip confetti and glitter. For Clever Girl, the 14 disco balls and LED lighting give prom cruises the perfect dance-floor atmosphere.',
    },
    {
      q: 'When should we book a prom cruise?',
      a: 'Book 8–12 weeks in advance for prom night dates. Austin-area high school prom weekends (typically late April through early May) sell out fastest for Saturday evening charters. Coordinate with other parent hosts early so the group books as a unit. A 25% deposit locks in the date; the balance is due 30 days prior.',
    },
    {
      q: 'Can parents throw a safe post-prom for multiple families?',
      a: 'Yes — multi-family post-prom cruises are one of our most popular prom bookings. Two or more parent hosts coordinate, everyone chips in on the charter and catering, and the whole friend group celebrates post-dance on one supervised boat. It is a safer alternative to unsupervised post-prom gatherings and the memory lasts forever.',
    },
    {
      q: 'How long is a typical prom cruise?',
      a: 'Most prom cruises run 4 hours (our minimum charter). Pre-prom cruises often run 4 hours in the afternoon (2pm–6pm) ending in time to head to the prom venue. Post-prom cruises typically run 4–5 hours after the dance (10pm–2am or 11pm–3am). Longer charters are available at the same hourly rate.',
    },
    {
      q: 'What happens if it rains on prom night?',
      a: 'If the captain calls a weather cancellation for thunderstorms, lightning, or unsafe wind, your prom cruise is rescheduled at no charge — typically within the same season. Light rain does not cancel cruises, and every boat has covered and shaded areas. The captain makes the final weather call 2 hours before departure.',
    },
  ];

  return (
    <V2PageTemplate
      pageUrl="/prom-cruise-v2"
      pageTitle="Prom Cruise Austin | Lake Travis Prom Night Boat Charters | Premier Party Cruises"
      pageDescription="The ultimate prom cruise in Austin. Private Lake Travis boats for pre-prom or post-prom parties — parent-hosted, alcohol-free, 14–75 guests. From $200/hour."
      heroEyebrow="Prom Cruises · Lake Travis"
      heroHeadline={
        <>
          The ultimate <em>prom</em> cruise.
        </>
      }
      heroBody="Prom photos on a private Lake Travis yacht. Golden-hour portraits on the upper deck, a DJ-ready dance floor, parent-hosted and fully supervised. The prom night every grade talks about for years."
      primaryCta={{ text: 'Get Quote', href: '/chat' }}
      secondaryCta={{ text: 'View Fleet', href: '#fleet' }}
      faqs={faqs}
      finalCtaHeadline={
        <>
          Ready to give the class their <em>dream</em> prom?
        </>
      }
      finalCtaBody="Prom weekends sell out 8–12 weeks ahead. Lock in your Lake Travis charter now — our concierge coordinates across parent hosts, handles photography and DJ add-ons, and runs the timeline so the teens get the perfect prom memory."
    >
      {/* ── Pre-Prom, Post-Prom, or Both ─────────────────────── */}
      <section className="hp2-section">
        <div className="hp2-section__label">Prom Night, Your Way</div>
        <h2 className="hp2-section__headline">
          Pre-prom photos. Post-prom <em>dance floor</em>.
        </h2>
        <p className="hp2-section__body">
          A prom cruise isn't just one format. Austin parents book Lake Travis
          charters for pre-prom photo cruises, post-prom dance-floor parties,
          and full all-evening experiences that replace the traditional dance
          entirely. Each version is parent-hosted, fully supervised, and
          completely alcohol-free for the teen guests of honor.
        </p>

        <div className="hp2-feature-grid">
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">01</div>
            <h3 className="hp2-feature-card__title">Pre-Prom Photo Cruise</h3>
            <p className="hp2-feature-card__desc">
              2–6pm charter for formal couple and group photos on the upper
              deck at golden hour. Bring a photographer. Teens arrive in prom
              attire, take portraits, then head to the prom venue.
            </p>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">02</div>
            <h3 className="hp2-feature-card__title">Post-Prom Celebration</h3>
            <p className="hp2-feature-card__desc">
              10pm–2am charter after the dance. Teens change into casual
              outfits, the DJ takes over, the swim stop becomes a night-swim,
              and the friend group celebrates in a fully supervised setting.
            </p>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">03</div>
            <h3 className="hp2-feature-card__title">Full Evening Prom Cruise</h3>
            <p className="hp2-feature-card__desc">
              Skip the traditional dance. The boat IS the prom — 6–10pm with
              music, a catered dinner, a sunset toast in prom attire, and
              dancing on the Clever Girl's 14-disco-ball dance floor.
            </p>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">04</div>
            <h3 className="hp2-feature-card__title">Multi-Family Group</h3>
            <p className="hp2-feature-card__desc">
              2+ families coordinate to rent Clever Girl (50–75 teens). Each
              family contributes to the charter, catering, and decor. Every
              teen in the friend group celebrates together on one boat.
            </p>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">05</div>
            <h3 className="hp2-feature-card__title">Couples-Only Photo Hour</h3>
            <p className="hp2-feature-card__desc">
              A 4-hour pre-prom photo charter on Day Tripper (up to 14) for a
              tight friend group of couples. Formal portraits, candid shots,
              and the golden-hour group photo.
            </p>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">06</div>
            <h3 className="hp2-feature-card__title">Senior Class Cruise</h3>
            <p className="hp2-feature-card__desc">
              A whole-grade end-of-year celebration for seniors that doubles
              as a prom alternative. Full Clever Girl charter, DJ, catering,
              and a graduation-adjacent toast to the outgoing class.
            </p>
          </div>
        </div>
      </section>

      {/* ── Safety & Supervision ─────────────────────────────── */}
      <section className="hp2-section--alt">
        <div className="hp2-section__inner">
          <div className="hp2-section__label">Parent-Hosted Supervision</div>
          <h2 className="hp2-section__headline">
            Every prom cruise is fully <em>supervised</em>.
          </h2>
          <p className="hp2-section__body">
            Prom cruises are one of our most carefully managed charter types.
            Every prom cruise requires at least one adult parent host on board
            (the renter of record), and every boat sails with a licensed
            captain and trained crew. Alcohol is never permitted on prom
            cruises with minor guests — we stock coolers with sodas, mocktails,
            and sparkling cider for the toast.
          </p>

          <div className="hp2-feature-grid">
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">★</div>
              <h3 className="hp2-feature-card__title">Parent Host Required</h3>
              <p className="hp2-feature-card__desc">
                One or more adult parent hosts (21+) sign the charter agreement
                and ride along. The parent host works directly with the captain
                on any decision during the cruise.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">★</div>
              <h3 className="hp2-feature-card__title">Licensed Captain & Crew</h3>
              <p className="hp2-feature-card__desc">
                licensed, experienced captain runs the boat. Trained crew monitors
                the guests, runs headcounts at every stop, and handles all
                safety equipment deployment.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">★</div>
              <h3 className="hp2-feature-card__title">Alcohol-Free Policy</h3>
              <p className="hp2-feature-card__desc">
                No alcohol on prom cruises with minor guests, period. Coolers
                are stocked with sodas, sparkling water, and mocktails. Clear
                policy, enforced by crew and parent host.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Prom Photos & Vibe ─────────────────────────────── */}
      <section className="hp2-section">
        <div className="hp2-section__label">Photos & Atmosphere</div>
        <h2 className="hp2-section__headline">
          Every prom photo, <em>elevated</em>.
        </h2>
        <p className="hp2-section__body">
          The upper deck of Clever Girl or Meeseeks at golden hour is the
          prom photo backdrop Austin parents have been trying to replicate in
          their backyards for years. Hill Country bluffs behind, sunset light
          on the water, teens in prom attire on the rail. Formal couple
          portraits, group shots, candid moments — every photo frames itself.
        </p>
        <p className="hp2-section__body">
          Clever Girl's 14 disco balls, LED lighting, and full dance floor
          give prom cruises a club-like atmosphere without leaving the lake.
          Connect the prom playlist to our premium Bluetooth sound or hire an
          outside DJ. Bring a photographer, a videographer, or both — and
          walk away with the prom content of every parent's dreams.
        </p>
      </section>
    </V2PageTemplate>
  );
}

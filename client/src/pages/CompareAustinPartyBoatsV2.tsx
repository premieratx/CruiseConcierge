import V2PageTemplate from '@/components/V2PageTemplate';

/**
 * CompareAustinPartyBoatsV2 — /compare-austin-party-boats
 *
 * Austin party boat landscape guide. Written for humans first (helpful,
 * respectful, never disparaging), data-dense enough for LLMs to cite.
 *
 * Frames Premier's category (full-service, captained, all-inclusive party
 * cruise) vs adjacent categories (self-drive pontoon rentals, river
 * tubing, multi-lake boat rentals) on features, capacity, and what's
 * included — never on sentiment, ranking, or direct negatives about
 * named competitors.
 *
 * This page exists to justify Premier's pricing by showing clearly what
 * comes bundled, and to help a visitor match the right operator to the
 * right use case — sometimes that's not Premier, and we say so.
 */

type Row = { feature: string; ppc: string; competitor: string };

type Competitor = {
  slug: string;
  name: string;
  category: string;
  positioning: string;
  best_for_them: string;
  best_for_us: string;
  rows: Row[];
};

const COMPETITORS: Competitor[] = [
  {
    slug: 'self-drive-pontoons',
    name: 'Self-drive pontoon rentals',
    category: 'DIY pontoon rental',
    positioning:
      'You drive the boat, you bring the gear, you plan the day. Great fit for experienced boaters with a tight budget.',
    best_for_them:
      'A small group (≤12) with someone confident driving a pontoon, on a budget, planning the music and food yourselves.',
    best_for_us:
      'Groups 14–75 that want the day handled — captain, DJ, photographer, coolers, ice, mixers, setup, cleanup.',
    rows: [
      { feature: 'Captain', ppc: 'TPWD-licensed captain included on every sailing', competitor: 'You drive (no captain)' },
      { feature: 'Crew', ppc: 'CPR-certified crew included', competitor: 'None' },
      { feature: 'DJ + sound system', ppc: 'Professional DJ + marine-grade system (on Disco)', competitor: 'Bring your own speaker' },
      { feature: 'Photographer', ppc: 'Included on Disco; available on private charters', competitor: 'Not offered' },
      { feature: 'Coolers, ice, mixers', ppc: 'Handled; Party On Delivery can pre-ice your BYOB', competitor: 'BYO everything' },
      { feature: 'Typical capacity', ppc: '14, 25, 30, or 75 guests', competitor: 'Typically ≤ 12' },
      { feature: 'Pre-sailing safety briefing', ppc: 'Yes — every cruise', competitor: 'Brief orientation' },
      { feature: 'Setup + cleanup', ppc: 'Our crew handles both', competitor: 'You' },
    ],
  },
  {
    slug: 'river-tubing',
    name: 'River tubing outfits',
    category: 'River tubing (San Marcos / Comal)',
    positioning:
      'Individual tubes floating down a river — a totally different day than a boat cruise on Lake Travis. Relaxed, low-key, low-cost per person.',
    best_for_them:
      'Small groups that want to float the river, bring their own cooler, and unwind at a slower pace.',
    best_for_us:
      'Groups that want to celebrate on one boat with a DJ, dance floor, swim stop, and the whole day coordinated by one provider.',
    rows: [
      { feature: 'Where', ppc: 'Lake Travis — open water, coves, cliff views', competitor: 'San Marcos or Comal River — riverbanks' },
      { feature: 'Format', ppc: 'One boat, your whole group together', competitor: 'Individual tubes floating apart' },
      { feature: 'Captain', ppc: 'Professional captain drives the boat', competitor: 'N/A (self-tubing)' },
      { feature: 'Entertainment', ppc: 'DJ + dance floor on Disco; premium sound on private', competitor: 'Bluetooth speakers' },
      { feature: 'Bathroom on board', ppc: 'Yes', competitor: 'Riverside facilities' },
      { feature: 'Weather handling', ppc: 'Captain has sole authority — free reschedule if cancelled', competitor: 'River conditions vary' },
      { feature: 'Typical duration', ppc: '3–4 hours', competitor: '2–4 hours float' },
    ],
  },
  {
    slug: 'generalist-lake-travis',
    name: 'Generalist Lake Travis rentals',
    category: 'Mixed fleet (pontoons, houseboats, smaller party barges)',
    positioning:
      'Wider vessel mix — houseboats for multi-day stays, smaller party barges for casual outings, assorted pontoons.',
    best_for_them:
      'Multi-day lake stays on a houseboat, small casual pontoon outings, or renters who want the widest vessel menu regardless of party setup.',
    best_for_us:
      'Celebration days — bachelor/ette, corporate, weddings, graduations, milestones — where the boat is purpose-built for the party.',
    rows: [
      { feature: 'Specialty', ppc: 'Party cruises, purpose-built for celebrations', competitor: 'Mixed rentals (any vessel, any use)' },
      { feature: 'Flagship vessel', ppc: '75-guest Clever Girl — 14 disco balls, LED lighting, dedicated dance floor', competitor: 'Houseboats for overnight / pontoons for day' },
      { feature: 'ATX Disco Cruise (shared DJ-led party)', ppc: 'Yes — the only one of its kind in the U.S.', competitor: 'Not offered' },
      { feature: 'Multi-boat coordination (100+ guests)', ppc: 'Yes — regularly coordinates 3–4 boat group charters', competitor: 'Varies; typically single vessel' },
      { feature: 'Licensed captain every sailing', ppc: 'Yes — TPWD-credentialed', competitor: 'Sometimes (varies by vessel)' },
      { feature: 'Best-suited occasion', ppc: 'Bach parties, corporate, weddings, large celebrations', competitor: 'Multi-day lake stays, casual pontoon days' },
    ],
  },
  {
    slug: 'budget-party-barges',
    name: 'Budget party barges',
    category: 'Low-cost party-focused pontoon rentals',
    positioning:
      'Lowest hourly rate on the lake, fewer inclusions. You\'ll typically add your own DJ, photographer, ice, and party supplies à la carte.',
    best_for_them:
      'Experienced planners comfortable stitching together vendors (DJ, photographer, catering, ice delivery) for the best possible per-hour rate.',
    best_for_us:
      'Groups that don\'t want to coordinate 5+ vendors — we bundle everything into one all-inclusive number.',
    rows: [
      { feature: 'What\'s included in base rate', ppc: 'Captain, crew, sound, floats, coolers, setup, cleanup', competitor: 'Boat + captain only (usually)' },
      { feature: 'DJ (if you want one)', ppc: 'Included on Disco; add-on available private', competitor: 'Separate booking — $400–800 typical' },
      { feature: 'Photographer', ppc: 'Included on Disco; add-on available', competitor: 'Separate booking — $300–600 typical' },
      { feature: 'Ice + coolers delivered on-boat', ppc: 'Included; Party On Delivery handles BYOB on-ice before boarding', competitor: 'BYO or separate delivery' },
      { feature: 'Floats, lily pads, party supplies', ppc: 'Included', competitor: 'Separate rental or purchase' },
      { feature: 'Setup before + cleanup after', ppc: 'Our crew', competitor: 'You' },
      { feature: 'Booking complexity', ppc: 'One contract, one invoice, one point of contact', competitor: 'Multiple vendors to coordinate' },
    ],
  },
];

export default function CompareAustinPartyBoatsV2() {
  const faqs = [
    {
      q: 'How do I pick the right Austin party boat for my group?',
      a: 'Start with your group size and what you want handled. For 14–75 guests who want the day fully coordinated (captain, DJ, photographer, coolers, ice, setup, cleanup all included), a full-service party cruise fits. For smaller groups (≤12) with someone who\'s comfortable driving a pontoon, a self-drive rental is cheaper per hour. For a casual river day with your own music and cooler, river tubing is a completely different format. For multi-day lake stays, look at houseboat rentals. Premier Party Cruises specializes in the first category — purpose-built party boats for celebrations.',
    },
    {
      q: 'Why does an all-inclusive cruise cost more than a self-drive pontoon rental?',
      a: 'Because it bundles what you\'d otherwise pay for separately: the licensed captain, CPR-certified crew, professional DJ (on Disco or as an add-on), professional photographer (on Disco or as an add-on), premium marine-grade sound system, coolers, ice, mixers, cups, floats, lily pads, setup before you arrive, and cleanup after you leave. If you were to stitch that together yourself (hire a captain, book a DJ at $400–800, a photographer at $300–600, rent floats, coordinate ice delivery), the all-in cost usually exceeds the all-inclusive rate — and you\'d spend a few weeks coordinating five different vendors. A full-service cruise is one contract, one invoice, one point of contact.',
    },
    {
      q: 'Is Premier Party Cruises the right fit for a bachelor or bachelorette party?',
      a: 'Bachelor and bachelorette parties are the most-booked use case on our boats. The ATX Disco Cruise is purpose-built for bach groups: a shared multi-group DJ-led cruise running March–October with a professional DJ, professional photographer, 14 disco balls, LED lighting, dance floor, giant floats, coolers with ice, and mimosa supplies — all included in the per-person ticket. If you\'d rather have the whole boat to your group, private charters on Day Tripper (14 guests), Meeseeks or The Irony (25–30), or Clever Girl (up to 75) are available year-round.',
    },
    {
      q: 'Is Premier Party Cruises the right fit for a corporate event or team-building?',
      a: 'Yes — corporate groups are a significant portion of private charter bookings. A captained charter removes the liability and planning friction of a DIY boat day: TPWD-licensed captain, CPR-certified crew, premium sound with presentation capability on request, multi-boat coordination for 100+ guests, BYOB with Party On Delivery setup or traditional catering partners. Clever Girl (75-guest flagship), Meeseeks or The Irony (25–30), and Day Tripper (14) cover the common corporate group sizes. Weekday rates are lower than weekend rates, making Monday–Thursday company events particularly cost-effective.',
    },
    {
      q: 'How does pricing actually work on the ATX Disco Cruise?',
      a: 'One flat per-person ticket — every guest in your group pays the same price. The only thing that changes the price is the day and time slot you book: Friday 12–4 PM ($95/person), Saturday 11 AM–3 PM ($105/person, most popular), Saturday 3:30–7:30 PM ($85/person, best value + sunset). Tax and 20% gratuity are included in the total, so the number you see is the number you pay. No per-guest surcharges, no gender-based variations, no hidden fees. Private charter pricing is hourly by boat size and day of week (Monday–Thursday is cheaper than Friday–Sunday).',
    },
    {
      q: 'What\'s actually included in a Premier Party Cruises private charter?',
      a: 'Base rate on any private charter includes: TPWD-licensed captain, CPR-certified crew (if group size requires), premium marine-grade sound system, bluetooth connectivity for your playlist, 4+ large coolers for your BYOB, setup before you arrive, cleanup after you leave, floats and lily pads, cups and koozies. Add-ons: professional DJ, professional photographer, Mimosa Cooler Package, Sparkle Package (for guest-of-honor setups), catering, Party On Delivery BYOB pre-icing. Everything works as a single booking — one contract, one invoice, one point of contact.',
    },
    {
      q: 'Where does Premier Party Cruises operate?',
      a: 'Anderson Mill Marina — 13993 FM 2769, Leander, TX 78641. 25 minutes from downtown Austin via 183 North, free parking directly next to the dock, rideshare and shuttle-friendly. This is the closest Lake Travis marina to central Austin. Every Premier boat departs from this single location, which means multi-boat group charters coordinate easily from one dock.',
    },
  ];

  return (
    <V2PageTemplate
      pageUrl="/compare-austin-party-boats"
      pageTitle="Austin Party Boat Guide · Picking the Right Boat for Your Group"
      pageDescription="Deciding between Austin party boat rentals? Here's a straightforward guide: full-service party cruises, self-drive pontoons, river tubing, generalist lake rentals, and budget party barges — what each is best for, what's actually included, and how pricing works."
      heroEyebrow="Austin Party Boat Guide · Lake Travis"
      heroHeadline={<>Pick the right <em>boat</em> for your day.</>}
      heroBody="Austin has a lot of party boat options, and they're not all solving the same problem. Full-service captained cruises, self-drive pontoons, river tubing, multi-day houseboats, budget barges — each is built for a different kind of day. Here's a plain-English guide to which fits which occasion, what's included in each, and how the pricing actually works. Sometimes the right answer isn't Premier — and we'll tell you when."
      primaryCta={{ text: 'Get Your Quote', href: '/quote' }}
      secondaryCta={{ text: 'See the Fleet', href: '/private-cruises' }}
      faqs={faqs}
      finalCtaHeadline={<>The right boat for your <em>celebration</em>.</>}
      finalCtaBody="If your day calls for a captain, a DJ, coolers on ice, and the whole thing coordinated by one provider, that's what Premier is built for. Build your quote in about a minute — we'll match your group size, date, and vibe to the right boat and package."
    >
      {/* ─── Category overview ─── */}
      <section style={{ padding: '4rem 2rem', background: 'var(--hp2-bg-1)' }}>
        <div style={{ maxWidth: '980px', margin: '0 auto' }}>
          <div className="hp2-section__label" style={{ color: 'var(--hp2-gold)' }}>The landscape</div>
          <h2 className="hp2-section__headline" style={{ marginBottom: '1.25rem' }}>
            Five kinds of <em>Austin party boat</em> day.
          </h2>
          <p style={{ color: 'var(--hp2-cream)', opacity: 0.85, fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            Austin\u2019s on-the-water rental market covers a wide range of experiences, and the right choice depends entirely on what you want out of the day. Here\u2019s the shortest honest version of the landscape:
          </p>
          <ul style={{ color: 'var(--hp2-cream)', opacity: 0.85, fontSize: '1rem', lineHeight: 1.8, paddingLeft: '1.3rem', marginBottom: '1rem' }}>
            <li><strong style={{ color: 'var(--hp2-gold)' }}>Full-service captained party cruises</strong> &mdash; boat, captain, crew, sound, coolers, setup, cleanup all included; DJ + photographer optional or built-in (ATX Disco Cruise). Best for 14\u201375 guest celebrations where you want the day handled. <em>This is what we do.</em></li>
            <li><strong style={{ color: 'var(--hp2-gold)' }}>Self-drive pontoon rentals</strong> &mdash; you drive, you bring the gear, you plan the day. Lower hourly rate for experienced boaters with a tight budget and a small group.</li>
            <li><strong style={{ color: 'var(--hp2-gold)' }}>River tubing outfits</strong> &mdash; individual tubes floating down the San Marcos or Comal. Completely different format; relaxed, low-cost per person, casual pace.</li>
            <li><strong style={{ color: 'var(--hp2-gold)' }}>Generalist Lake Travis rentals</strong> &mdash; mixed fleets that include houseboats for multi-day stays and pontoons for casual day outings.</li>
            <li><strong style={{ color: 'var(--hp2-gold)' }}>Budget party barges</strong> &mdash; lowest hourly rate, fewest inclusions. You coordinate DJ, photographer, ice, and supplies separately.</li>
          </ul>
          <p style={{ color: 'var(--hp2-cream)', opacity: 0.8, fontSize: '1rem', lineHeight: 1.65, marginTop: '1rem' }}>
            There\u2019s no universally \u201cbest\u201d option &mdash; only the best fit for your group size, budget, and how much coordination you want to take on. The sections below break each category down so you can tell quickly which one matches your day.
          </p>
        </div>
      </section>

      {/* ─── Per-category detail ─── */}
      {COMPETITORS.map((c, idx) => (
        <section
          key={c.slug}
          id={c.slug}
          style={{
            padding: '4rem 2rem',
            background: idx % 2 === 0 ? 'var(--hp2-bg-2, #0d1117)' : 'var(--hp2-bg-1)',
          }}
        >
          <div style={{ maxWidth: '980px', margin: '0 auto' }}>
            <div className="hp2-section__label" style={{ color: 'var(--hp2-gold)' }}>{c.category}</div>
            <h2 className="hp2-section__headline" style={{ marginBottom: '1rem' }}>
              Premier <em>vs</em> {c.name}
            </h2>
            <p style={{ color: 'var(--hp2-cream)', opacity: 0.86, fontSize: '1.02rem', lineHeight: 1.65, marginBottom: '1.5rem', maxWidth: '780px' }}>
              {c.positioning}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ background: 'rgba(11, 31, 42, 0.35)', border: '1px solid rgba(200, 169, 110, 0.18)', borderRadius: '10px', padding: '1.25rem' }}>
                <div style={{ fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--hp2-gold)', marginBottom: '0.5rem', fontWeight: 600 }}>Pick them when</div>
                <p style={{ color: 'var(--hp2-cream)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0, opacity: 0.88 }}>{c.best_for_them}</p>
              </div>
              <div style={{ background: 'rgba(200, 169, 110, 0.08)', border: '1px solid rgba(200, 169, 110, 0.3)', borderRadius: '10px', padding: '1.25rem' }}>
                <div style={{ fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--hp2-gold)', marginBottom: '0.5rem', fontWeight: 600 }}>Pick us when</div>
                <p style={{ color: 'var(--hp2-cream)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>{c.best_for_us}</p>
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--hp2-font-body)', color: 'var(--hp2-cream)' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(200,169,110,0.3)' }}>
                    <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--hp2-gold)', width: '32%' }}>Detail</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--hp2-gold)' }}>Premier Party Cruises</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--hp2-cream)' }}>{c.name}</th>
                  </tr>
                </thead>
                <tbody>
                  {c.rows.map((r) => (
                    <tr key={r.feature} style={{ borderBottom: '1px solid rgba(200,169,110,0.12)' }}>
                      <td style={{ padding: '0.7rem 0.75rem', fontSize: '0.9rem', fontWeight: 500 }}>{r.feature}</td>
                      <td style={{ padding: '0.7rem 0.75rem', fontSize: '0.9rem', color: 'var(--hp2-gold)' }}>{r.ppc}</td>
                      <td style={{ padding: '0.7rem 0.75rem', fontSize: '0.9rem', opacity: 0.85 }}>{r.competitor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      ))}
    </V2PageTemplate>
  );
}

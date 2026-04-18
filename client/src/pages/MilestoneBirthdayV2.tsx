import V2PageTemplate from '@/components/V2PageTemplate';

/**
 * MilestoneBirthdayV2 — 30th, 40th, 50th milestone birthday cruises.
 * Route: /milestone-birthday-v2
 *
 * SEO Target: "milestone birthday party austin"
 * Sophisticated framing: decades, legacy, the big ones worth celebrating.
 */
export default function MilestoneBirthdayV2() {
  const faqs = [
    {
      q: 'What is the best way to celebrate a 40th birthday in Austin?',
      a: 'A private Lake Travis boat charter is Austin\'s most popular 40th birthday venue. Unlike a restaurant or backyard party, a milestone cruise gives your group the whole boat for 4–6 hours — cocktails on the deck, a scenic swim stop, a sunset toast, and the kind of golden-hour group photo that ends up framed. Private charters for 14–75 guests start at $200/hour.',
    },
    {
      q: 'How much does a milestone birthday cruise cost?',
      a: 'Milestone birthday charters start at $200/hour on Day Tripper (up to 14 guests) with a 4-hour minimum, putting the base at around $800. Meeseeks or The Irony (25–30 guests) start at $225/hour, and Clever Girl (50–75 guests) starts at $250/hour. Most 30th–60th birthday groups spend $1,500–$3,200 all-in for a 4-hour charter including captain, tax, and gratuity.',
    },
    {
      q: 'Is a boat charter a good venue for a 50th birthday?',
      a: 'Yes — 50th birthday cruises are one of our most popular milestone events. The sophistication of a private yacht charter on Lake Travis pairs perfectly with a 50th: BYOB champagne and wine, catered appetizers, a sunset toast, and a scenic cove swim stop if the group is up for it. Many 50ths skip the DJ energy and go for an elevated cocktail-party vibe on the water.',
    },
    {
      q: 'Can we bring catering and a bar on a milestone birthday cruise?',
      a: 'Absolutely. All private charters are BYOB and BYOF — bring your own bar, your own caterer, or both. We coordinate delivery to the marina with local Austin caterers and liquor delivery partners so everything is waiting on the boat when you board. The Ultimate package includes a 6-foot food table, champagne flutes, plates, and dedicated event coordination.',
    },
    {
      q: 'What kind of music is best for a 30th or 40th birthday cruise?',
      a: 'Whatever the birthday person loves. Our premium Bluetooth sound system connects to any phone and plays Spotify, Apple Music, or a custom playlist. 30th groups often do a throwback 2000s/2010s mix. 40ths lean 90s hip-hop and rock. 50ths often go classic — Motown, disco, or a tasteful cocktail-jazz vibe for the cruise-out, then turn up for the swim stop.',
    },
    {
      q: 'Can we do a sunset milestone birthday cruise?',
      a: 'Yes — sunset cruises are the #1 pick for milestone birthdays. Texas Hill Country sunsets over Lake Travis are spectacular, with golden light bouncing off the limestone bluffs and the water going glassy. Evening charters typically depart 3–4 hours before sundown. Our concierge team picks the ideal departure time based on your date so you catch peak golden hour for the toast and photos.',
    },
    {
      q: 'How many guests can we host for a milestone birthday?',
      a: 'Our fleet handles milestone birthdays of every size. Day Tripper is perfect for an intimate 30th with 10–14 closest friends. Meeseeks and The Irony (25–30 each) are the classic milestone size. Clever Girl (50–75) handles the full friend group plus family for the big 40ths, 50ths, and 60ths. For 75+ guests, we coordinate multi-boat flotilla celebrations.',
    },
    {
      q: 'What should guests wear to a milestone birthday boat party?',
      a: 'Cocktail-casual works great — sundresses, linen shirts, nice shorts, boat shoes or sandals (no heels). Swimsuits underneath if you plan to swim. Many milestone groups do a dress code like "white and gold" or "all white" for the photos. Bring a light layer for the sunset portion — it can cool off on the water.',
    },
    {
      q: 'Can we bring a cake and decorations for a milestone birthday?',
      a: 'Yes, decorations and cake are welcome on all private charters. Balloons, banners (e.g. "FABULOUS at 40"), table decorations, themed signage, and custom party favors are all allowed. Skip confetti and glitter. Cakes travel best as sheet cakes. We can also coordinate with local Austin bakeries for milestone-themed cakes delivered right to the marina.',
    },
    {
      q: 'Can we host a surprise 40th or 50th birthday cruise?',
      a: 'We run surprise milestone parties regularly and love coordinating the reveal. A trusted friend or spouse books the charter, guests board early and set up decorations, and the birthday person is brought to Anderson Mill Marina under a pretense (a casual dinner, an anniversary dinner, etc.). The reveal on the dock or as they step on board is legendary. Our crew is experienced at keeping the secret.',
    },
    {
      q: 'How far in advance should we book a milestone birthday cruise?',
      a: 'Book 6–8 weeks in advance for weekend dates during peak season (April–September). Milestone 50ths, 60ths, and 70ths often book 2–3 months out because they are usually tied to a specific date. Weekday and off-peak dates (November–February) have more availability. A 25% deposit secures your date; balance is due 30 days prior to the cruise.',
    },
    {
      q: 'What happens if it rains on a milestone birthday cruise?',
      a: 'If the captain calls a weather cancellation for thunderstorms, lightning, or unsafe wind, we reschedule at no charge — typically within the same season. Light rain does not cancel cruises, and every boat has covered and shaded seating. The captain makes the final weather call 2 hours before departure so you have time to coordinate guests.',
    },
    {
      q: 'Can we add a photographer, DJ, or bartender to a milestone cruise?',
      a: 'Yes — outside vendors are welcome, and we also partner with preferred Austin pros. A professional photographer for golden-hour milestone portraits is the most requested add-on. Live acoustic musicians and DJs are popular for 40ths and 50ths. A dedicated bartender starts at $200. Coordination through our event team is complimentary.',
    },
    {
      q: 'Are milestone birthday cruises a good gift to plan for a parent turning 60 or 70?',
      a: 'Absolutely. A milestone birthday cruise as a surprise gift from adult children to a parent turning 60, 70, or 80 is one of the most meaningful celebrations we host. Multi-generational groups work beautifully on our boats — grandkids, adult kids, siblings, and friends all on one deck for a scenic sunset cruise with a sentimental toast.',
    },
  ];

  return (
    <V2PageTemplate
      pageUrl="/milestone-birthday-v2"
      pageTitle="Milestone Birthday Party Austin | 30th 40th 50th on Lake Travis | Premier Party Cruises"
      pageDescription="Celebrate a milestone birthday on Lake Travis. Private boat charters for 30th, 40th, 50th, 60th, 70th celebrations. Sunset cruises, catered, BYOB. From $200/hr for 14–75 guests."
      heroEyebrow="Milestone Birthdays · 30 · 40 · 50 · 60 · 70"
      heroHeadline={
        <>
          30th, 40th, 50th <em>celebrations</em>.
        </>
      }
      heroBody="The decades deserve more than a restaurant. Private Lake Travis charter, sunset toast, catered dinner, BYOB champagne — the milestone birthday your guest of honor has been hoping for."
      primaryCta={{ text: 'Get Quote', href: '/chat' }}
      secondaryCta={{ text: 'View Fleet', href: '#fleet' }}
      faqs={faqs}
      finalCtaHeadline={
        <>
          Ready to make this milestone <em>unforgettable</em>?
        </>
      }
      finalCtaBody="Milestone birthday dates book 6–8 weeks ahead during peak season. Call or book online to lock in your sunset slot — our concierge handles catering, photography, decorations, and the playlist so you just show up and celebrate."
    >
      {/* ── The Decades ─────────────────────────────────────── */}
      <section className="hp2-section">
        <div className="hp2-section__label">Every Decade, a Signature Celebration</div>
        <h2 className="hp2-section__headline">
          The birthdays <em>worth</em> a yacht.
        </h2>
        <p className="hp2-section__body">
          Some birthdays are just numbers. Others mark the chapters — thirty,
          forty, fifty, sixty, seventy. These are the birthdays where the group
          photo gets framed, the toast gets emotional, and everyone remembers
          exactly where they were when the clock turned. A private boat on
          Lake Travis is the venue that matches the moment.
        </p>
        <p className="hp2-section__body">
          We've hosted thousands of milestone birthdays since 2009 — from
          intimate dirty-thirties on Day Tripper to 75-guest seventieth
          birthday flotillas on Clever Girl. Every one is customized to the
          guest of honor: the playlist they grew up on, the cocktails they
          love, the group of people who matter most.
        </p>

        <div className="hp2-feature-grid">
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">30</div>
            <h3 className="hp2-feature-card__title">Dirty Thirty</h3>
            <p className="hp2-feature-card__desc">
              The big one. Throwback 2000s playlist, BYOB margaritas and White
              Claws, swim stop in a cove, sunset group photo. 30th birthday
              boat parties are our most-booked milestone.
            </p>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">40</div>
            <h3 className="hp2-feature-card__title">Fabulous at 40</h3>
            <p className="hp2-feature-card__desc">
              Elevated vibes. Catered appetizers, champagne toast, 90s hip-hop
              on the speakers, and a golden-hour photo op that beats any
              restaurant backdrop. Often a surprise from the spouse.
            </p>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">50</div>
            <h3 className="hp2-feature-card__title">The Big Five-O</h3>
            <p className="hp2-feature-card__desc">
              Sophisticated cocktail-party on the water. Wine, charcuterie,
              jazz playlist, a heartfelt toast on the upper deck. 50th
              birthdays are meaningful — we help you make them memorable.
            </p>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">60</div>
            <h3 className="hp2-feature-card__title">Sixty & Thriving</h3>
            <p className="hp2-feature-card__desc">
              Multi-generational celebrations with adult kids, grandkids, and
              longtime friends all on one deck. Sunset cruises with a family
              toast are the emotional highlight.
            </p>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">70</div>
            <h3 className="hp2-feature-card__title">Seventy & Beyond</h3>
            <p className="hp2-feature-card__desc">
              A legacy celebration. Comfortable seating, shaded areas, calm
              water, and a scenic cruise that gives the guest of honor a
              stunning backdrop for a milestone photo with every generation.
            </p>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">★</div>
            <h3 className="hp2-feature-card__title">Surprise Parties</h3>
            <p className="hp2-feature-card__desc">
              The "she has no idea" reveal is our specialty. Guests board
              early, decorations go up, and the birthday person arrives to
              a dock full of friends. Our crew helps you pull off the secret.
            </p>
          </div>
        </div>
      </section>

      {/* ── What Makes a Milestone Different ──────────────────── */}
      <section className="hp2-section--alt">
        <div className="hp2-section__inner">
          <div className="hp2-section__label">The Milestone Experience</div>
          <h2 className="hp2-section__headline">
            Elevated from the first <em>champagne</em> pour.
          </h2>
          <p className="hp2-section__body">
            Milestone birthday cruises get the full concierge treatment. Here's
            what sets them apart from a standard charter.
          </p>

          <div className="hp2-feature-grid">
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">01</div>
              <h3 className="hp2-feature-card__title">Catering Coordination</h3>
              <p className="hp2-feature-card__desc">
                We partner with Austin's top caterers — passed appetizers,
                charcuterie boards, taco bars, full seated dinners. Delivered
                to the marina or the boat and set up before guests arrive.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">02</div>
              <h3 className="hp2-feature-card__title">Sunset Timing</h3>
              <p className="hp2-feature-card__desc">
                Our team picks your departure time so you hit golden hour for
                the toast. Every season has a sweet spot, and we know it cold
                after 15+ years on Lake Travis.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">03</div>
              <h3 className="hp2-feature-card__title">Photography Partners</h3>
              <p className="hp2-feature-card__desc">
                Our preferred Austin photographers specialize in on-water
                milestone portraits — individual, couple, and group shots
                with the Hill Country as the backdrop.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Custom Touches ─────────────────────────────────── */}
      <section className="hp2-section">
        <div className="hp2-section__label">Personal Touches</div>
        <h2 className="hp2-section__headline">
          Every detail, <em>their</em> way.
        </h2>
        <p className="hp2-section__body">
          A milestone birthday is a once-a-decade moment. We treat it that way.
          Custom playlists built from the guest of honor's favorites. Themed
          decorations that match their aesthetic. Catering menus that hit their
          favorite cuisines. A slideshow on a portable screen for the toast.
          Whatever makes this birthday unmistakably theirs, we help coordinate.
        </p>
        <p className="hp2-section__body">
          The Ultimate package ($250–$350 flat per cruise) adds premium
          decorations, champagne flutes, plates, a 6-foot table for the
          catered food setup, and a dedicated event coordinator who runs the
          timeline so the host can actually enjoy the party.
        </p>
      </section>
    </V2PageTemplate>
  );
}

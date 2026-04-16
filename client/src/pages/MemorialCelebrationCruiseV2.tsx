import V2PageTemplate from '@/components/V2PageTemplate';

/**
 * MemorialCelebrationCruiseV2 — Memorial and celebration-of-life cruises.
 * Route: /memorial-celebration-cruise-v2
 * Target keyword: "memorial celebration cruise"
 *
 * Sensitive, thoughtful landing page for celebration-of-life gatherings,
 * memorial services, ash-scattering ceremonies, and remembrance cruises
 * on Lake Travis.
 */
export default function MemorialCelebrationCruiseV2() {
  const faqs = [
    {
      q: 'Can we hold an ash-scattering ceremony on the boat?',
      a: 'Yes, and we host these regularly. Texas and federal law permits ash scattering in Lake Travis (freshwater lake scatterings follow EPA and state guidelines). Our captains have performed hundreds of ash-scattering services and know the quiet coves that feel right for the moment. We coordinate with your officiant or family member leading the ceremony, stop the boat in a calm location, shut off the music, and give your family uninterrupted time to say what needs to be said. The crew maintains respectful distance throughout.',
    },
    {
      q: 'How do you handle the tone for a celebration of life?',
      a: 'We follow your lead entirely. Some families want a quiet, reverent cruise with soft music, memorial readings, and reflective conversation — that is exactly what our captain delivers. Other families want a true "celebration" of the person\'s life with favorite music, storytelling, laughter, a signature cocktail in their honor, and a toast. Most cruises blend both. Your booking concierge will ask detailed questions about the person you are honoring and how they would have wanted the day to feel — then we design the cruise around that.',
    },
    {
      q: 'Is this appropriate for intimate gatherings?',
      a: 'Very. Many of our memorial cruises are 10-20 close family and best friends — exactly the people who would have been at the bedside. Our Day Tripper boat is ideal for intimate remembrance cruises, and the quiet of open water creates a setting for conversation and eulogy that no funeral home can match. We also host larger celebration-of-life cruises of 40-75 guests when the person knew and loved a wide community.',
    },
    {
      q: 'Can we bring a photographer, musician, or officiant?',
      a: 'Yes to all three. Many families bring a photographer to document the scattering and the gathering — these photos become treasured keepsakes. Musicians (acoustic guitar, violin, vocalist) work beautifully on the main deck for a quiet set during the ceremony. Officiants, chaplains, or family members leading the service have a natural podium at the bow. Each of these counts toward your guest count but are welcomed warmly by our crew.',
    },
    {
      q: 'Can we display photos and memorabilia?',
      a: 'Absolutely. Families often create a small memorial table on the main deck with framed photos, the person\'s favorite objects (a hat, a fishing lure, a book), candles (battery-operated only — no open flames on the boat), and guestbook. Our crew helps you set up during boarding and secures everything for the cruise. Many guests spend time standing quietly at the memorial table throughout the cruise.',
    },
    {
      q: 'What about a toast, eulogy, or shared-memory time?',
      a: 'We build this into the cruise timeline however you want. A common flow: cruise to a quiet cove (30-45 min), anchor, captain cuts the engine and lowers music, one family member opens with a reading or prayer, guests take turns sharing memories and toasts (30-60 min), closing prayer or song, then a gentle cruise home while guests continue informal conversation. Our captain works with your lead family member to hit the cues smoothly.',
    },
    {
      q: 'Is the boat accessible for elderly or mobility-limited guests?',
      a: 'Yes. Every boat has flat dockside boarding with no stairs. Our larger vessels (Meeseeks, Irony, Clever Girl) have ADA-accessible restrooms, cushioned seating with backs and armrests, handrails throughout, and shaded lounges. Captains anchor in calm water for the full ceremony if mobility is a concern. If you let our booking team know in advance, we reserve shaded seating for specific guests and brief the crew to help them board first.',
    },
    {
      q: 'Can we have food and drinks appropriate for a memorial?',
      a: 'Yes. The boat is BYOB and BYO-food, so you choose exactly the right tone. Many memorial cruises feature the honoree\'s favorite foods — their signature dish, their favorite whiskey, the pie their kids grew up on. Light catering (charcuterie, tea sandwiches, cheese boards) is common for quieter services. We coordinate delivery through Party On Delivery so you walk on to a fully set boat without the host family lifting a finger.',
    },
    {
      q: 'How long should a memorial or celebration-of-life cruise be?',
      a: 'Three hours is typical for a memorial or ash-scattering service — enough time for a meaningful ceremony without emotional exhaustion. Four hours works well for a celebration-of-life gathering with food, extended sharing time, and informal mingling. We do not recommend going longer than four hours for this specific event type. Shorter is usually better when emotions are heavy.',
    },
    {
      q: 'Can immediate family board earlier for privacy?',
      a: 'Yes. We offer an extended boarding window for memorial cruises so immediate family can arrive 30-45 minutes early to set up the memorial table, have a private moment, and compose themselves before extended family and friends arrive. The crew gives the family full privacy during this time. Many families tell us this pre-boarding quiet was the most meaningful part of the day.',
    },
    {
      q: 'What happens if guests become emotional during the cruise?',
      a: 'This is normal and expected. Our crews are trained in respectful hospitality and know exactly how to give grieving guests space. We stock boxes of tissues, water, and light snacks on the main deck. If a guest needs a private moment, the covered cabin or upper deck offers quiet retreat. Our captain keeps the boat still and calm, and reads the room to adjust timing — sometimes we extend the quiet anchored time, sometimes we gently begin the return cruise when the family is ready.',
    },
    {
      q: 'Can we do a memorial in non-summer months?',
      a: 'Yes — fall and winter memorial cruises are actually among our most beautiful. October, November, and early December offer cool, clear Texas days, dramatic light, and fewer boats on the water. Our covered cabins on Irony and Clever Girl have climate control and seat 20-30 people comfortably in any weather. A winter-afternoon memorial cruise with soft light, quiet water, and a small gathered circle is one of the most powerful settings we offer.',
    },
    {
      q: 'How much does a memorial cruise cost?',
      a: 'Pricing runs $200-$500 per hour with a 3-hour minimum for memorial cruises (reduced from our standard 4-hour minimum in recognition of the occasion). For a typical 20-person celebration of life on our Meeseeks or Irony boat over 3 hours, total cost usually lands between $675 and $1,275 — roughly $35-$65 per guest. We treat memorial cruises with care: no pressure on add-ons, no upsells, and dedicated booking concierges who understand grief.',
    },
  ];

  return (
    <V2PageTemplate
      pageUrl="/memorial-celebration-cruise-v2"
      pageTitle="Memorial &amp; Celebration of Life Cruise | Lake Travis Austin"
      pageDescription="Celebration of life cruises on Lake Travis. Ash scattering, memorial services, and remembrance gatherings for 10-75 guests. Thoughtful, private, respectful."
      heroEyebrow="Celebration of Life · Lake Travis"
      heroHeadline={
        <>
          Celebrate a <em>life</em> on Lake Travis
        </>
      }
      heroBody="Private, thoughtful memorial and celebration-of-life cruises. Ash-scattering ceremonies, eulogy readings, shared stories — held in the calm and beauty of Lake Travis, led by captains who understand the moment."
      primaryCta={{ text: 'Get Quote', href: '/chat' }}
      secondaryCta={{ text: 'Speak To Concierge', href: 'tel:+15124885892' }}
      faqs={faqs}
      finalCtaHeadline={
        <>
          A setting worthy of <em>their memory</em>.
        </>
      }
      finalCtaBody="Our booking concierges have helped hundreds of families design meaningful celebration-of-life cruises. There is no pressure, no sales pitch — just a thoughtful conversation about what would honor your person best. Call or message when you are ready."
    >
      {/* ── Why Lake Travis for a Memorial ───────────────── */}
      <section className="hp2-section">
        <div className="hp2-section__label">Why Lake Travis · For This Moment</div>
        <h2 className="hp2-section__headline">
          A setting that <em>holds the weight</em>
        </h2>
        <p className="hp2-section__body">
          A funeral home is practical. A church is traditional. A lake is
          something else entirely — open water, stillness, sky. For a
          person who loved Texas, loved the outdoors, or simply loved
          being with their people, a Lake Travis cruise offers a setting
          that matches the weight of the occasion.
        </p>

        <div className="hp2-feature-grid">
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">01</div>
            <h3 className="hp2-feature-card__title">Stillness &amp; Space</h3>
            <p className="hp2-feature-card__desc">
              Lake Travis at anchor is quieter than any indoor venue. Open
              sky, calm water, and distance from everyday noise let your
              family breathe, grieve, and share without interruption.
            </p>
          </div>

          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">02</div>
            <h3 className="hp2-feature-card__title">Private &amp; Unhurried</h3>
            <p className="hp2-feature-card__desc">
              No next-service waiting for the room, no rental hour running
              out, no passerby traffic. The boat is yours for the full
              duration — as quiet or as celebratory as you need it to be.
            </p>
          </div>

          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">03</div>
            <h3 className="hp2-feature-card__title">A Captain Who Understands</h3>
            <p className="hp2-feature-card__desc">
              Our captains have led hundreds of memorial and ash-scattering
              services. They know when to speak, when to stay silent, and
              how to create the space your family needs.
            </p>
          </div>
        </div>
      </section>

      {/* ── A Thoughtful Service Flow ────────────────────── */}
      <section className="hp2-section--alt">
        <div className="hp2-section__inner">
          <div className="hp2-section__label">A Typical Service · 3 Hours</div>
          <h2 className="hp2-section__headline">
            A flow designed around <em>your family</em>
          </h2>
          <p className="hp2-section__body">
            Every memorial is different. What follows is not a rigid
            schedule — it is a gentle framework that most of our families
            adapt. Your booking concierge will build a timeline that fits
            your tradition, your person, and your family.
          </p>

          <div className="hp2-feature-grid">
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">−0:30</div>
              <h3 className="hp2-feature-card__title">Family Arrives Early</h3>
              <p className="hp2-feature-card__desc">
                Immediate family boards 30 minutes before guests. Memorial
                table is set with photos, candles, and keepsakes. Private
                time on deck before the larger group arrives.
              </p>
            </div>

            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">0:00</div>
              <h3 className="hp2-feature-card__title">Guests Board</h3>
              <p className="hp2-feature-card__desc">
                Extended family and friends arrive. Soft music plays. Light
                food and drink available. Guests pay respects at the
                memorial table and settle into cushioned seating.
              </p>
            </div>

            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">0:20</div>
              <h3 className="hp2-feature-card__title">Gentle Cruise Out</h3>
              <p className="hp2-feature-card__desc">
                Captain cruises slowly to a quiet cove — a place the
                honoree loved, or a spot chosen by the family. 20-30
                minutes of soft conversation and reflection.
              </p>
            </div>

            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">0:50</div>
              <h3 className="hp2-feature-card__title">Ceremony</h3>
              <p className="hp2-feature-card__desc">
                Captain cuts the engine. Music lowers. Officiant or family
                member opens the service. Readings, shared memories, and
                ash-scattering if planned. Uninterrupted and unhurried.
              </p>
            </div>

            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">1:45</div>
              <h3 className="hp2-feature-card__title">Stories &amp; Toasts</h3>
              <p className="hp2-feature-card__desc">
                The boat remains anchored. Guests share stories. A toast
                in the honoree's favorite drink. Laughter and tears both
                welcome. The crew stays out of the way.
              </p>
            </div>

            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">2:30</div>
              <h3 className="hp2-feature-card__title">Gentle Return</h3>
              <p className="hp2-feature-card__desc">
                Slow cruise back to the marina as the sun lowers. Guests
                mingle in small groups. Family stands together on the
                bow. A quiet, whole ending to the day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Group Sizes ──────────────────────────────────── */}
      <section className="hp2-section">
        <div className="hp2-section__label">Group Size · Service Planning</div>
        <h2 className="hp2-section__headline">
          From <em>intimate gatherings</em> to wider circles
        </h2>
        <p className="hp2-section__body">
          Our fleet accommodates both the tightest inner circle and the
          wider community who loved your person. All memorial cruises
          include a USCG-licensed captain, a briefed crew, and a 3-hour
          minimum (reduced from our standard 4-hour minimum).
        </p>

        <div className="hp2-feature-grid">
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">10–14</div>
            <h3 className="hp2-feature-card__title">Inner Circle</h3>
            <p className="hp2-feature-card__desc">
              Day Tripper · immediate family and closest friends. The
              people who would have been at the bedside. Quiet, intimate,
              and deeply personal. $200–$350/hr.
            </p>
          </div>

          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">20–30</div>
            <h3 className="hp2-feature-card__title">Extended Family</h3>
            <p className="hp2-feature-card__desc">
              Meeseeks or The Irony · family plus close friends and
              colleagues. A covered cabin for weather, shaded seating for
              elder guests. $225–$425/hr.
            </p>
          </div>

          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">40–75</div>
            <h3 className="hp2-feature-card__title">Wider Community</h3>
            <p className="hp2-feature-card__desc">
              Clever Girl · for a person who knew and loved a wide
              community. Full-day celebration of life with music, food,
              and storytelling. $250–$500/hr.
            </p>
          </div>
        </div>
      </section>
    </V2PageTemplate>
  );
}

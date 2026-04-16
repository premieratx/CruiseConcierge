import V2PageTemplate from '@/components/V2PageTemplate';

/**
 * GenderRevealCruiseV2 — Gender reveal cruises on Lake Travis.
 * Route: /gender-reveal-cruise-v2
 * Target keyword: "gender reveal cruise austin"
 *
 * Joyful, photo-forward landing page for boat-based gender reveals —
 * confetti cannons, pink/blue smoke, and a reveal moment against the
 * most Instagrammable backdrop in Austin.
 */
export default function GenderRevealCruiseV2() {
  const faqs = [
    {
      q: 'What reveal effects are allowed on the boat?',
      a: 'We welcome biodegradable confetti cannons, pink and blue smoke bombs (on-water only, crew-supervised), colored powder clouds, balloon-pop reveals, smoke sticks, colored-ribbon releases, and cake-cut reveals. We do NOT allow fireworks, pyrotechnics, gender-reveal "explosives" of any kind, colored-water cannons that stain the boat, or anything that violates TPWD lake regulations. Our captain will coordinate the exact timing and location of your reveal so the photos are perfect and the cleanup is easy.',
    },
    {
      q: 'Where is the best moment on the cruise for the reveal?',
      a: 'The classic reveal moment is at the anchor spot in a scenic cove, about 45-60 minutes into the cruise. The captain positions the boat so the sun is behind the guests, the cliffs are in frame, and the water is calm. We coordinate with your photographer or videographer on exact timing — usually a 3-2-1 countdown, simultaneous cannon-fire or balloon-pop, and then 2-3 minutes of pure celebration. Sunset cruises produce the most dramatic reveal photos (golden hour backlight on pink or blue smoke).',
    },
    {
      q: 'Can we bring a photographer or videographer?',
      a: 'Yes, and we highly encourage it. A gender reveal is a once-in-a-lifetime moment and professional photos capture it in a way phones cannot. The photographer boards with the group (their seat counts toward your guest count). Our captains coordinate boat positioning with the photographer for perfect light and framing. Many Austin photographers now specialize in boat-based reveals — we can recommend shooters who know our fleet and Lake Travis coves.',
    },
    {
      q: 'How do you keep the gender secret from the parents?',
      a: 'Standard process: the parents\' OB or ultrasound tech seals the gender in an envelope. A trusted friend or family member (not one of the parents) takes the envelope to the cannon or cake vendor and orders the reveal item in the correct color. That person hands the prepared item to our captain at boarding. The captain stages it out of sight until the reveal moment. Parents never see, touch, or glimpse the color until it bursts.',
    },
    {
      q: 'Can we do the reveal with just immediate family, or a bigger party?',
      a: 'Both work beautifully. Intimate reveals (12-18 guests: parents, grandparents, siblings) are deeply emotional and photograph like a magazine editorial. Larger reveals (25-50 guests with extended family and friends) feel like a full celebration and produce high-energy group-cheer videos. Our Day Tripper handles the intimate configuration; Meeseeks, Irony, and Clever Girl handle the larger crowds up to 75 guests.',
    },
    {
      q: 'How long should a gender reveal cruise be?',
      a: 'Three to four hours is standard. The reveal moment itself takes about 10 minutes, but the surrounding time matters: 30 minutes to board and settle, 45-60 minutes to cruise out and let anticipation build, 10 minutes for the reveal, 60-90 minutes to celebrate with food, drinks, and photos at the anchor, then a cruise home. Shorter than 3 hours feels rushed; longer than 4 hours is rarely needed for this specific event.',
    },
    {
      q: 'What happens if the reveal is a surprise to the parents only?',
      a: 'This is the most popular configuration and we handle it all the time. Guests know the gender in advance (some hosts tell the whole guest list, some don\'t); only the expecting parents are surprised. The captain positions the parents at the front of the boat or on the top deck, guests gather behind with phones ready, and the cannon, balloon, or cake moment reveals to the parents simultaneously with the crowd cheer. Video of the parents\' reaction is the keepsake moment.',
    },
    {
      q: 'Can we do a cake-cut reveal instead of cannons?',
      a: 'Yes — cake-cut reveals are popular and photograph beautifully on the boat. Order a white-frosted cake with a pink or blue interior from any Austin bakery (Sugar Mama\'s, Skull &amp; Cakebones, and Jennifer Jane\'s all do beautiful work). The captain positions the boat at a scenic anchor, you cut the cake on the main deck, the camera catches the color reveal, and the celebration begins. Pair with a smoke cannon for a double-reveal effect if you want extra drama.',
    },
    {
      q: 'Is the boat safe for a pregnant guest of honor?',
      a: 'Yes. Our captains anchor in calm coves for the reveal portion, and the boat is essentially still during anchored time. Cushioned seating, private restrooms, and shaded lounges keep the mama-to-be comfortable. We do recommend consulting with an OB before any third-trimester water activity, and we stick to gentle cruising speeds throughout. Hundreds of pregnant guests of honor have done reveals on our boats with zero issue.',
    },
    {
      q: 'Can kids come to a gender reveal cruise?',
      a: 'Absolutely. Older siblings are often the ones pulling the confetti cannon cord — it makes for incredible sibling reveal photos. Kids under 12 are free on all private charters. We supply kid life vests in every size, and the captain picks a calm, shallow-cove anchor for family-friendly reveals. Many hosts specifically schedule morning cruises (11am boarding) to sync with kid energy and nap schedules.',
    },
    {
      q: 'How much does a gender reveal cruise cost?',
      a: 'Pricing runs $200-$500 per hour depending on boat and date, with a 4-hour minimum. For a typical 20-person reveal on Meeseeks or Irony, total cost runs $800-$1,700 — roughly $40-$85 per guest. The reveal items themselves (cannons, smoke, cake) typically add $75-$300 depending on how elaborate you go. For the photos and the memory, most couples tell us it was the best event-spend of their pregnancy.',
    },
    {
      q: 'What time of day gives the best reveal photos?',
      a: 'Golden hour — roughly 90 minutes before sunset — is hands-down the best light for gender reveal photos. The sun is low, the light is warm, pink and blue smoke pop dramatically against the sky, and Lake Travis cliffs glow in the background. Morning cruises (10am-12pm) are our next-best for photos with soft, even light. Mid-afternoon (1-3pm) is our least favorite for photos — harsh overhead sun, strong shadows, and washed-out smoke color.',
    },
  ];

  return (
    <V2PageTemplate
      pageUrl="/gender-reveal-cruise-v2"
      pageTitle="Gender Reveal Cruise Austin | Lake Travis Boat Gender Reveal"
      pageDescription="Austin gender reveals on Lake Travis. Private boat charters for 12-50 guests. Confetti cannons, pink/blue smoke, sunset reveals. Photo-worthy, unforgettable."
      heroEyebrow="Gender Reveals · Lake Travis · Austin"
      heroHeadline={
        <>
          Gender reveal on <em>Lake Travis</em>
        </>
      }
      heroBody="The most photogenic reveal venue in Austin. Confetti cannons, pink-or-blue smoke, sunset cliffs, and a 3-2-1 moment your parents will frame on the wall. Private charters for 12 to 75 guests."
      primaryCta={{ text: 'Get Quote', href: '/chat' }}
      secondaryCta={{ text: 'View Fleet', href: '/private-cruises' }}
      faqs={faqs}
      finalCtaHeadline={
        <>
          Pink or blue — the <em>best view</em> in Austin.
        </>
      }
      finalCtaBody="Tell us your headcount, reveal style, and ideal date. We'll coordinate timing, captain positioning, and photo framing so the moment lands perfectly the first time."
    >
      {/* ── Why a Boat for Gender Reveals ────────────────── */}
      <section className="hp2-section">
        <div className="hp2-section__label">Why Lake Travis · The Reveal Case</div>
        <h2 className="hp2-section__headline">
          Reveals that <em>actually look like the Pinterest board</em>
        </h2>
        <p className="hp2-section__body">
          A gender reveal in a suburban backyard gets one shot at a photo —
          and that photo has a grill and a fence in it. Lake Travis gives
          you limestone cliffs, golden-hour light, and open water in every
          frame. Your reveal becomes a keepsake, not a content compromise.
        </p>

        <div className="hp2-feature-grid">
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">01</div>
            <h3 className="hp2-feature-card__title">Cinematic Backdrop</h3>
            <p className="hp2-feature-card__desc">
              Lake Travis cliffs, deep-blue water, and sunset sky — already
              the most photographed backdrop in Central Texas. Your pink
              or blue smoke against that scenery photographs like film.
            </p>
          </div>

          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">02</div>
            <h3 className="hp2-feature-card__title">Captain-Timed Moment</h3>
            <p className="hp2-feature-card__desc">
              Our captain positions the boat so sun, wind, and framing all
              line up for the photographer. The 3-2-1 countdown lands
              perfectly the first time. No do-overs needed.
            </p>
          </div>

          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">03</div>
            <h3 className="hp2-feature-card__title">Safe &amp; Legal</h3>
            <p className="hp2-feature-card__desc">
              No wildfire risk, no HOA complaint, no "that thing they saw
              on the news." Biodegradable confetti, on-water smoke, crew
              supervision — safe, clean, and 100% within regulations.
            </p>
          </div>
        </div>
      </section>

      {/* ── Reveal Style Options ─────────────────────────── */}
      <section className="hp2-section--alt">
        <div className="hp2-section__inner">
          <div className="hp2-section__label">Reveal Styles · Pick Your Moment</div>
          <h2 className="hp2-section__headline">
            Six reveal styles we <em>love</em> on the boat
          </h2>
          <p className="hp2-section__body">
            Every reveal is different and every couple has a different
            vision. Our crew has executed hundreds of boat-based reveals —
            here are the styles that produce the best photos and the most
            emotional reactions.
          </p>

          <div className="hp2-feature-grid">
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">01</div>
              <h3 className="hp2-feature-card__title">Confetti Cannons</h3>
              <p className="hp2-feature-card__desc">
                Classic, loud, and photogenic. Two or four cannons fired
                simultaneously off the back deck. Biodegradable tissue
                confetti drifts over the water for 10+ seconds.
              </p>
            </div>

            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">02</div>
              <h3 className="hp2-feature-card__title">Pink or Blue Smoke</h3>
              <p className="hp2-feature-card__desc">
                The most dramatic reveal for photos and video. Smoke
                cannons release thick colored smoke for 30-45 seconds.
                Stunning against Lake Travis cliffs and golden-hour sky.
              </p>
            </div>

            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">03</div>
              <h3 className="hp2-feature-card__title">Cake Cut</h3>
              <p className="hp2-feature-card__desc">
                White-frosted cake with pink or blue interior. Parents cut
                together, camera catches the color. Elegant, edible, and
                pairs beautifully with a secondary smoke reveal.
              </p>
            </div>

            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">04</div>
              <h3 className="hp2-feature-card__title">Balloon Pop</h3>
              <p className="hp2-feature-card__desc">
                Oversized black balloon filled with pink or blue confetti.
                Parents pop together with a dart or pin. Emotional, simple,
                and the confetti cloud photographs beautifully.
              </p>
            </div>

            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">05</div>
              <h3 className="hp2-feature-card__title">Older-Sibling Reveal</h3>
              <p className="hp2-feature-card__desc">
                Big brother or big sister gets the honor — pulls the
                cannon cord, reveals the color, earns the bragging rights.
                The sibling-face reaction shot is everything.
              </p>
            </div>

            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">06</div>
              <h3 className="hp2-feature-card__title">Double Reveal</h3>
              <p className="hp2-feature-card__desc">
                Smoke cannon AND cake cut AND confetti — all synchronized
                for maximum drama. The captain counts down once; three
                effects fire simultaneously. Photographer heaven.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Boat Sizing ──────────────────────────────────── */}
      <section className="hp2-section">
        <div className="hp2-section__label">Group Size · Reveal Planning</div>
        <h2 className="hp2-section__headline">
          Right-sized for <em>your reveal</em>
        </h2>
        <p className="hp2-section__body">
          Reveals work beautifully at any size from 12 to 75. The key is
          matching boat to headcount so there's enough open deck for the
          reveal moment and the photo framing.
        </p>

        <div className="hp2-feature-grid">
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">12–14</div>
            <h3 className="hp2-feature-card__title">Intimate Reveal</h3>
            <p className="hp2-feature-card__desc">
              Day Tripper · immediate family only. Parents, grandparents,
              siblings. Emotional, editorial, and the most photographed
              configuration. $200–$350/hr.
            </p>
          </div>

          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">20–30</div>
            <h3 className="hp2-feature-card__title">Classic Reveal</h3>
            <p className="hp2-feature-card__desc">
              Meeseeks or The Irony · immediate and extended family plus
              close friends. The sweet-spot headcount for energy and
              intimacy. $225–$425/hr.
            </p>
          </div>

          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">40–75</div>
            <h3 className="hp2-feature-card__title">Big Reveal Party</h3>
            <p className="hp2-feature-card__desc">
              Clever Girl · full friend-group and extended-family reveal
              with DJ, full bar, and post-reveal dance floor. $250–$500/hr.
            </p>
          </div>
        </div>
      </section>
    </V2PageTemplate>
  );
}

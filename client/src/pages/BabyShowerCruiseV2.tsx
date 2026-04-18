import V2PageTemplate from '@/components/V2PageTemplate';

/**
 * BabyShowerCruiseV2 — Baby shower cruises on Lake Travis.
 * Route: /baby-shower-cruise-v2
 * Target keyword: "baby shower cruise austin"
 *
 * Luxury joyful landing page for baby showers on the water — a
 * fresh, Instagram-worthy alternative to the living-room shower.
 */
export default function BabyShowerCruiseV2() {
  const faqs = [
    {
      q: 'Is a boat safe and comfortable for a pregnant guest of honor?',
      a: 'Yes, and it is one of the most comfortable settings we host. Our captains anchor in calm coves so there is almost no boat motion during the shower portion, and we have cushioned seating with backs and armrests throughout. Many mama-to-be guests tell us the shaded lounge was more comfortable than their couch at home. We do recommend talking to your doctor first, and we avoid rougher open water for showers in the third trimester. Gentle, smooth, flat-water cruising is the default for every baby shower charter.',
    },
    {
      q: 'Can we customize the decor and theme?',
      a: 'Absolutely. Baby showers are one of our most decorated charter types. Guests bring everything from balloon arches, "oh baby" banners, floral garlands, diaper cakes, and photo backdrops to full thematic setups (gender-neutral boho, pink-and-gold, sailor/nautical, little pumpkin, safari, etc.). We ask that decor be tape- or clip-attached (no nails), but otherwise the boat is your canvas. Our crew will help you set up during your boarding window.',
    },
    {
      q: 'Do you accommodate dietary restrictions and allergies?',
      a: 'Yes. Baby showers frequently include pregnant guests of honor, lactose-free or gluten-free friends, kids with nut allergies, and non-drinking crowds. Since every cruise is BYOB and BYO-food, you control the menu completely. We coordinate through Party On Delivery for catered spreads that can accommodate dietary needs — vegan charcuterie, gluten-free pastries, nut-free kid menus, and halal or kosher options by request. Mocktail mixers and premium non-alcoholic sparklings are popular on baby shower cruises.',
    },
    {
      q: 'What are good non-alcoholic drink options for the mama-to-be?',
      a: 'Great mocktail options include sparkling grape juice, virgin mojitos with muddled mint and lime, cucumber-basil sparkling water, passion fruit Italian sodas, and craft non-alcoholic "mocktail kits" from Austin brands like Zilla and Lyre\'s. Many shower hosts create a mocktail bar with pre-mixed pitchers so the guest of honor has beautiful drinks that photograph just as well as the cocktails. BYOB means you control exactly what\'s on board — our crew can help set up a self-serve bar.',
    },
    {
      q: 'How long should a baby shower cruise run?',
      a: 'Three to four hours is the sweet spot. That gives you a 30-minute boarding and decor window, a gentle cruise to a calm cove, a 90-minute anchored shower with games, gifts, and food, and a scenic cruise back to dock. Three hours works well for smaller, intimate showers (12-15 guests); four hours is better for larger showers (20-35 guests) with more structured programming. The guest of honor rarely wants more than four hours — shorter is almost always better for a baby shower.',
    },
    {
      q: 'Can we do games, gifts, and shower activities on board?',
      a: 'Yes — we have hosted hundreds of showers with full programming. The boat anchors in a calm cove so the "stationary" shower portion feels exactly like being in a private living room, just with a lake view. Classic games like "guess the baby food," diaper raffle, onesie decorating, and advice-for-mama cards all work great on the main deck. Gifts can be opened on the cushioned seating, and our crew helps load them back to shore when you dock.',
    },
    {
      q: 'What group sizes do baby showers usually run?',
      a: 'Most baby showers run 15 to 30 guests, which is perfect for our mid-size boats (Meeseeks, The Irony). Smaller intimate showers of 8-14 work beautifully on Day Tripper. Larger extended-family showers of 35-50 fit well on Clever Girl. We do not recommend going over 50 for a shower — intimacy matters, and the guest of honor should be able to connect with every guest in one afternoon.',
    },
    {
      q: 'Can kids come to a baby shower cruise?',
      a: 'Yes. Many baby showers are mixed-age events with the mama-to-be\'s existing kids, nieces, nephews, and godchildren on board. Kids under 12 are free on all private charters. We supply kid life vests in every size, and the captain anchors in a shallow calm cove for the shower portion. Some hosts set up a separate "kid zone" with games, crafts, and coloring supplies while the adults do the main programming — the boat easily accommodates both.',
    },
    {
      q: 'What time of day is best for a baby shower?',
      a: 'Late morning through early afternoon is our most popular window — board at 11am, cruise and shower through 2-3pm, home by mid-afternoon. This avoids peak summer heat, works with nap schedules for guests with young kids, and gives the mama-to-be an evening to rest. Sunset showers (5-8pm) are also beautiful during the cooler months (October-April). Weekday late-morning cruises are our best-value slot and very popular with shower hosts.',
    },
    {
      q: 'How much does a baby shower cruise cost?',
      a: 'Pricing runs $200-$425 per hour depending on boat and date, with a 4-hour minimum. For a typical 20-person shower on our Meeseeks or Irony boat, total cost usually lands between $800 and $1,700 — roughly $40-$85 per guest. Since guests typically contribute to the shower anyway, many hosts organize a group gift model where each attendee chips in a set amount and the cruise becomes both the venue and the shared gift to the mama-to-be.',
    },
    {
      q: 'Will the boat motion bother the mama-to-be?',
      a: 'Not during the shower portion. Our captain cruises gently to the anchor spot (usually 20-30 minutes of smooth, slow movement), then anchors in a calm cove where the boat barely moves at all for the 2+ hours of your actual shower. Lake Travis is a protected reservoir, not an ocean — the water is typically glass-calm to lightly rippled. Pregnant guests of honor consistently report zero motion discomfort. If the guest of honor has severe motion sensitivity, we can stay at the marina dock for a dockside shower with no cruising at all.',
    },
    {
      q: 'Can we bring a cake, cupcakes, and breakable serveware?',
      a: 'Yes. Our main deck is flat and sheltered — cakes, cupcakes, glass serveware, and tiered dessert stands all travel well once anchored. During the initial cruise out we recommend keeping fragile items secured in a cooler or low-center-of-gravity spot. Once anchored, you can set up a full dessert table on the main deck. Many shower hosts coordinate cake delivery through Austin bakeries like Sugar Mama\'s or Skull &amp; Cakebones to arrive just before boarding.',
    },
    {
      q: 'Is there a bathroom on the boat?',
      a: 'Yes, every vessel has a clean, private indoor restroom — critical for a shower with a pregnant guest of honor. Our larger boats (Meeseeks, The Irony, Clever Girl) have ADA-accessible restrooms with plenty of room. Restrooms are stocked with soap, hand sanitizer, and paper products. We encourage hosts to bring a small basket of "shower essentials" (mints, hand lotion, hair ties) for the powder-room for a nice touch.',
    },
  ];

  return (
    <V2PageTemplate
      pageUrl="/baby-shower-cruise-v2"
      pageTitle="Baby Shower Cruise Austin | Lake Travis Private Boat Baby Showers"
      pageDescription="Austin baby showers on Lake Travis. Private charters for 12-40 guests. Gentle cruise, calm anchored showers, BYOB mocktail bar. Photo-worthy, mama-approved."
      heroEyebrow="Baby Showers · Lake Travis · Austin"
      heroHeadline={
        <>
          Baby showers on <em>the water</em>
        </>
      }
      heroBody="A fresh, photo-worthy alternative to the living-room shower. Gentle cruising, calm-cove anchoring, cushioned seating, and a mocktail bar — all on the most scenic venue in Austin."
      primaryCta={{ text: 'Get Quote', href: '/chat' }}
      secondaryCta={{ text: 'View Fleet', href: '#fleet' }}
      faqs={faqs}
      finalCtaHeadline={
        <>
          Give her a shower she'll <em>never forget</em>.
        </>
      }
      finalCtaBody="Tell us your guest count, ideal date, and any dietary or accessibility needs. Our booking concierges will tailor the perfect gentle-cruise shower — decor, mocktails, and all."
    >
      {/* ── Why Baby Showers on a Boat ───────────────────── */}
      <section className="hp2-section">
        <div className="hp2-section__label">Why Lake Travis · The Shower Case</div>
        <h2 className="hp2-section__headline">
          A shower she <em>actually gets to enjoy</em>
        </h2>
        <p className="hp2-section__body">
          Most baby showers land somewhere between "nice" and "exhausting" —
          a cramped living room, a restaurant back-room, or a backyard
          nobody can quite cool down. A Lake Travis charter turns the shower
          into the event of the season, and does it without the host lifting
          a finger.
        </p>

        <div className="hp2-feature-grid">
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">01</div>
            <h3 className="hp2-feature-card__title">Photos That Pop</h3>
            <p className="hp2-feature-card__desc">
              Lake Travis sunsets, cliff-lined coves, and a floating venue
              that photographs like a luxury magazine editorial. The guest
              of honor's feed has never looked better.
            </p>
          </div>

          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">02</div>
            <h3 className="hp2-feature-card__title">Gentle &amp; Comfortable</h3>
            <p className="hp2-feature-card__desc">
              Calm-cove anchoring, cushioned seating, private restrooms,
              shaded lounges, and a crew briefed to keep the mama-to-be
              rested, hydrated, and happy from minute one.
            </p>
          </div>

          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">03</div>
            <h3 className="hp2-feature-card__title">Zero Setup Stress</h3>
            <p className="hp2-feature-card__desc">
              No house to clean, no rental venue to coordinate, no parking
              puzzle for 25 guests. Board, decorate, shower, cruise home.
              The host actually gets to enjoy the shower.
            </p>
          </div>
        </div>
      </section>

      {/* ── The Shower Timeline ──────────────────────────── */}
      <section className="hp2-section--alt">
        <div className="hp2-section__inner">
          <div className="hp2-section__label">A Typical Shower · 4 Hours</div>
          <h2 className="hp2-section__headline">
            Designed around <em>her</em>, minute by minute
          </h2>
          <p className="hp2-section__body">
            Our captains have hosted hundreds of baby showers and know the
            rhythm that works. Here is what a classic 4-hour Lake Travis
            baby shower looks like — tailored, flexible, and yours to
            customize with your booking concierge.
          </p>

          <div className="hp2-feature-grid">
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">0:00</div>
              <h3 className="hp2-feature-card__title">Board &amp; Decorate</h3>
              <p className="hp2-feature-card__desc">
                Arrive 30 min early. Crew helps you carry decor, cake, and
                gifts. Balloon arches go up, backdrop gets styled, mocktail
                bar gets set. Guests board with mimosas-on-arrival.
              </p>
            </div>

            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">0:30</div>
              <h3 className="hp2-feature-card__title">Gentle Cruise Out</h3>
              <p className="hp2-feature-card__desc">
                Slow, smooth cruise past Mansfield Dam and the Lake Travis
                cliffs. Guest of honor takes photos with the backdrop. Music
                at conversation volume. Appetizers passed.
              </p>
            </div>

            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">1:00</div>
              <h3 className="hp2-feature-card__title">Anchor &amp; Shower</h3>
              <p className="hp2-feature-card__desc">
                Captain anchors in a quiet cove. Boat is essentially still.
                Games, gift-opening, advice-for-mama cards, and the main
                food service. 2+ hours of easy, comfortable programming.
              </p>
            </div>

            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">3:00</div>
              <h3 className="hp2-feature-card__title">Cake &amp; Toasts</h3>
              <p className="hp2-feature-card__desc">
                Cake is cut, toasts are made, mama-to-be speech if she
                wants. Group photo on the top deck with the lake behind.
                Gifts secured, decor packed by the crew.
              </p>
            </div>

            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">3:30</div>
              <h3 className="hp2-feature-card__title">Cruise Home</h3>
              <p className="hp2-feature-card__desc">
                Gentle cruise back to the marina. Guests relax, mingle,
                finish drinks. Mama-to-be puts her feet up. Everyone
                already texting the photos.
              </p>
            </div>

            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">4:00</div>
              <h3 className="hp2-feature-card__title">Dock &amp; Depart</h3>
              <p className="hp2-feature-card__desc">
                Crew helps carry gifts and leftover decor to cars. Mama
                heads home for a nap. Host goes home without having
                cleaned a single thing. Shower of the year, done.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Group Sizes ──────────────────────────────────── */}
      <section className="hp2-section">
        <div className="hp2-section__label">Group Size · Shower Planning</div>
        <h2 className="hp2-section__headline">
          Right-sized boats for <em>intimate showers</em>
        </h2>
        <p className="hp2-section__body">
          Baby showers feel best when the guest of honor can connect with
          every guest in one afternoon. We recommend 12 to 40 guests — our
          fleet has the perfect vessel for each band.
        </p>

        <div className="hp2-feature-grid">
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">12–14</div>
            <h3 className="hp2-feature-card__title">Intimate Shower</h3>
            <p className="hp2-feature-card__desc">
              Day Tripper · close friends, sisters, and best girlfriends.
              Budget-friendly and cozy. $200–$350/hr, 4-hour minimum.
            </p>
          </div>

          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">20–30</div>
            <h3 className="hp2-feature-card__title">Classic Shower</h3>
            <p className="hp2-feature-card__desc">
              Meeseeks or The Irony · the sweet-spot headcount with room
              for friends and family both. $225–$425/hr, 4-hour minimum.
            </p>
          </div>

          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">35–50</div>
            <h3 className="hp2-feature-card__title">Extended Shower</h3>
            <p className="hp2-feature-card__desc">
              Clever Girl · full extended-family showers with in-laws and
              out-of-town guests. $250–$500/hr, multiple shade zones.
            </p>
          </div>
        </div>
      </section>
    </V2PageTemplate>
  );
}

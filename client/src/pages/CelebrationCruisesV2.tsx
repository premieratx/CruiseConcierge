import V2PageTemplate from '@/components/V2PageTemplate';

/**
 * CelebrationCruisesV2 — Versatile celebration-cruise landing page.
 * Route: /celebration-cruises-v2
 * Target keyword: "celebration cruises austin"
 *
 * A catch-all luxury landing page for any celebration that does not
 * fit one of our specific templates — engagements, promotions,
 * graduations, retirements, anniversaries, new-home, new-baby, and
 * every other reason to gather people on Lake Travis.
 */
export default function CelebrationCruisesV2() {
  const faqs = [
    {
      q: 'What occasions do you host celebration cruises for?',
      a: 'Everything. The most common are engagements, promotions and new jobs, graduations (high school, college, med/law school, PhD), retirements, milestone birthdays (30/40/50/60/70+), wedding anniversaries, housewarmings, divorce celebrations, pregnancy announcements, "beating cancer" parties, friend-group reunions, book launches, album drops, and "just because we finally got everyone in the same city" gatherings. If it is worth celebrating, we have hosted it. Austin gives us an excuse-a-week and our crews love the variety.',
    },
    {
      q: 'Can you host multiple occasions at once?',
      a: 'Yes — combined celebrations are increasingly common and some of our favorite events. Recent examples: a joint 40th birthday plus "welcome to Austin" cruise, a graduation-plus-new-job combo, a retirement-plus-50th-anniversary cruise, and a friend-group engagement announcement doubling as a bachelorette send-off. We design the cruise to honor each occasion at different moments in the timeline — cake for one, toast for another, photo op for the third.',
    },
    {
      q: 'What is the ideal group size for a general celebration?',
      a: 'It depends on the occasion. Engagements and proposals: 2-8 guests (very intimate). Promotions and graduations: 15-30 guests. Milestone birthdays and retirements: 25-50 guests. Anniversaries: 20-40 guests. Friend-group reunions: 20-50 guests. Community-wide celebrations: 50-75 guests. Our fleet covers 14 to 75 guests on a single boat, or larger via multi-boat flotillas. Tell our booking concierge your guest list size and we will recommend the right vessel.',
    },
    {
      q: 'Can we do a surprise reveal or surprise celebration?',
      a: 'Absolutely — surprises are some of our most fun events. Classic configurations: the honoree thinks they are going to a small dinner, their partner brings them to the marina, they board expecting a casual cruise, and then 25 friends already on board yell "SURPRISE!" We coordinate timing with whoever is bringing the honoree so the reveal lands perfectly. We have also hosted surprise engagements where the proposer pre-stages the ring, the photographer, and the champagne — we handle the choreography so the moment is flawless.',
    },
    {
      q: 'What does a celebration cruise cost?',
      a: 'Pricing runs $200-$500 per hour depending on boat, date, and season, with a 4-hour minimum. For a typical 25-person celebration on Meeseeks or Irony, total cost runs $900-$1,700 — roughly $35-$70 per guest. Kids under 12 are free. BYOB means you control food and drink costs separately. Most celebration hosts tell us the boat itself costs meaningfully less than a restaurant private room with the same headcount, and delivers a dramatically more memorable night.',
    },
    {
      q: 'Can we customize the cruise to match the occasion?',
      a: 'Yes — and customization is where celebration cruises shine. You bring decor that fits the theme (balloon arches, banners, favorite-color accents), a playlist that fits the honoree, food that fits the occasion, and any surprise elements (slideshow on a projector, video messages from out-of-town friends, signature cocktail named after the honoree). Our crew helps set up during boarding and executes any timed moments (cake cut, toast, surprise reveal) exactly on your cue.',
    },
    {
      q: 'What is the best time of year for a celebration cruise?',
      a: 'Central Texas weather makes every month viable. March-May brings mild temperatures and wildflowers. June-August delivers classic Texas summer — hot during midday but gorgeous at sunset and on the water. September-November is our peak season for comfort (warm days, cool evenings, stunning light). December-February offers quieter water, dramatic skies, and heated cabins for cooler-weather cruising. Sunset departures (2 hours before sunset) produce the best photos in any month.',
    },
    {
      q: 'How far in advance should we book?',
      a: 'For peak weekends (April-October), book 6-8 weeks out. For shoulder-season weekends (November, March), 3-4 weeks is usually sufficient. Weekdays offer great availability and discounted pricing — often bookable 1-2 weeks out. Major holiday weekends (Memorial Day, July 4, Labor Day) fill up 2-3 months in advance. Last-minute inquiries are always worth a call to (512) 488-5892 — we frequently have availability that is not listed online.',
    },
    {
      q: 'Can we bring a DJ, band, or live music?',
      a: 'Yes. All our boats have premium Bluetooth sound systems that work for DJ setups, and we have a dedicated power setup for amplified equipment. Acoustic musicians (guitar, violin, vocalist) work beautifully on the main deck. DJs typically set up at the bar or on the top deck. Band space depends on size — contact us early if you are planning a 4+ piece band so we can confirm fit on your chosen vessel.',
    },
    {
      q: 'Are the boats BYOB?',
      a: 'Yes, every boat is BYOB and BYO-food. This is a huge cost advantage versus restaurants or hotel venues — you pay grocery/liquor-store prices instead of markup, and you bring exactly what your honoree loves. Our delivery partner Party On Delivery can stock the boat before boarding so you walk on to a fully-loaded bar and food spread. Popular celebration picks: champagne for engagements and promotions, signature cocktails for milestone birthdays, wine and charcuterie for anniversaries.',
    },
    {
      q: 'What about kids at a family celebration cruise?',
      a: 'Kids under 12 are free on all private charters. Family-friendly celebrations (housewarmings, graduations with younger siblings, milestone-birthday family reunions) work beautifully with kids on board. We supply kid life vests in every size. For kid-heavy cruises, we recommend morning departures (better for nap schedules) and anchoring in shallow calm coves where non-swimmers can stand comfortably.',
    },
    {
      q: 'Can the captain help with toasts, announcements, or ceremony moments?',
      a: 'Yes. Our captains gladly emcee toasts, announce surprise reveals, introduce speakers, cue music, and coordinate photography moments. They are experienced event hosts in addition to licensed boat operators. Let our booking team know your timeline and speaker list — the captain will have a full brief before you board and will execute the cues naturally throughout the cruise.',
    },
    {
      q: 'Can we combine a celebration cruise with dinner or after-party?',
      a: 'Absolutely. Common flow: 2pm boarding for a sunset cruise, off-boat by 6pm, dinner reservation at a downtown Austin restaurant at 7pm, after-party at a Rainey Street bar at 10pm. We can recommend restaurants (Uchi, Jeffrey\'s, Este, Hestia, Suerte are frequent post-cruise picks), coordinate rideshares back downtown, and time the cruise so your group boards the bar scene at peak energy. Many celebration groups tell us the cruise sets the mood for a dinner that runs twice as long as it would have otherwise.',
    },
    {
      q: 'What if something unexpected comes up and we need to reschedule?',
      a: 'Life happens. Our reschedule policy is flexible: you can move your date up to 14 days before the cruise with no fee. Weather-related reschedules (lightning, dangerous wind, flood advisory) are always no-fee and handled at the captain\'s discretion. For closer-in reschedules, we work case-by-case with our booking concierges to find a solution. We do not want you celebrating under a cloud of worry — reach out and we will make it work.',
    },
  ];

  return (
    <V2PageTemplate
      pageUrl="/celebration-cruises-v2"
      pageTitle="Celebration Cruises Austin | Lake Travis Private Party Boats"
      pageDescription="Celebration cruises on Lake Travis for every occasion — engagements, promotions, graduations, anniversaries, and milestones. Private charters for 14-75 guests. BYOB, 4.9 stars."
      heroEyebrow="Every Celebration · Lake Travis · Austin"
      heroHeadline={
        <>
          Every celebration, <em>one venue</em>
        </>
      }
      heroBody="Engagements, promotions, graduations, retirements, anniversaries, milestones — whatever you are celebrating, Lake Travis is the venue. Private charters for 14 to 75 guests, BYOB, and a crew trained to design the day around your honoree."
      primaryCta={{ text: 'Get Quote', href: '/chat' }}
      secondaryCta={{ text: 'View Fleet', href: '#fleet' }}
      faqs={faqs}
      finalCtaHeadline={
        <>
          Whatever it is, <em>celebrate it on the water</em>.
        </>
      }
      finalCtaBody="Tell us who you are honoring and what you are celebrating. Our booking concierges will design a cruise that fits the occasion, the guest list, and the personality of the person at the center of the day."
    >
      {/* ── Occasions We Host ────────────────────────────── */}
      <section className="hp2-section">
        <div className="hp2-section__label">What We Celebrate · Every Reason</div>
        <h2 className="hp2-section__headline">
          A venue for <em>every occasion worth gathering</em>
        </h2>
        <p className="hp2-section__body">
          Some celebrations have their own page on our site. Everything
          else lives here. Whatever you are marking — the end of a chapter
          or the start of one — Lake Travis gives it the setting it
          deserves.
        </p>

        <div className="hp2-feature-grid">
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">01</div>
            <h3 className="hp2-feature-card__title">Engagements &amp; Proposals</h3>
            <p className="hp2-feature-card__desc">
              Sunset proposal with the cliffs behind and a champagne toast
              on the top deck. Our captains have staged hundreds of
              proposals — the answer has always been yes.
            </p>
          </div>

          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">02</div>
            <h3 className="hp2-feature-card__title">Promotions &amp; New Jobs</h3>
            <p className="hp2-feature-card__desc">
              The "I got it" cruise. Friends, family, a bottle of
              champagne, and a Lake Travis sunset to mark the moment.
              Perfect for C-suite promos and startup-exit victories.
            </p>
          </div>

          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">03</div>
            <h3 className="hp2-feature-card__title">Graduations</h3>
            <p className="hp2-feature-card__desc">
              High school, college, med school, law school, PhD. Your
              grad deserves more than a backyard BBQ. Bring the family,
              bring the cap and gown, bring a keg.
            </p>
          </div>

          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">04</div>
            <h3 className="hp2-feature-card__title">Retirements</h3>
            <p className="hp2-feature-card__desc">
              40 years of work deserves more than a sheet cake in a
              conference room. Bring the spouse, the kids, the colleagues.
              Toast the career, launch the next chapter.
            </p>
          </div>

          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">05</div>
            <h3 className="hp2-feature-card__title">Anniversaries</h3>
            <p className="hp2-feature-card__desc">
              10th, 25th, 40th, 50th. An anniversary dinner is nice; an
              anniversary cruise with the whole family on deck toasting
              the couple is unforgettable.
            </p>
          </div>

          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">06</div>
            <h3 className="hp2-feature-card__title">Milestone Birthdays</h3>
            <p className="hp2-feature-card__desc">
              30, 40, 50, 60, 70, 80. Every big-number birthday deserves
              a venue that matches the weight of the number. Lake Travis
              delivers every single time.
            </p>
          </div>
        </div>
      </section>

      {/* ── Why Celebrate on the Water ───────────────────── */}
      <section className="hp2-section--alt">
        <div className="hp2-section__inner">
          <div className="hp2-section__label">The Lake Travis Difference</div>
          <h2 className="hp2-section__headline">
            The one venue that <em>fits every reason to gather</em>
          </h2>
          <p className="hp2-section__body">
            Restaurants serve dinner. Bars serve drinks. Venues serve
            four walls. A Lake Travis charter serves the whole celebration
            — setting, programming, catering logistics, and a captain who
            treats your day like it matters. Because it does.
          </p>

          <div className="hp2-feature-grid">
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">01</div>
              <h3 className="hp2-feature-card__title">Built Around The Honoree</h3>
              <p className="hp2-feature-card__desc">
                Your booking concierge designs the cruise around the
                specific person at the center. Their music, their food,
                their favorite cocktail, their story.
              </p>
            </div>

            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">02</div>
              <h3 className="hp2-feature-card__title">One Shared Memory</h3>
              <p className="hp2-feature-card__desc">
                Not a photo of a restaurant table. A video of everyone on
                a boat, sunset behind them, cheering the honoree. The
                keepsake that gets framed.
              </p>
            </div>

            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">03</div>
              <h3 className="hp2-feature-card__title">Fits Any Tone</h3>
              <p className="hp2-feature-card__desc">
                High-energy dance-floor celebrations. Quiet intimate
                toasts. Family dinners with grandkids. Elegant
                anniversary evenings. The boat adapts — we set the tone.
              </p>
            </div>

            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">04</div>
              <h3 className="hp2-feature-card__title">Zero Venue Hassle</h3>
              <p className="hp2-feature-card__desc">
                No room rental, no minimum spend, no corkage fee, no
                "we close at 10." BYOB, BYO-food, your timeline. The
                boat is yours for the duration.
              </p>
            </div>

            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">05</div>
              <h3 className="hp2-feature-card__title">Weather-Proof Options</h3>
              <p className="hp2-feature-card__desc">
                Covered cabins on our larger boats handle heat, rain, or
                cool weather. Year-round celebrations — Central Texas
                weather almost never cancels a cruise.
              </p>
            </div>

            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">06</div>
              <h3 className="hp2-feature-card__title">Concierge Coordination</h3>
              <p className="hp2-feature-card__desc">
                Food delivery, transportation, surprise-reveal timing,
                photographer coordination, dietary accommodations — our
                concierges handle it so you just show up and celebrate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Boat Sizing ──────────────────────────────────── */}
      <section className="hp2-section">
        <div className="hp2-section__label">Group Size · Vessel Matching</div>
        <h2 className="hp2-section__headline">
          The right vessel for <em>your celebration</em>
        </h2>
        <p className="hp2-section__body">
          Four boats from 14 to 75 guests, each designed around a
          different celebration size. All include a licensed
          captain, trained crew, premium sound, water slide, and BYOB.
        </p>

        <div className="hp2-feature-grid">
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">2–14</div>
            <h3 className="hp2-feature-card__title">Intimate</h3>
            <p className="hp2-feature-card__desc">
              Day Tripper · proposals, anniversaries, small milestone
              birthdays. Budget-friendly and personal. $200–$350/hr,
              4-hour minimum.
            </p>
          </div>

          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">20–30</div>
            <h3 className="hp2-feature-card__title">Classic</h3>
            <p className="hp2-feature-card__desc">
              Meeseeks or The Irony · graduations, promotions,
              mid-sized milestones, friend-group reunions. The
              sweet-spot size. $225–$425/hr.
            </p>
          </div>

          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">40–75</div>
            <h3 className="hp2-feature-card__title">Grand Celebration</h3>
            <p className="hp2-feature-card__desc">
              Clever Girl · 50th anniversaries, retirement parties,
              big-birthday blowouts, full friend-group gatherings.
              Dance floor, DJ setup. $250–$500/hr.
            </p>
          </div>
        </div>
      </section>
    </V2PageTemplate>
  );
}

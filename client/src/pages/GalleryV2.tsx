import V2PageTemplate from '@/components/V2PageTemplate';

/**
 * GalleryV2 — Real guests, real parties. Photo-driven luxury gallery.
 * Route: /gallery-v2
 *
 * Large 4-column responsive photo grid using images from /attached_assets/.
 * Hover scale effect adds a premium feel; captions call out event types to
 * keep the gallery keyword-rich for AI extraction and search.
 */

const GALLERY_IMAGES: Array<{ src: string; alt: string; caption: string }> = [
  {
    src: '/attached_assets/disco_fun_1765193453547.jpg',
    alt: 'ATX Disco Cruise guests dancing under disco ball',
    caption: 'ATX Disco Cruise · Saturday Sunset',
  },
  {
    src: '/attached_assets/disco_fun2_1765193453547.jpg',
    alt: 'Disco cruise guests celebrating on Lake Travis',
    caption: 'Disco Night · Lake Travis',
  },
  {
    src: '/attached_assets/disco_fun3_1765193453547.jpg',
    alt: 'Disco party boat with lights and music',
    caption: 'Lights On · Disco Saturdays',
  },
  {
    src: '/attached_assets/disco_fun5_1765193453548.jpg',
    alt: 'Guests dancing on the ATX Disco Cruise',
    caption: 'Dance Floor · Sunset Sail',
  },
  {
    src: '/attached_assets/disco_fun6_1765193453548.jpg',
    alt: 'Disco cruise bachelorette group',
    caption: 'Bachelorette · ATX Disco Cruise',
  },
  {
    src: '/attached_assets/disco_fun7_1765193453548.jpg',
    alt: 'Disco cruise friends photo',
    caption: 'Crew Photo · Golden Hour',
  },
  {
    src: '/attached_assets/disco_fun9_1765193453548.jpg',
    alt: 'Disco party under the lake travis sky',
    caption: 'Open Air · Disco Cruise',
  },
  {
    src: '/attached_assets/clever girl-1 lake travis party boat rental_1763966476656.jpg',
    alt: 'Clever Girl 75-person party boat on Lake Travis',
    caption: 'Clever Girl · 75-Guest Charter',
  },
  {
    src: '/attached_assets/clever girl-10 austin bachelorette party_1763966476658.jpg',
    alt: 'Austin bachelorette party on Clever Girl',
    caption: 'Bachelorette · Clever Girl',
  },
  {
    src: '/attached_assets/clever girl-3 bachelorette party boat austin_1763966476657.jpg',
    alt: 'Bachelorette party boat group photo',
    caption: 'Bachelorette · Group Shot',
  },
  {
    src: '/attached_assets/clever-girl-5-dance-floor.jpg',
    alt: 'Clever Girl on-deck dance floor',
    caption: 'Dance Floor · On Deck',
  },
  {
    src: '/attached_assets/day tripper-2 party boat austin lake travis_1763968078449.jpg',
    alt: 'Day Tripper intimate party boat',
    caption: 'Day Tripper · 14-Guest Charter',
  },
  {
    src: '/attached_assets/day tripper-5 party barge lake travis_1763968078452.jpg',
    alt: 'Day Tripper party barge on Lake Travis',
    caption: 'Day Tripper · Party Barge',
  },
  {
    src: '/attached_assets/lake-travis-bachelor-party-scenic.jpg',
    alt: 'Bachelor party scenic Lake Travis view',
    caption: 'Bachelor Party · Scenic Cove',
  },
  {
    src: '/attached_assets/giant-unicorn-float.jpg',
    alt: 'Giant unicorn float on a Lake Travis cruise',
    caption: 'Floaties · Bachelorette Vibes',
  },
  {
    src: '/attached_assets/dancing-party-scene.jpg',
    alt: 'Guests dancing on board',
    caption: 'Dance Party · Prime Time',
  },
  {
    src: '/attached_assets/atx-disco-cruise-party.jpg',
    alt: 'ATX Disco Cruise celebration',
    caption: 'ATX Disco · Peak Moment',
  },
  {
    src: '/attached_assets/bachelor-party-group-guys.jpg',
    alt: 'Austin bachelor party group',
    caption: 'Bachelor Party · Austin, TX',
  },
];

const GALLERY_STYLES = `
.hp2-gallery {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-top: 3rem;
}
.hp2-gallery__item {
  position: relative;
  overflow: hidden;
  aspect-ratio: 1 / 1;
  background: var(--hp2-bg-card);
  border: 1px solid var(--hp2-border);
  cursor: pointer;
}
.hp2-gallery__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), filter 0.4s ease;
  filter: saturate(0.95);
}
.hp2-gallery__item:hover .hp2-gallery__img {
  transform: scale(1.08);
  filter: saturate(1.1);
}
.hp2-gallery__caption {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1.5rem 1rem 0.85rem;
  background: linear-gradient(180deg, transparent 0%, rgba(7,7,12,0.85) 70%, rgba(7,7,12,0.95) 100%);
  color: var(--hp2-cream);
  font-family: var(--hp2-font-body);
  font-size: 0.78rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 500;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.hp2-gallery__item:hover .hp2-gallery__caption {
  opacity: 1;
  transform: translateY(0);
}
@media (max-width: 1024px) {
  .hp2-gallery { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 768px) {
  .hp2-gallery { grid-template-columns: repeat(2, 1fr); gap: 0.5rem; }
  .hp2-gallery__caption { font-size: 0.68rem; padding: 1rem 0.65rem 0.6rem; }
}
`;

export default function GalleryV2() {
  const faqs = [
    {
      q: 'Can I see my own party photos?',
      a: 'Yes — after your cruise, we share a private Google Drive or Dropbox link with any photos or video clips our captain captured during your charter. Most groups receive their link within 48 hours. For guaranteed professional coverage, book our photographer add-on.',
    },
    {
      q: 'Do you include a photographer?',
      a: 'No, a professional photographer is not included by default, but we offer a vetted photographer add-on starting at $350 for a 2-hour session. Your captain will still snap casual photos throughout your cruise at no charge and share them after.',
    },
    {
      q: 'Can I share these photos?',
      a: 'Yes, all photos on this gallery page are released with guest permission and are free to share, repost, or tag. If you see yourself and would like a high-resolution copy, reach out at info@premierpartycruises.com and we will send the original file.',
    },
    {
      q: 'Are photos free?',
      a: 'Yes, casual captain-captured photos of your group are included at no charge on every Premier Party Cruises booking. Professional photography (two-hour shoot, edited gallery delivered in 5 days) is available as a paid add-on starting at $350.',
    },
  ];

  return (
    <V2PageTemplate
      pageUrl="/gallery-v2"
      pageTitle="Gallery | Real Lake Travis Party Boat Photos | Premier Party Cruises"
      pageDescription="Photos and videos from real Premier Party Cruises events on Lake Travis — bachelor parties, bachelorettes, corporate events, weddings, and more."
      heroEyebrow="On The Water · Real Guests · Real Parties"
      heroHeadline={
        <>
          Real parties. Real <em>memories</em>.
        </>
      }
      heroBody="Photos and videos from actual Premier Party Cruises events on Lake Travis. Bachelor parties, bachelorette parties, corporate events, weddings, and more."
      primaryCta={{ text: 'Book Your Party', href: '/book' }}
      secondaryCta={{ text: 'Get Quote', href: '/chat' }}
      faqs={faqs}
      finalCtaHeadline={
        <>
          Your turn for <em>this view</em>.
        </>
      }
      finalCtaBody="Every photo on this page started with a quote and a date. Book yours and we'll handle the rest — you just show up with your crew and press play."
    >
      <style dangerouslySetInnerHTML={{ __html: GALLERY_STYLES }} />

      <section className="hp2-section">
        <div className="hp2-section__label">Lake Travis · Since 2009</div>
        <h2 className="hp2-section__headline">
          150,000+ guests. <em>One unforgettable view.</em>
        </h2>
        <p className="hp2-section__body">
          Every photo below is from a real Premier Party Cruises charter. No
          stock images. No influencer shoots. Just bachelorette groups, bachelor
          parties, corporate teams, wedding guests, birthday crews, and
          long-weekend friends making memories on Lake Travis.
        </p>

        <div className="hp2-gallery">
          {GALLERY_IMAGES.map((img, i) => (
            <a key={i} href="/book" className="hp2-gallery__item" aria-label={img.alt}>
              <img
                src={img.src}
                alt={img.alt}
                className="hp2-gallery__img"
                loading={i < 4 ? 'eager' : 'lazy'}
              />
              <div className="hp2-gallery__caption">{img.caption}</div>
            </a>
          ))}
        </div>
      </section>

      <section className="hp2-section--alt">
        <div className="hp2-section__inner">
          <div className="hp2-section__label">What You're Looking At</div>
          <h2 className="hp2-section__headline">
            Every kind of <em>celebration</em>
          </h2>
          <p className="hp2-section__body">
            Our fleet has hosted bachelorette and bachelor parties, corporate
            retreats, destination weddings, baby showers, milestone birthdays,
            anniversary cruises, and client-entertainment outings. The common
            thread: no awkward silences, no bad photos, and a lot of stories
            that start with "remember that day on the lake…"
          </p>

          <div className="hp2-feature-grid">
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">◎</div>
              <h3 className="hp2-feature-card__title">Bachelorette Parties</h3>
              <p className="hp2-feature-card__desc">
                Sashes, floaties, matching swimsuits, and the best group photos
                you'll take all weekend. Our most-booked event type.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">★</div>
              <h3 className="hp2-feature-card__title">Bachelor Parties</h3>
              <p className="hp2-feature-card__desc">
                Cold beer, cornhole, cliff jumping at Devil's Cove, and a boat
                built for 14–75. Easy logistics, hard-to-top memories.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">✢</div>
              <h3 className="hp2-feature-card__title">Corporate &amp; Weddings</h3>
              <p className="hp2-feature-card__desc">
                Team outings, client entertainment, rehearsal dinners, and
                wedding-party sendoffs. W-9 and COI on request.
              </p>
            </div>
          </div>
        </div>
      </section>
    </V2PageTemplate>
  );
}

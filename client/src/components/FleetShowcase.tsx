/*
 * FleetShowcase — the four Premier Party Cruises boats rendered
 * side-by-side with photo, capacity, starting price, and a per-boat
 * "Get a Quote" button.
 *
 * Mounted at id="fleet" on every V2 page so the shared "View Fleet"
 * / "Explore Our Fleet" CTAs scroll to the same section instead of
 * routing off-page.
 */

import { useQuoteLightbox } from "./QuoteLightbox";
import PhotoGallery, { EMPTY_BOAT_PHOTOS, PEOPLE_PHOTOS, BOAT_TABS } from "./PhotoGallery";

type Boat = {
  name: string;
  capacity: string;
  hourly: string;
  image: string;
  blurb: string;
};

const BOATS: Boat[] = [
  {
    name: "Day Tripper",
    capacity: "Up to 14 guests",
    hourly: "From $200/hr",
    image: "/attached_assets/day-tripper-14-person-boat.webp",
    blurb: "Intimate charters, elopement celebrations, small birthdays.",
  },
  {
    name: "Meeseeks",
    capacity: "25–30 guests",
    hourly: "From $225/hr",
    image: "/attached_assets/meeseeks-25-person-boat.webp",
    blurb: "Mid-size bach parties, rehearsal dinners, milestone birthdays.",
  },
  {
    name: "The Irony",
    capacity: "25–30 guests",
    hourly: "From $225/hr",
    image: "/attached_assets/meeseeks-25-person-boat.webp",
    blurb: "Same size + price as Meeseeks — doubles your booking options.",
  },
  {
    name: "Clever Girl",
    capacity: "31–75 guests",
    hourly: "From $250/hr",
    image: "/attached_assets/clever-girl-50-person-boat.webp",
    blurb: "14 disco balls, dance floor, giant Texas flag. Flagship.",
  },
];

const STYLES = `
html { scroll-behavior: smooth; }
.fs-section {
  scroll-margin-top: 110px;  /* clear the fixed header when anchored to */
  padding: 4.5rem 2rem 4rem;
  background:
    radial-gradient(ellipse at 20% 0%, rgba(30,136,229,0.06) 0%, transparent 55%),
    radial-gradient(ellipse at 80% 100%, rgba(200,169,110,0.05) 0%, transparent 60%),
    var(--hp2-bg-1, #0F0F18);
  border-top: 1px solid var(--hp2-border, rgba(200,169,110,0.16));
  border-bottom: 1px solid var(--hp2-border, rgba(200,169,110,0.16));
}
.fs-intro {
  max-width: 820px;
  margin: 0 auto 2.5rem;
  text-align: center;
}
.fs-intro__eyebrow {
  font-size: 0.72rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--hp2-gold, #C8A96E);
  margin: 0 0 0.8rem;
}
.fs-intro__title {
  font-family: var(--hp2-font-display, 'Cormorant Garamond'), Georgia, serif;
  font-weight: 300;
  font-size: clamp(2rem, 3.2vw, 2.8rem);
  line-height: 1.1;
  color: var(--hp2-cream, #F0E6D0);
  margin: 0 0 0.8rem;
}
.fs-intro__title em { font-style: italic; color: var(--hp2-gold-light, #DFC08A); }
.fs-intro__sub {
  color: var(--hp2-cream-muted, #C8B898);
  font-size: 1.02rem;
  line-height: 1.65;
  margin: 0 auto;
  max-width: 620px;
}

.fs-grid {
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
}
@media (max-width: 1080px) {
  .fs-grid { grid-template-columns: repeat(2, 1fr); gap: 1.1rem; }
}
@media (max-width: 560px) {
  .fs-grid { grid-template-columns: 1fr; }
  .fs-section { padding: 3rem 1.1rem 2.5rem; }
}

.fs-card {
  background: var(--hp2-bg-card, #1A1A26);
  border: 1px solid var(--hp2-border, rgba(200,169,110,0.16));
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
}
.fs-card:hover {
  border-color: rgba(200,169,110,0.45);
  transform: translateY(-2px);
  box-shadow: 0 18px 40px rgba(0,0,0,0.45);
}
.fs-card__img {
  aspect-ratio: 4 / 3;
  width: 100%;
  object-fit: cover;
  display: block;
  border-bottom: 1px solid var(--hp2-border, rgba(200,169,110,0.18));
  background: #07070C;
}
.fs-card__body {
  padding: 1.1rem 1.2rem 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}
.fs-card__name {
  font-family: var(--hp2-font-display, 'Cormorant Garamond'), Georgia, serif;
  font-weight: 400;
  font-size: 1.45rem;
  color: var(--hp2-cream, #F0E6D0);
  margin: 0;
  line-height: 1.1;
}
.fs-card__cap {
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--hp2-gold, #C8A96E);
  margin: 0;
}
.fs-card__rate {
  font-family: var(--hp2-font-display, 'Cormorant Garamond'), Georgia, serif;
  font-size: 1.25rem;
  color: var(--hp2-cream, #F0E6D0);
  margin: 0;
}
.fs-card__blurb {
  font-size: 0.86rem;
  line-height: 1.55;
  color: var(--hp2-cream-muted, #C8B898);
  margin: 0.1rem 0 0.9rem;
  flex: 1;
}
.fs-card__cta {
  appearance: none;
  cursor: pointer;
  font-family: inherit;
  background: linear-gradient(135deg, var(--hp2-gold, #C8A96E) 0%, var(--hp2-gold-light, #DFC08A) 100%);
  color: #07070C;
  border: 1px solid var(--hp2-gold, #C8A96E);
  padding: 0.72rem 1rem;
  border-radius: 4px;
  font-size: 0.74rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 600;
  transition: box-shadow 0.2s, transform 0.15s;
  margin-top: auto;
  text-align: center;
}
.fs-card__cta:hover {
  box-shadow: 0 0 22px rgba(200,169,110,0.5);
  transform: translateY(-1px);
}

.fs-footnote {
  text-align: center;
  font-size: 0.78rem;
  color: var(--hp2-text-muted, #A89878);
  margin: 2rem auto 0;
  max-width: 720px;
  line-height: 1.65;
}
.fs-footnote a { color: var(--hp2-gold-light, #DFC08A); text-decoration: underline; text-decoration-color: rgba(200,169,110,0.35); text-underline-offset: 3px; }
.fs-footnote a:hover { color: var(--hp2-gold-pale, #EDD9AA); }
`;

export default function FleetShowcase() {
  const { openQuote } = useQuoteLightbox();

  return (
    <section id="fleet" className="fs-section" data-testid="fleet-showcase">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <div className="fs-intro">
        <p className="fs-intro__eyebrow">The Fleet · 4 Boats · 14 to 75 Guests</p>
        <h2 className="fs-intro__title">
          Four boats for every <em>celebration</em>.
        </h2>
        <p className="fs-intro__sub">
          Every charter includes a licensed, experienced captain, premium Bluetooth sound,
          coolers (BYO ice, or order pre-iced from Party On Delivery), and a 4-hour minimum.
          Starting prices — tap a boat to get an exact quote.
        </p>
      </div>

      <div className="fs-grid">
        {BOATS.map((b) => (
          <article key={b.name} className="fs-card">
            <img
              src={b.image}
              alt={`${b.name} · ${b.capacity} · Lake Travis party boat`}
              className="fs-card__img"
              loading="lazy"
              width={800}
              height={600}
            />
            <div className="fs-card__body">
              <h3 className="fs-card__name">{b.name}</h3>
              <p className="fs-card__cap">{b.capacity}</p>
              <p className="fs-card__rate">{b.hourly}</p>
              <p className="fs-card__blurb">{b.blurb}</p>
              <button
                type="button"
                className="fs-card__cta"
                onClick={() => openQuote(`fleet_${b.name.toLowerCase().replace(/\s+/g, "_")}`)}
              >
                Get a Quote →
              </button>
            </div>
          </article>
        ))}
      </div>

      <p className="fs-footnote">
        All prices are starting rates for a 4-hour minimum charter. Weekend dates and peak
        seasons (April–October) run a modest premium. See the{" "}
        <a href="/pricing">full pricing calculator</a> for your exact estimate, or{" "}
        <a href="/chat">request a quote</a> for real-time availability.
      </p>

      {/* Empty boats — scrolling photo gallery with per-boat tabs */}
      <PhotoGallery
        photos={EMPTY_BOAT_PHOTOS}
        tabs={BOAT_TABS}
        defaultTabId="all"
        eyebrow="The Boats · Product Shots"
        title={<>Every angle of the <em>fleet</em></>}
        subtitle="Filter by boat to see the full walkthrough — capacity, deck layout, and interior of each charter."
      />

      {/* People having fun — same tabs, different photo set */}
      <PhotoGallery
        photos={PEOPLE_PHOTOS}
        tabs={BOAT_TABS}
        defaultTabId="all"
        eyebrow="Real Guests · Real Moments"
        title={<>Lake Travis, on your <em>best</em> day</>}
        subtitle="150,000+ guests since 2009. Filter by boat to see how each one comes alive on the water."
      />
    </section>
  );
}

/*
 * PhotoGallery — reusable scrolling photo carousel with tabs.
 *
 * Two canonical uses on this site:
 *   1. Fleet "empty boats" gallery — tabs: All / Day Tripper / Meeseeks / The Irony / Clever Girl
 *   2. Fleet "people having fun" gallery — same tabs, different photo set
 *   3. Gallery page — two top-level tabs: Private Parties / ATX Disco Cruise
 *
 * Implementation: horizontal CSS scroll-snap container. Arrow buttons
 * call container.scrollBy(). Lazy image loading.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type Photo = {
  src: string;
  alt: string;
  /** Optional tag used to filter into tabs. */
  boat?: "day-tripper" | "meeseeks" | "irony" | "clever-girl";
  /** Optional category (e.g. 'private-parties', 'atx-disco'). */
  category?: string;
};

export type GalleryTab = {
  id: string;
  label: string;
  /** When undefined, shows all photos. Otherwise filters by predicate. */
  filter?: (p: Photo) => boolean;
};

type Props = {
  photos: Photo[];
  tabs?: GalleryTab[];
  defaultTabId?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  subtitle?: string;
  aspectRatio?: string;
  /** Minimum photo width in px (wider = fewer photos visible at once). */
  minPhotoWidth?: number;
};

const STYLES = `
.pg-section { padding: 3.5rem 0 2.5rem; }
.pg-intro {
  max-width: 820px;
  margin: 0 auto 1.5rem;
  text-align: center;
  padding: 0 2rem;
}
.pg-intro__eyebrow {
  font-size: 0.72rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--hp2-gold, #C8A96E);
  margin: 0 0 0.75rem;
}
.pg-intro__title {
  font-family: var(--hp2-font-display, 'Cormorant Garamond'), Georgia, serif;
  font-weight: 300;
  font-size: clamp(1.6rem, 2.6vw, 2.25rem);
  line-height: 1.15;
  color: var(--hp2-cream, #F0E6D0);
  margin: 0 0 0.6rem;
}
.pg-intro__title em { font-style: italic; color: var(--hp2-gold-light, #DFC08A); }
.pg-intro__sub {
  color: var(--hp2-cream-muted, #C8B898);
  font-size: 0.96rem;
  line-height: 1.6;
  margin: 0;
}
.pg-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  justify-content: center;
  padding: 0 1rem;
  margin-bottom: 1.25rem;
}
.pg-tab {
  appearance: none;
  cursor: pointer;
  font-family: inherit;
  background: transparent;
  border: 1px solid rgba(200,169,110,0.25);
  color: var(--hp2-cream-muted, #C8B898);
  padding: 0.5rem 1rem;
  border-radius: 999px;
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 500;
  transition: color 0.2s, border-color 0.2s, background 0.2s;
}
.pg-tab:hover {
  color: var(--hp2-cream, #F0E6D0);
  border-color: rgba(200,169,110,0.5);
}
.pg-tab.is-active {
  background: linear-gradient(135deg, rgba(200,169,110,0.22) 0%, rgba(200,169,110,0.06) 100%);
  color: var(--hp2-cream, #F0E6D0);
  border-color: var(--hp2-gold, #C8A96E);
}
.pg-wrap {
  position: relative;
  max-width: 1400px;
  margin: 0 auto;
}
.pg-track {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: var(--pg-col, 300px);
  gap: 1rem;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  padding: 0.5rem 2rem 1.5rem;
  scrollbar-width: thin;
  scrollbar-color: rgba(200,169,110,0.3) transparent;
}
.pg-track::-webkit-scrollbar { height: 6px; }
.pg-track::-webkit-scrollbar-track { background: transparent; }
.pg-track::-webkit-scrollbar-thumb { background: rgba(200,169,110,0.3); border-radius: 3px; }
.pg-track::-webkit-scrollbar-thumb:hover { background: rgba(200,169,110,0.55); }
.pg-slide {
  scroll-snap-align: start;
  aspect-ratio: var(--pg-aspect, 4 / 3);
  overflow: hidden;
  border-radius: 8px;
  border: 1px solid var(--hp2-border, rgba(200,169,110,0.16));
  background: #07070C;
  transition: border-color 0.2s, transform 0.25s;
  margin: 0;
}
.pg-slide:hover {
  border-color: rgba(200,169,110,0.45);
  transform: translateY(-2px);
}
.pg-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 7px;
  transition: transform 0.4s ease;
}
.pg-slide:hover img { transform: scale(1.04); }
.pg-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: rgba(7,7,12,0.72);
  border: 1px solid rgba(200,169,110,0.35);
  color: var(--hp2-cream, #F0E6D0);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  transition: background 0.2s, border-color 0.2s, opacity 0.2s;
}
.pg-nav:hover {
  background: rgba(200,169,110,0.18);
  border-color: var(--hp2-gold, #C8A96E);
}
.pg-nav--prev { left: 0.5rem; }
.pg-nav--next { right: 0.5rem; }
.pg-nav:disabled { opacity: 0; pointer-events: none; }
@media (max-width: 640px) {
  .pg-section { padding: 2.5rem 0 2rem; }
  .pg-intro { padding: 0 1rem; }
  .pg-track { padding: 0.5rem 1rem 1.25rem; gap: 0.75rem; }
  .pg-nav { width: 34px; height: 34px; }
}
`;

export default function PhotoGallery({
  photos,
  tabs,
  defaultTabId,
  eyebrow,
  title,
  subtitle,
  aspectRatio = "4 / 3",
  minPhotoWidth = 300,
}: Props) {
  const [activeTabId, setActiveTabId] = useState<string>(
    defaultTabId ?? tabs?.[0]?.id ?? "all",
  );
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const visible = useMemo(() => {
    if (!tabs || tabs.length === 0) return photos;
    const active = tabs.find((t) => t.id === activeTabId);
    if (!active?.filter) return photos;
    return photos.filter(active.filter);
  }, [photos, tabs, activeTabId]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      setCanScrollPrev(track.scrollLeft > 4);
      setCanScrollNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 4);
    };
    update();
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      track.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [visible]);

  const scrollBy = (dir: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const step = Math.round(track.clientWidth * 0.85);
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section className="pg-section" data-testid="photo-gallery">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {(eyebrow || title || subtitle) && (
        <div className="pg-intro">
          {eyebrow && <p className="pg-intro__eyebrow">{eyebrow}</p>}
          {title && <h3 className="pg-intro__title">{title}</h3>}
          {subtitle && <p className="pg-intro__sub">{subtitle}</p>}
        </div>
      )}

      {tabs && tabs.length > 0 && (
        <div className="pg-tabs" role="tablist" aria-label="Gallery filter">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={t.id === activeTabId}
              onClick={() => setActiveTabId(t.id)}
              className={`pg-tab ${t.id === activeTabId ? "is-active" : ""}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      )}

      <div className="pg-wrap">
        <button
          type="button"
          className="pg-nav pg-nav--prev"
          onClick={() => scrollBy(-1)}
          disabled={!canScrollPrev}
          aria-label="Previous photos"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          className="pg-nav pg-nav--next"
          onClick={() => scrollBy(1)}
          disabled={!canScrollNext}
          aria-label="Next photos"
        >
          <ChevronRight size={18} />
        </button>

        <div
          ref={trackRef}
          className="pg-track"
          style={{
            ["--pg-col" as any]: `${minPhotoWidth}px`,
            ["--pg-aspect" as any]: aspectRatio,
          }}
        >
          {visible.map((p, i) => (
            <figure key={`${p.src}-${i}`} className="pg-slide">
              <img src={p.src} alt={p.alt} loading="lazy" width={600} height={450} />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Canonical photo sets for the site ────────────────────────────────────

export const EMPTY_BOAT_PHOTOS: Photo[] = [
  { src: "/attached_assets/day-tripper-14-person-boat.webp", alt: "Day Tripper party boat · 14 guests · Lake Travis", boat: "day-tripper" },
  { src: "/attached_assets/day tripper-1 party boat with captain austin_1763968078449.jpg", alt: "Day Tripper with captain · Lake Travis", boat: "day-tripper" },
  { src: "/attached_assets/day tripper-2 party boat austin lake travis_1763968078449.jpg", alt: "Day Tripper party boat Austin", boat: "day-tripper" },
  { src: "/attached_assets/day tripper-3 party boat austin_1763968078451.jpg", alt: "Day Tripper deck Lake Travis", boat: "day-tripper" },
  { src: "/attached_assets/day tripper-5 party barge lake travis_1763968078452.jpg", alt: "Day Tripper party barge Lake Travis", boat: "day-tripper" },
  { src: "/attached_assets/day tripper-6 party boat austin_1763968078452.jpg", alt: "Day Tripper boat in cove", boat: "day-tripper" },

  { src: "/attached_assets/meeseeks-25-person-boat.webp", alt: "Meeseeks 25-30 guest party boat · Lake Travis", boat: "meeseeks" },
  { src: "/attached_assets/meeseeks-1_1763968010088.jpg", alt: "Meeseeks at Anderson Mill Marina", boat: "meeseeks" },
  { src: "/attached_assets/meeseeks-2_1763968010089.jpg", alt: "Meeseeks boat on Lake Travis", boat: "meeseeks" },
  { src: "/attached_assets/meeseeks-3 lake travis party boat_1763968010089.jpg", alt: "Meeseeks party boat Lake Travis", boat: "meeseeks" },
  { src: "/attached_assets/meeseeks-4 austin party boat rental_1763968010090.jpg", alt: "Meeseeks rental Austin", boat: "meeseeks" },
  { src: "/attached_assets/meeseeks-5 austin party barge rental_1763968010090.jpg", alt: "Meeseeks party barge rental Austin", boat: "meeseeks" },

  { src: "/attached_assets/the irony-2 party boat rental austin_1763968010090.jpg", alt: "The Irony party boat rental Austin", boat: "irony" },
  { src: "/attached_assets/the irony -3 party boat rental austin_1763968010090.jpg", alt: "The Irony 25-30 guest boat Lake Travis", boat: "irony" },

  { src: "/attached_assets/clever-girl-50-person-boat.webp", alt: "Clever Girl flagship · 75 guests · Lake Travis", boat: "clever-girl" },
  { src: "/attached_assets/clever-girl-1-lake-travis-party-boat.jpg", alt: "Clever Girl at Lake Travis marina", boat: "clever-girl" },
  { src: "/attached_assets/clever-girl-2-party-boat-austin.jpg", alt: "Clever Girl deck · disco balls", boat: "clever-girl" },
  { src: "/attached_assets/clever-girl-3-bachelorette-boat.jpg", alt: "Clever Girl bachelorette setup", boat: "clever-girl" },
  { src: "/attached_assets/clever-girl-4-wedding-venue.jpg", alt: "Clever Girl wedding venue", boat: "clever-girl" },
  { src: "/attached_assets/clever-girl-5-dance-floor.jpg", alt: "Clever Girl dance floor with LED lighting", boat: "clever-girl" },
];

export const PEOPLE_PHOTOS: Photo[] = [
  { src: "/attached_assets/@capitalcityshots-1_1760080740012.jpg", alt: "Bachelorette group on Clever Girl", boat: "clever-girl", category: "private-parties" },
  { src: "/attached_assets/@capitalcityshots-2_1760080740017.jpg", alt: "Dance floor party on Clever Girl", boat: "clever-girl", category: "private-parties" },
  { src: "/attached_assets/@capitalcityshots-3_1760080740017.jpg", alt: "Group celebrating on Lake Travis", boat: "clever-girl", category: "private-parties" },
  { src: "/attached_assets/@capitalcityshots-5_1760080740018.jpg", alt: "Party boat Austin Lake Travis", boat: "clever-girl", category: "private-parties" },
  { src: "/attached_assets/@capitalcityshots-10_1760080740019.jpg", alt: "Guests dancing on Clever Girl", boat: "clever-girl", category: "private-parties" },
  { src: "/attached_assets/@capitalcityshots-11_1760080740019.jpg", alt: "Sunset celebration on Lake Travis", boat: "clever-girl", category: "private-parties" },
  { src: "/attached_assets/@capitalcityshots-13_1760080740020.jpg", alt: "Bachelorette toast on party boat", boat: "clever-girl", category: "private-parties" },
  { src: "/attached_assets/@capitalcityshots-15_1760080740020.jpg", alt: "Party on Lake Travis with disco balls", boat: "clever-girl", category: "private-parties" },
  { src: "/attached_assets/@capitalcityshots-18_1760080740021.jpg", alt: "Swim stop on Lake Travis", boat: "clever-girl", category: "private-parties" },
  { src: "/attached_assets/@capitalcityshots-20_1760080740021.jpg", alt: "Group photo on party boat", boat: "clever-girl", category: "private-parties" },
  { src: "/attached_assets/@capitalcityshots-22_1760080807865.jpg", alt: "Dance party on deck", boat: "clever-girl", category: "private-parties" },
  { src: "/attached_assets/@capitalcityshots-25_1760080807866.jpg", alt: "Champagne toast on party boat", boat: "clever-girl", category: "private-parties" },
  { src: "/attached_assets/@capitalcityshots-28_1760080807867.jpg", alt: "Floating lily pads on Lake Travis", boat: "clever-girl", category: "private-parties" },
  { src: "/attached_assets/clever girl-3 bachelorette party boat austin_1763966476657.jpg", alt: "Bachelorette party on Clever Girl", boat: "clever-girl", category: "private-parties" },
  { src: "/attached_assets/clever girl-10 austin bachelorette party_1763966476658.jpg", alt: "Austin bachelorette party on party boat", boat: "clever-girl", category: "private-parties" },
  { src: "/attached_assets/meeseeks-3 lake travis party boat_1763968010089.jpg", alt: "Group on Meeseeks on Lake Travis", boat: "meeseeks", category: "private-parties" },
  { src: "/attached_assets/meeseeks-4 austin party boat rental_1763968010090.jpg", alt: "Party on Meeseeks Austin", boat: "meeseeks", category: "private-parties" },
  { src: "/attached_assets/day tripper-1 party boat with captain austin_1763968078449.jpg", alt: "Small group on Day Tripper", boat: "day-tripper", category: "private-parties" },
  { src: "/attached_assets/day tripper-3 party boat austin_1763968078451.jpg", alt: "Day Tripper private charter", boat: "day-tripper", category: "private-parties" },
  { src: "/attached_assets/the irony-2 party boat rental austin_1763968010090.jpg", alt: "The Irony group charter", boat: "irony", category: "private-parties" },
];

export const DISCO_PHOTOS: Photo[] = [
  { src: "/attached_assets/disco_fun_1765193453547.jpg", alt: "ATX Disco Cruise dance party", category: "atx-disco", boat: "clever-girl" },
  { src: "/attached_assets/disco_fun2_1765193453547.jpg", alt: "Disco cruise on Lake Travis", category: "atx-disco", boat: "clever-girl" },
  { src: "/attached_assets/disco_fun5_1765193453548.jpg", alt: "Disco ball party atmosphere", category: "atx-disco", boat: "clever-girl" },
  { src: "/attached_assets/disco_fun6_1765193453548.jpg", alt: "ATX Disco Cruise guests dancing", category: "atx-disco", boat: "clever-girl" },
  { src: "/attached_assets/@capitalcityshots-1_1760072938922.jpg", alt: "ATX Disco Cruise on Clever Girl", category: "atx-disco", boat: "clever-girl" },
  { src: "/attached_assets/@capitalcityshots-10_1760073205050.jpg", alt: "Disco cruise photographer", category: "atx-disco", boat: "clever-girl" },
  { src: "/attached_assets/@capitalcityshots-13_1760073115406.jpg", alt: "Group on disco cruise", category: "atx-disco", boat: "clever-girl" },
  { src: "/attached_assets/@capitalcityshots-14_1760073205050.jpg", alt: "Bachelorette on ATX Disco Cruise", category: "atx-disco", boat: "clever-girl" },
  { src: "/attached_assets/@capitalcityshots-17_1760073115406.jpg", alt: "ATX Disco Cruise sunset", category: "atx-disco", boat: "clever-girl" },
  { src: "/attached_assets/@capitalcityshots-18_1760073115407.jpg", alt: "Disco balls on Clever Girl", category: "atx-disco", boat: "clever-girl" },
  { src: "/attached_assets/dancing-party-scene.webp", alt: "Dance party on Lake Travis", category: "atx-disco", boat: "clever-girl" },
];

export const BOAT_TABS: GalleryTab[] = [
  { id: "all", label: "All Boats" },
  { id: "day-tripper", label: "Day Tripper", filter: (p) => p.boat === "day-tripper" },
  { id: "meeseeks", label: "Meeseeks", filter: (p) => p.boat === "meeseeks" },
  { id: "irony", label: "The Irony", filter: (p) => p.boat === "irony" },
  { id: "clever-girl", label: "Clever Girl", filter: (p) => p.boat === "clever-girl" },
];

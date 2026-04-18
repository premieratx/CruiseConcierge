/**
 * QuoteLightbox — compatibility shim.
 *
 * HISTORY: This file used to render a full-page lightbox that embedded the
 * booking.premierpartycruises.com/quote-v2 iframe whenever a "Get a Quote"
 * button was clicked. Per product direction (April 2026), the quote flow
 * is being brought in-house as a native cruise-site page at /quote so we
 * can:
 *   - share URL + state with the rest of the site
 *   - pre-fill from the pricing calculator
 *   - unify analytics on a single domain
 *   - kill the cross-origin iframe, preload dance, and postMessage hacks
 *
 * To avoid touching 13+ call sites (CtaPair, FleetShowcase, V2PageTemplate,
 * PublicNavigationLuxury, Home-New, plus every V2 page), this file keeps
 * the same React context and `useQuoteLightbox()` hook — but `openQuote()`
 * now navigates to /quote instead of opening a modal. The provider still
 * exists as a no-op wrapper so the app tree doesn't have to be re-plumbed.
 *
 * The legacy modal UI + iframe preloader are intentionally removed.
 */
import { createContext, useCallback, useContext, type ReactNode } from "react";
import { useLocation } from "wouter";

/** Shape of data the calculator (or any CTA) can pre-fill on the quote page. */
export type QuotePrefill = {
  /** ISO date yyyy-MM-dd */
  date?: string;
  /** Guest count */
  guests?: number;
  /** Cruise duration in hours */
  duration?: number;
  /** Boat tier id (`day-tripper` | `meeseeks-irony` | `clever-girl`) */
  boat?: string;
  /** Party type (bachelor_party, wedding_event, etc.) */
  partyType?: string;
};

type QuoteLightboxContextValue = {
  /** Kept for API compatibility; always `false` since there is no modal. */
  isOpen: boolean;
  /**
   * Navigate to the native /quote page with optional pre-fill. `sourceType`
   * is preserved for attribution analytics (fleet_day_tripper, cta_banner,
   * nav_header, pricing_calculator, etc.).
   */
  openQuote: (sourceType?: string, prefill?: QuotePrefill) => void;
  /** No-op; kept for API compatibility. */
  closeQuote: () => void;
};

const QuoteLightboxContext = createContext<QuoteLightboxContextValue | null>(
  null,
);

export function QuoteLightboxProvider({ children }: { children: ReactNode }) {
  const [, navigate] = useLocation();

  const openQuote = useCallback(
    (sourceType?: string, prefill?: QuotePrefill) => {
      const params = new URLSearchParams();
      if (sourceType) params.set("sourceType", sourceType);
      if (prefill?.date) params.set("date", prefill.date);
      if (prefill?.guests) params.set("guests", String(prefill.guests));
      if (prefill?.duration) params.set("duration", String(prefill.duration));
      if (prefill?.boat) params.set("boat", prefill.boat);
      if (prefill?.partyType) params.set("partyType", prefill.partyType);
      // Preserve the URL the user clicked from so the quote flow can surface
      // "continue browsing" CTAs or attribute the lead back to a source page.
      if (typeof window !== "undefined") {
        params.set("sourceUrl", window.location.pathname + window.location.search);
      }
      const qs = params.toString();
      navigate(`/quote${qs ? `?${qs}` : ""}`);
    },
    [navigate],
  );

  const closeQuote = useCallback(() => {
    /* no-op — legacy API */
  }, []);

  return (
    <QuoteLightboxContext.Provider value={{ isOpen: false, openQuote, closeQuote }}>
      {children}
    </QuoteLightboxContext.Provider>
  );
}

export function useQuoteLightbox() {
  const ctx = useContext(QuoteLightboxContext);
  if (ctx) return ctx;
  // Fallback for components rendered outside the provider (e.g. SSR preview
  // or Storybook). Redirect via window.location when a provider isn't in
  // scope so the same API still works.
  return {
    isOpen: false,
    openQuote: (sourceType?: string, prefill?: QuotePrefill) => {
      if (typeof window === "undefined") return;
      const params = new URLSearchParams();
      if (sourceType) params.set("sourceType", sourceType);
      if (prefill?.date) params.set("date", prefill.date);
      if (prefill?.guests) params.set("guests", String(prefill.guests));
      if (prefill?.duration) params.set("duration", String(prefill.duration));
      if (prefill?.boat) params.set("boat", prefill.boat);
      if (prefill?.partyType) params.set("partyType", prefill.partyType);
      params.set("sourceUrl", window.location.pathname + window.location.search);
      window.location.assign(`/quote?${params.toString()}`);
    },
    closeQuote: () => {},
  } satisfies QuoteLightboxContextValue;
}

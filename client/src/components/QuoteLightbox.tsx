/*
 * QuoteLightbox — site-wide lightbox that hosts the booking quote iframe.
 *
 * Exposes a React context + `useQuoteLightbox()` hook so any component
 * anywhere in the tree can call `openQuote()` to show the popup.
 *
 * Usage:
 *   1. Wrap the app (or the page) in <QuoteLightboxProvider> once.
 *   2. In any component: const { openQuote } = useQuoteLightbox();
 *      then <button onClick={openQuote}>Get a Quote</button>
 */

import { createContext, useCallback, useContext, useEffect, useRef, useState, ReactNode } from "react";
import { X } from "lucide-react";

type QuoteLightboxContextValue = {
  isOpen: boolean;
  openQuote: (sourceType?: string) => void;
  closeQuote: () => void;
};

const QuoteLightboxContext = createContext<QuoteLightboxContextValue | null>(null);

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,500&family=Jost:wght@300;400;500;600&display=swap');

/* Overlay — always rendered so the iframe inside can preload. When
   closed we move it off-viewport instead of display:none so the
   iframe keeps loading in the background. */
.qlb-overlay {
  position: fixed;
  inset: 0;
  background: rgba(7, 7, 12, 0.82);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  opacity: 0;
  pointer-events: none;
  visibility: hidden;
  transition: opacity 0.28s ease, visibility 0s linear 0.28s;
}
.qlb-overlay.open {
  opacity: 1;
  pointer-events: auto;
  visibility: visible;
  transition: opacity 0.28s ease, visibility 0s linear 0s;
}

/* Dialog box */
.qlb-dialog {
  position: relative;
  width: min(100%, 900px);
  max-height: calc(100dvh - 3rem);
  background: #0F0F18;
  border: 1px solid rgba(200, 169, 110, 0.3);
  border-radius: 14px;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(200, 169, 110, 0.08);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transform: translateY(12px) scale(0.985);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.qlb-overlay.open .qlb-dialog { transform: translateY(0) scale(1); }

/* Header */
.qlb-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.9rem 1.25rem 0.85rem;
  border-bottom: 1px solid rgba(200, 169, 110, 0.18);
  background: linear-gradient(180deg, #141420 0%, #0F0F18 100%);
}
.qlb-title {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-weight: 500;
  color: #F0E6D0;
  font-size: 1.15rem;
  letter-spacing: 0.01em;
  margin: 0;
}
.qlb-title em {
  color: #DFC08A;
  font-style: italic;
  font-weight: 500;
}
.qlb-close {
  appearance: none;
  background: transparent;
  border: 1px solid rgba(200, 169, 110, 0.28);
  color: #C8B898;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
}
.qlb-close:hover {
  color: #F0E6D0;
  border-color: rgba(200, 169, 110, 0.55);
  background: rgba(200, 169, 110, 0.08);
}

/* Body */
.qlb-body {
  flex: 1 1 auto;
  position: relative;
  background: #0F0F18;
  overflow: hidden;
}
.qlb-iframe {
  width: 100%;
  height: 72vh;
  min-height: 560px;
  max-height: 780px;
  border: 0;
  display: block;
  background: #FFFFFF;
}

/* Loading state */
.qlb-loader {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0F0F18;
  color: #C8B898;
  font-family: 'Jost', system-ui, sans-serif;
  font-size: 0.9rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  gap: 0.5rem;
  pointer-events: none;
}
.qlb-loader::before {
  content: '';
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid rgba(200, 169, 110, 0.25);
  border-top-color: #C8A96E;
  animation: qlbSpin 0.9s linear infinite;
}
@keyframes qlbSpin { to { transform: rotate(360deg); } }

@media (max-width: 640px) {
  .qlb-overlay { padding: 0.5rem; }
  .qlb-dialog { border-radius: 10px; max-height: calc(100dvh - 1rem); }
  .qlb-title { font-size: 1rem; }
  .qlb-iframe { height: calc(100dvh - 7rem); min-height: 420px; }
}
`;

export function QuoteLightboxProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [sourceType, setSourceType] = useState<string>("lightbox_quote_v2");
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  const openQuote = useCallback((source?: string) => {
    if (source) setSourceType(source);
    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    // Don't reset iframeLoaded — iframe is preloaded on mount so it's
    // already ready by the time the user clicks a CTA.
    setIsOpen(true);
  }, []);

  const closeQuote = useCallback(() => {
    setIsOpen(false);
    // Restore focus to the element that opened the modal
    setTimeout(() => {
      lastFocusedRef.current?.focus?.();
    }, 0);
  }, []);

  // Close on Escape + lock body scroll while open
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeQuote();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    // Focus the dialog for screen readers
    setTimeout(() => dialogRef.current?.focus?.(), 50);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, closeQuote]);

  /*
   * GLOBAL CLICK INTERCEPTOR
   * Any link whose href points at the quote builder (`/chat`, `/quote`)
   * should open the lightbox instead of navigating away. This lets us
   * leave existing `<a href="/chat">` markup in place across the site
   * (footer, inline CTAs, pricing tables, etc.) and have it all route
   * through the popup automatically.
   *
   * Opt-out: add `data-no-lightbox` to any link that should still
   * navigate (e.g. an admin-only link).
   */
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      // Respect modifier keys so users can open in a new tab intentionally
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const target = e.target as HTMLElement | null;
      if (!target) return;
      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;
      if (anchor.hasAttribute("data-no-lightbox")) return;
      if (anchor.target && anchor.target !== "" && anchor.target !== "_self") return;

      const href = anchor.getAttribute("href") || "";
      const rawPath = href.split("?")[0].split("#")[0];
      if (rawPath === "/chat" || rawPath === "/quote") {
        e.preventDefault();
        openQuote("auto_intercept");
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [openQuote]);

  const currentUrl =
    typeof window !== "undefined" ? encodeURIComponent(window.location.href) : "";
  const iframeSrc = `https://booking.premierpartycruises.com/quote-v2?sourceUrl=${currentUrl}&sourceType=${encodeURIComponent(
    sourceType,
  )}&autoResize=1&theme=luxury`;

  return (
    <QuoteLightboxContext.Provider value={{ isOpen, openQuote, closeQuote }}>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      {children}

      <div
        className={`qlb-overlay ${isOpen ? "open" : ""}`}
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) closeQuote();
        }}
        aria-hidden={!isOpen}
      >
        <div
          ref={dialogRef}
          className="qlb-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="qlb-title"
          tabIndex={-1}
        >
          <div className="qlb-header">
            <h2 className="qlb-title" id="qlb-title">
              Get a <em>personalized quote</em>
            </h2>
            <button type="button" className="qlb-close" onClick={closeQuote} aria-label="Close quote builder">
              <X size={18} />
            </button>
          </div>

          <div className="qlb-body">
            {/* Iframe stays mounted for the life of the page. This makes the
                lightbox open INSTANTLY when a user clicks Get Quote — no
                cold-start iframe fetch. Scroll is isolated inside the
                dialog. Only shown when isOpen. */}
            {!iframeLoaded && (
              <div className="qlb-loader" aria-hidden={!isOpen}>Loading quote builder</div>
            )}
            <iframe
              ref={iframeRef}
              className="qlb-iframe"
              src={iframeSrc}
              title="Premier Party Cruises — Quote Builder"
              onLoad={() => setIframeLoaded(true)}
              allow="payment"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </QuoteLightboxContext.Provider>
  );
}

export function useQuoteLightbox() {
  const ctx = useContext(QuoteLightboxContext);
  if (!ctx) {
    // Soft-fallback: if used outside provider, open /chat in a new tab
    return {
      isOpen: false,
      openQuote: () => {
        if (typeof window !== "undefined") window.open("/chat", "_self");
      },
      closeQuote: () => {},
    } as QuoteLightboxContextValue;
  }
  return ctx;
}

/**
 * <GetQuoteButton> — dropped-in button that opens the quote lightbox.
 * Accepts standard button props so you can restyle with className.
 */
export function GetQuoteButton({
  children = "Get a Quote",
  className,
  sourceType,
  ...rest
}: Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> & { sourceType?: string }) {
  const { openQuote } = useQuoteLightbox();
  return (
    <button
      type="button"
      className={className}
      onClick={() => openQuote(sourceType)}
      {...rest}
    >
      {children}
    </button>
  );
}

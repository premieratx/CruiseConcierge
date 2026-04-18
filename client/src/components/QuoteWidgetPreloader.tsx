/**
 * QuoteWidgetPreloader — no-op stub.
 *
 * Used to preload a hidden iframe pointed at booking.premierpartycruises.com.
 * Now that the quote flow is in-house (EmbeddedQuoteFlow), no cross-origin
 * preload is necessary — the bundle is already loaded. Kept as an exported
 * symbol so existing imports in App/home-layout components keep working.
 */
import { useEffect } from 'react';

export function QuoteWidgetPreloader() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Warm up the Chat route chunk (contains EmbeddedQuoteFlow) so the first
    // click into the in-house quote page feels instant.
    import('../pages/Chat').catch(() => {});
  }, []);
  return null;
}

export default QuoteWidgetPreloader;

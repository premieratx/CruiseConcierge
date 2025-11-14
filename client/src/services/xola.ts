// Xola Integration Service
// Ensures checkout.js loads once and provides re-initialization for React components

declare global {
  interface Window {
    XolaCheckout?: any;
    Xola?: any;
  }
}

let scriptLoaded = false;
let scriptPromise: Promise<void> | null = null;

/**
 * Load Xola checkout.js script and return a promise when ready
 * NOTE: Script is already loaded in index.html - Xola handles initialization automatically
 */
export function loadXolaScript(): Promise<void> {
  // Xola script loads automatically via index.html
  // No need to wait or check - Xola will scan the DOM when ready
  console.log('[Xola] Script loading automatically - divs will activate when ready');
  return Promise.resolve();
}

/**
 * Re-initialize Xola embeds within a specific container or entire document
 * Call this after React renders new .xola-embedded-checkout or .xola-checkout divs
 */
export function initXolaEmbeds(container?: HTMLElement): void {
  if (typeof window === 'undefined') return;
  
  // Xola's checkout.js automatically scans for elements with xola-checkout and xola-embedded-checkout classes
  // We just need to trigger a re-scan after React renders new elements
  
  // Method 1: Try Controls.reload() if available (production Xola build)
  if (window.Xola?.Controls?.reload) {
    console.log('[Xola] Calling Controls.reload()');
    window.Xola.Controls.reload();
    return;
  }
  
  // Method 2: Try XolaCheckout.init() for older versions
  if (window.XolaCheckout?.init) {
    console.log('[Xola] Calling XolaCheckout.init()');
    window.XolaCheckout.init();
    return;
  }
  
  console.warn('[Xola] No init method available - Xola may not be fully loaded');
}

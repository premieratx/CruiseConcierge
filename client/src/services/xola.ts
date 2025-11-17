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
 * Call this after React renders new .xola-checkout divs
 */
export function initXolaEmbeds(container?: HTMLElement): void {
  if (typeof window === 'undefined') return;
  
  // Xola's checkout.js automatically scans for elements with xola-checkout class
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
  
  // Method 3: Manual fallback - attach click handlers to all xola-checkout elements
  if (window.Xola?.onClick) {
    console.log('[Xola] Using manual onClick fallback');
    const elements = (container || document).querySelectorAll('.xola-checkout');
    elements.forEach(element => {
      if (!element.hasAttribute('data-xola-initialized')) {
        element.addEventListener('click', function(e) {
          e.preventDefault();
          console.log('[Xola] Manual click handler triggered');
          window.Xola!.onClick(element);
        });
        element.setAttribute('data-xola-initialized', 'true');
      }
    });
    return;
  }
  
  console.warn('[Xola] No init method available - Xola may not be fully loaded');
}

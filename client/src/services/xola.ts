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
 * Script is loaded in index.html - this function waits for Xola to be available
 */
export function loadXolaScript(): Promise<void> {
  if (scriptPromise) {
    return scriptPromise;
  }

  scriptPromise = new Promise((resolve) => {
    // Check if Xola is already loaded
    if (window.Xola || window.XolaCheckout) {
      console.log('[Xola] Script already loaded and ready');
      scriptLoaded = true;
      resolve();
      return;
    }

    console.log('[Xola] Waiting for Xola script to load...');
    
    // Poll for Xola object to become available (max 10 seconds)
    let attempts = 0;
    const maxAttempts = 100; // 100 attempts * 100ms = 10 seconds
    
    const checkXola = setInterval(() => {
      attempts++;
      
      if (window.Xola || window.XolaCheckout) {
        console.log('[Xola] Script loaded successfully after', attempts * 100, 'ms');
        scriptLoaded = true;
        clearInterval(checkXola);
        resolve();
      } else if (attempts >= maxAttempts) {
        console.warn('[Xola] Script failed to load after 10 seconds - continuing anyway');
        clearInterval(checkXola);
        resolve(); // Resolve anyway to prevent blocking
      }
    }, 100);
  });

  return scriptPromise;
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

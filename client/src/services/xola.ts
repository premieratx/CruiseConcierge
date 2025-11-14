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
 */
export function loadXolaScript(): Promise<void> {
  if (scriptPromise) {
    return scriptPromise;
  }

  scriptPromise = new Promise((resolve, reject) => {
    if (scriptLoaded && window.XolaCheckout) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://xola.com/checkout.js';
    
    script.onload = () => {
      scriptLoaded = true;
      // Give Xola a moment to initialize
      setTimeout(() => resolve(), 100);
    };
    
    script.onerror = () => {
      reject(new Error('Failed to load Xola checkout.js'));
    };

    const firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode?.insertBefore(script, firstScript);
  });

  return scriptPromise;
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
    window.Xola.Controls.reload();
    return;
  }
  
  // Method 2: Try XolaCheckout.init() for older versions
  if (window.XolaCheckout?.init) {
    window.XolaCheckout.init();
    return;
  }
  
  // Method 3: Manually register each Xola element by calling onClick
  // This ensures embedded checkout elements get properly initialized
  const searchContainer = container || document;
  const xolaElements = searchContainer.querySelectorAll('.xola-embedded-checkout, .xola-checkout');
  
  if (window.Xola?.onClick && xolaElements.length > 0) {
    console.log(`Manually initializing ${xolaElements.length} Xola checkout elements`);
    xolaElements.forEach(el => {
      // Register click handler for each element
      el.addEventListener('click', () => {
        window.Xola?.onClick(el);
      });
    });
  } else if (window.XolaCheckout) {
    // Final fallback: call XolaCheckout as a function to trigger initialization
    try {
      (window.XolaCheckout as any)();
    } catch (e) {
      console.warn('Xola initialization attempt failed:', e);
    }
  }
}

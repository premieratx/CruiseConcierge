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
 * Call this after React renders new .xola-embedded-checkout divs
 */
export function initXolaEmbeds(container?: HTMLElement): void {
  // Try multiple possible API methods
  if (window.XolaCheckout?.init) {
    window.XolaCheckout.init();
  } else if (window.Xola?.Controls?.reload) {
    window.Xola.Controls.reload();
  } else if (window.XolaCheckout) {
    // Some versions auto-scan on any call
    try {
      window.XolaCheckout();
    } catch (e) {
      console.warn('Xola initialization attempt failed:', e);
    }
  }
}

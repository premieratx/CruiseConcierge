import { useEffect, useState, useCallback } from 'react';
import { X } from 'lucide-react';

export function XolaMobileCloseButton() {
  const [showCloseButton, setShowCloseButton] = useState(false);

  const checkForXolaOverlay = useCallback(() => {
    // Check for any fixed position overlays that might be Xola
    const allDivs = document.querySelectorAll('div');
    let hasVisibleOverlay = false;

    allDivs.forEach(el => {
      const style = window.getComputedStyle(el);
      const zIndex = parseInt(style.zIndex) || 0;
      const position = style.position;
      const display = style.display;
      const visibility = style.visibility;
      
      // Check for high z-index fixed/absolute elements (likely overlays)
      if (
        (position === 'fixed' || position === 'absolute') &&
        zIndex > 1000 &&
        display !== 'none' &&
        visibility !== 'hidden'
      ) {
        // Check if it covers a significant portion of screen
        const rect = el.getBoundingClientRect();
        if (rect.width > window.innerWidth * 0.5 && rect.height > window.innerHeight * 0.3) {
          hasVisibleOverlay = true;
        }
      }
    });

    // Also check for iframes which might be Xola
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
      const parent = iframe.parentElement;
      if (parent) {
        const style = window.getComputedStyle(parent);
        if (style.position === 'fixed' && style.display !== 'none') {
          hasVisibleOverlay = true;
        }
      }
    });

    // Check body overflow - if scrolling is locked, an overlay is likely open
    if (document.body.style.overflow === 'hidden') {
      hasVisibleOverlay = true;
    }

    setShowCloseButton(hasVisibleOverlay);
  }, []);

  useEffect(() => {
    let observer: MutationObserver | null = null;

    observer = new MutationObserver(() => {
      checkForXolaOverlay();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });

    // Initial check
    checkForXolaOverlay();

    // Also check periodically in case mutations are missed
    const interval = setInterval(checkForXolaOverlay, 500);

    return () => {
      if (observer) {
        observer.disconnect();
      }
      clearInterval(interval);
    };
  }, [checkForXolaOverlay]);

  const handleClose = () => {
    // Hide ALL high z-index fixed overlays
    const allDivs = document.querySelectorAll('div');
    allDivs.forEach(el => {
      const style = window.getComputedStyle(el);
      const zIndex = parseInt(style.zIndex) || 0;
      const position = style.position;
      
      if ((position === 'fixed' || position === 'absolute') && zIndex > 1000) {
        const rect = el.getBoundingClientRect();
        if (rect.width > window.innerWidth * 0.3 && rect.height > window.innerHeight * 0.2) {
          (el as HTMLElement).style.display = 'none';
        }
      }
    });

    // Hide any iframes that might be Xola
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
      const parent = iframe.parentElement;
      if (parent) {
        const style = window.getComputedStyle(parent);
        if (style.position === 'fixed') {
          parent.style.display = 'none';
        }
      }
    });

    // Restore scrolling
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    
    setShowCloseButton(false);
  };

  if (!showCloseButton) return null;

  return (
    <button
      onClick={handleClose}
      className="fixed top-4 right-4 z-[99999] bg-black/90 hover:bg-black text-white rounded-full p-3 shadow-2xl transition-all md:hidden"
      style={{ 
        width: '56px', 
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      aria-label="Close booking popup"
      data-testid="xola-mobile-close-button"
    >
      <X className="h-8 w-8" strokeWidth={3} />
    </button>
  );
}

export default XolaMobileCloseButton;

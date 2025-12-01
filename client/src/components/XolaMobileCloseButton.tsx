import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

export function XolaMobileCloseButton() {
  const [showCloseButton, setShowCloseButton] = useState(false);

  useEffect(() => {
    let observer: MutationObserver | null = null;

    const checkForXolaOverlay = () => {
      const xolaOverlays = document.querySelectorAll(
        'iframe[src*="xola"], ' +
        '[class*="xola-modal"], ' +
        '[class*="xola-overlay"], ' +
        '[class*="xola-popup"], ' +
        '.xola-checkout-modal, ' +
        'div[style*="position: fixed"][style*="z-index: 99"]'
      );
      
      let hasVisibleOverlay = false;
      xolaOverlays.forEach(el => {
        const style = window.getComputedStyle(el);
        if (style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0') {
          hasVisibleOverlay = true;
        }
      });

      const fixedDivs = document.querySelectorAll('body > div[style*="position: fixed"]');
      fixedDivs.forEach(el => {
        const style = window.getComputedStyle(el);
        const zIndex = parseInt(style.zIndex) || 0;
        if (zIndex > 9000 && style.display !== 'none') {
          hasVisibleOverlay = true;
        }
      });

      setShowCloseButton(hasVisibleOverlay);
    };

    observer = new MutationObserver(() => {
      checkForXolaOverlay();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });

    checkForXolaOverlay();

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  const handleClose = () => {
    const xolaCloseButtons = document.querySelectorAll(
      '[class*="xola"] button[class*="close"], ' +
      '[class*="xola"] .close, ' +
      '[class*="xola"] [aria-label="Close"], ' +
      '[class*="xola"] [aria-label="close"], ' +
      'button.xola-close, ' +
      '.xola-modal button:first-child, ' +
      '[class*="modal"] [class*="close"]'
    );
    
    xolaCloseButtons.forEach(btn => {
      if (btn instanceof HTMLElement) {
        btn.click();
      }
    });

    const fixedDivs = document.querySelectorAll('body > div[style*="position: fixed"]');
    fixedDivs.forEach(el => {
      const style = window.getComputedStyle(el);
      const zIndex = parseInt(style.zIndex) || 0;
      if (zIndex > 9000) {
        (el as HTMLElement).style.display = 'none';
      }
    });

    const xolaIframes = document.querySelectorAll('iframe[src*="xola"]');
    xolaIframes.forEach(iframe => {
      const parent = iframe.parentElement;
      if (parent && parent.style.position === 'fixed') {
        parent.style.display = 'none';
      }
    });

    const xolaOverlays = document.querySelectorAll(
      '.xola-modal, .xola-overlay, .xola-popup, .xola-checkout-modal, ' +
      '[class*="xola-modal"], [class*="xola-overlay"], [class*="xola-popup"]'
    );
    xolaOverlays.forEach(el => {
      (el as HTMLElement).style.display = 'none';
    });

    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    
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

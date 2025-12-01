import { useEffect, useState, useCallback, useRef } from 'react';
import { X } from 'lucide-react';

export function XolaMobileCloseButton() {
  const [showCloseButton, setShowCloseButton] = useState(false);
  const showTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const overlayDetectedRef = useRef(false);

  const checkForXolaOverlay = useCallback(() => {
    let hasVisibleOverlay = false;

    // Check for iframes (Xola uses iframes)
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
      const src = iframe.src || '';
      if (src.includes('xola') || src.includes('checkout')) {
        const rect = iframe.getBoundingClientRect();
        if (rect.width > 100 && rect.height > 100) {
          hasVisibleOverlay = true;
        }
      }
    });

    // Check for fixed position elements with high z-index
    const allElements = document.querySelectorAll('*');
    allElements.forEach(el => {
      const style = window.getComputedStyle(el);
      const zIndex = parseInt(style.zIndex) || 0;
      
      if (style.position === 'fixed' && zIndex > 10000) {
        const rect = el.getBoundingClientRect();
        if (rect.width > window.innerWidth * 0.4 && rect.height > window.innerHeight * 0.4) {
          hasVisibleOverlay = true;
        }
      }
    });

    // Check body overflow
    const bodyStyle = window.getComputedStyle(document.body);
    if (bodyStyle.overflow === 'hidden' || document.body.style.overflow === 'hidden') {
      hasVisibleOverlay = true;
    }

    // If overlay just appeared, wait 800ms before showing button
    // This ensures Xola slide-out is fully rendered first
    if (hasVisibleOverlay && !overlayDetectedRef.current) {
      overlayDetectedRef.current = true;
      if (showTimeoutRef.current) {
        clearTimeout(showTimeoutRef.current);
      }
      showTimeoutRef.current = setTimeout(() => {
        setShowCloseButton(true);
      }, 800);
    } else if (!hasVisibleOverlay) {
      overlayDetectedRef.current = false;
      if (showTimeoutRef.current) {
        clearTimeout(showTimeoutRef.current);
      }
      setShowCloseButton(false);
    }
  }, []);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      checkForXolaOverlay();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });

    checkForXolaOverlay();
    const interval = setInterval(checkForXolaOverlay, 300);

    return () => {
      observer.disconnect();
      clearInterval(interval);
      if (showTimeoutRef.current) {
        clearTimeout(showTimeoutRef.current);
      }
    };
  }, [checkForXolaOverlay]);

  const handleClose = () => {
    // Strategy: HIDE (not remove) Xola overlay elements so they can be reopened
    
    // 1. Find and HIDE Xola-specific containers
    const xolaSelectors = [
      '[id^="xola"]',
      '.xola-checkout-frame',
      '.xola-modal',
      '.xola-overlay',
      '[class*="xola"]'
    ];
    
    xolaSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        (el as HTMLElement).style.display = 'none';
      });
    });

    // 2. Hide any fixed-position iframes (likely Xola checkout)
    document.querySelectorAll('iframe').forEach(iframe => {
      let element: HTMLElement | null = iframe;
      while (element && element !== document.body) {
        const style = window.getComputedStyle(element);
        if (style.position === 'fixed') {
          element.style.display = 'none';
          break;
        }
        element = element.parentElement;
      }
    });

    // 3. Hide other fixed overlays with high z-index (but don't touch #root)
    document.querySelectorAll('body > div:not(#root)').forEach(el => {
      const style = window.getComputedStyle(el);
      const zIndex = parseInt(style.zIndex) || 0;
      
      if (style.position === 'fixed' && zIndex > 1000) {
        (el as HTMLElement).style.display = 'none';
      }
    });

    // 4. Restore scrolling - only reset Xola-applied properties
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.documentElement.style.overflow = '';
    document.body.classList.remove('xola-modal-open', 'modal-open', 'overflow-hidden');
    
    // 5. Reset state so button hides
    overlayDetectedRef.current = false;
    setShowCloseButton(false);
  };

  if (!showCloseButton) return null;

  // Only show on mobile (screen width <= 768px)
  if (typeof window !== 'undefined' && window.innerWidth > 768) {
    return null;
  }

  return (
    <button
      onClick={handleClose}
      aria-label="Close booking popup"
      data-testid="xola-mobile-close-button"
      style={{ 
        position: 'fixed',
        top: '16px',
        right: '16px',
        zIndex: 2147483647, // Maximum possible z-index
        width: '56px', 
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        color: 'white',
        borderRadius: '50%',
        border: '3px solid white',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
        cursor: 'pointer',
        padding: 0
      }}
    >
      <X style={{ width: '32px', height: '32px', strokeWidth: 3 }} />
    </button>
  );
}

export default XolaMobileCloseButton;

import { useEffect, useState, useCallback, useRef } from 'react';
import { X } from 'lucide-react';

export function XolaMobileCloseButton() {
  const [showCloseButton, setShowCloseButton] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const checkForXolaOverlay = useCallback(() => {
    // Simple, reliable detection using Xola's actual DOM elements
    const hasXolaElements = !!(
      document.querySelector('.xola-overlay') ||
      document.querySelector('.xola-modal') ||
      document.querySelector('.xola-checkout-frame') ||
      document.querySelector('[id^="xola"]') ||
      document.querySelector('iframe[src*="xola"]') ||
      document.querySelector('iframe[src*="checkout"]')
    );
    
    // Also check for body scroll lock (Xola adds this when modal opens)
    const hasBodyLock = 
      document.body.classList.contains('xola-modal-open') ||
      document.body.classList.contains('modal-open') ||
      document.body.style.overflow === 'hidden';
    
    // Check for any fixed overlay that covers most of the screen
    let hasFixedOverlay = false;
    const fixedElements = document.querySelectorAll('body > div:not(#root)');
    fixedElements.forEach(el => {
      const style = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      
      if (
        style.position === 'fixed' && 
        rect.width > window.innerWidth * 0.5 &&
        rect.height > window.innerHeight * 0.3
      ) {
        hasFixedOverlay = true;
      }
    });

    const shouldShow = hasXolaElements || hasBodyLock || hasFixedOverlay;
    setShowCloseButton(shouldShow);
  }, []);

  useEffect(() => {
    // Monitor for Xola overlay appearing
    const observer = new MutationObserver(() => {
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
    
    // Periodic check as backup
    const interval = setInterval(checkForXolaOverlay, 200);

    return () => {
      observer.disconnect();
      clearInterval(interval);
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
    setShowCloseButton(false);
  };

  // Only render on mobile when overlay is detected
  if (!isMobile || !showCloseButton) {
    return null;
  }

  return (
    <button
      onClick={handleClose}
      aria-label="Close booking popup"
      data-testid="xola-mobile-close-button"
      style={{ 
        position: 'fixed',
        top: '12px',
        right: '12px',
        zIndex: 2147483647,
        width: '48px', 
        height: '48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        color: 'white',
        borderRadius: '50%',
        border: '2px solid white',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.6)',
        cursor: 'pointer',
        padding: 0,
        touchAction: 'manipulation'
      }}
    >
      <X style={{ width: '28px', height: '28px', strokeWidth: 2.5 }} />
    </button>
  );
}

export default XolaMobileCloseButton;

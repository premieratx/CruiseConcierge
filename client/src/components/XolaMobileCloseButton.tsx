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

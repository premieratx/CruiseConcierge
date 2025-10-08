import { useState, useEffect } from 'react';

/**
 * Hook to determine if animations should be reduced or disabled
 * Returns true if:
 * - User is on mobile device (< 768px)
 * - User has prefers-reduced-motion enabled
 * 
 * CRITICAL: Computes value IMMEDIATELY on first render to prevent
 * animation thrash on mobile (310ms performance issue)
 */
export function useReducedMotion(): boolean {
  // Initialize from window immediately (no hook delay)
  const getInitialValue = () => {
    if (typeof window === 'undefined') return false;
    
    // Check media query immediately
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    if (mediaQuery.matches) return true;
    
    // Check prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    return prefersReduced.matches;
  };

  const [reducedMotion, setReducedMotion] = useState(getInitialValue);
  
  useEffect(() => {
    // Update if changes
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handler = () => setReducedMotion(
      mediaQuery.matches || prefersReduced.matches
    );
    
    mediaQuery.addEventListener('change', handler);
    prefersReduced.addEventListener('change', handler);
    
    return () => {
      mediaQuery.removeEventListener('change', handler);
      prefersReduced.removeEventListener('change', handler);
    };
  }, []);
  
  return reducedMotion;
}

/**
 * Hook specifically for disabling animations only on mobile
 * Ignores prefers-reduced-motion setting
 */
export function useMobileOptimization(): boolean {
  const getInitialValue = () => {
    if (typeof window === 'undefined') return false;
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    return mediaQuery.matches;
  };

  const [isMobile, setIsMobile] = useState(getInitialValue);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const handler = () => setIsMobile(mediaQuery.matches);
    
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);
  
  return isMobile;
}

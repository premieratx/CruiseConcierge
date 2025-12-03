import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// PRODUCTION-SAFE HYDRATION: Use deterministic page-ready signals to avoid Soft 404 errors
// SSR content stays visible until a page explicitly signals readiness via [data-page-ready]
// This prevents the race condition where SSR is hidden before React content is visible
// If React fails to load or render, SSR content stays visible (resilient fallback for SEO)

const rootElement = document.getElementById("root")!;

createRoot(rootElement).render(<App />);

// DETERMINISTIC READINESS CHECK: Only hide SSR when a page explicitly signals it's ready
// Pages must have [data-page-ready] attribute set on their main container
// This is more reliable than heuristics that can be triggered by skeletons/analytics
const MAX_WAIT_MS = 15000; // 15 seconds - generous timeout for slow connections
const CHECK_INTERVAL_MS = 200; // Check every 200ms

let startTime = Date.now();

const checkForPageReady = () => {
  // Look for explicit page-ready signal - only this is trusted
  const pageReadyElement = rootElement.querySelector('[data-page-ready]');
  
  if (pageReadyElement) {
    // Page has explicitly signaled it's ready - safe to hide SSR
    rootElement.setAttribute('data-hydrated', 'true');
    return;
  }
  
  // Check if we've exceeded max wait time
  const elapsed = Date.now() - startTime;
  if (elapsed >= MAX_WAIT_MS) {
    // Timeout reached - FAIL OPEN: keep SSR visible for SEO
    // Log for monitoring but don't hide SSR
    console.warn('[Hydration] Page ready signal not received after 15s - SSR content preserved for SEO');
    return;
  }
  
  // Not ready yet - check again
  setTimeout(checkForPageReady, CHECK_INTERVAL_MS);
};

// Start checking after React has had a chance to begin rendering
requestAnimationFrame(() => {
  startTime = Date.now();
  setTimeout(checkForPageReady, CHECK_INTERVAL_MS);
});
// Build: 1764728500

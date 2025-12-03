import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// PRODUCTION-SAFE HYDRATION: Set data-hydrated attribute ONLY after React renders meaningful content
// This prevents Soft 404 errors where SSR is hidden before React content is visible
// If React fails to load or render, SSR content stays visible (resilient fallback for SEO)

const rootElement = document.getElementById("root")!;

createRoot(rootElement).render(<App />);

// CRITICAL FIX FOR SOFT 404: Only hide SSR content when React has rendered actual page content
// Check multiple times with increasing delays to ensure content is rendered
// This handles lazy-loaded components that take time to mount
const checkAndHideSSR = (attempt: number = 0, maxAttempts: number = 20) => {
  // Look for indicators that React has rendered meaningful content
  // - <main> element (present on most pages)
  // - <h1> element inside root (page heading)
  // - Navigation elements
  // - Any substantial content (more than just loading spinners)
  const hasMainContent = rootElement.querySelector('main, h1, nav, [data-page-ready]');
  const hasMinimalContent = rootElement.innerHTML.length > 500; // More than just a loading state
  
  if (hasMainContent || hasMinimalContent) {
    // React has rendered meaningful content - safe to hide SSR
    rootElement.setAttribute('data-hydrated', 'true');
  } else if (attempt < maxAttempts) {
    // Content not ready yet - wait and check again
    // Use exponential backoff: 100ms, 200ms, 400ms... up to max 2s
    const delay = Math.min(100 * Math.pow(1.5, attempt), 2000);
    setTimeout(() => checkAndHideSSR(attempt + 1, maxAttempts), delay);
  }
  // If maxAttempts reached without content, SSR stays visible (fail-safe for SEO)
};

// Start checking after initial render frame
requestAnimationFrame(() => {
  // Give React a bit more time to start rendering before first check
  setTimeout(() => checkAndHideSSR(), 100);
});
// Build: 1764727000

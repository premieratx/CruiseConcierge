// Fix for Vite React plugin preamble issue
// This ensures the preamble flag is set before any React components load
if (typeof window !== 'undefined') {
  (window as any).__vite_plugin_react_preamble_installed__ = true;
}

import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// CRITICAL: Use different rendering based on environment
// - Development: createRoot().render() for client-side rendering (no SSR hydration conflicts)
// - Production: hydrateRoot() to hydrate SSR HTML for SEO

const rootElement = document.getElementById("root")!;

// Check if we have SSR content to hydrate (production) or need client-side render (development)
const isProduction = import.meta.env.PROD;

if (isProduction) {
  // Production: Hydrate the SSR content
  hydrateRoot(rootElement, <App />);
} else {
  // Development: Client-side render only (no SSR to avoid hydration conflicts)
  createRoot(rootElement).render(<App />);
}

// Mark hydration complete - this triggers CSS rule: #root[data-hydrated="true"] ~ .ssr-content { display: none }
// Use requestAnimationFrame to ensure React has rendered before hiding SSR content
requestAnimationFrame(() => {
  rootElement.setAttribute('data-hydrated', 'true');
});

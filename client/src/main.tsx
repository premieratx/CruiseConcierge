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

// CRITICAL FIX: Always use createRoot (no SSR/hydration)
// SSR was causing hydration mismatches and breaking the app
// React app has SEO built-in via React Helmet - no SSR needed
createRoot(rootElement).render(<App />);

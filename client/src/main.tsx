// Fix for Vite React plugin preamble issue
// This ensures the preamble flag is set before any React components load
if (typeof window !== 'undefined') {
  (window as any).__vite_plugin_react_preamble_installed__ = true;
}

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// PRODUCTION-SAFE HYDRATION: Set data-hydrated attribute AFTER React successfully mounts
// This triggers CSS to hide SSR fallback content only when React is ready
// If React fails to load, SSR content stays visible (resilient fallback)

const rootElement = document.getElementById("root")!;

createRoot(rootElement).render(<App />);

// Mark hydration complete - this triggers CSS rule: #root[data-hydrated="true"] ~ .ssr-content { display: none }
// Use requestAnimationFrame to ensure React has rendered before hiding SSR content
requestAnimationFrame(() => {
  rootElement.setAttribute('data-hydrated', 'true');
});

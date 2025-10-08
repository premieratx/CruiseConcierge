// Fix for Vite React plugin preamble issue
// This ensures the preamble flag is set before any React components load
if (typeof window !== 'undefined') {
  (window as any).__vite_plugin_react_preamble_installed__ = true;
}

import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// DO NOT hide SSR content - let it remain visible for SEO crawlers
// React app renders in #root div, SSR content in #ssr-fallback div
// Both can coexist without issues

createRoot(document.getElementById("root")!).render(<App />);

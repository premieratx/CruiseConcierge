import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// DO NOT hide SSR content - let it remain visible for SEO crawlers
// React app renders in #root div, SSR content in #ssr-fallback div
// Both can coexist without issues

createRoot(document.getElementById("root")!).render(<App />);

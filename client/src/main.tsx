import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Hide SSR fallback content when React loads
const ssrFallback = document.getElementById("ssr-fallback");
if (ssrFallback) {
  ssrFallback.classList.add("hidden");
}

createRoot(document.getElementById("root")!).render(<App />);

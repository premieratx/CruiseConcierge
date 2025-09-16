import { createRoot } from "react-dom/client";
import EmbedApp from "./EmbedApp";
import "./index.css";

// Production entry point for embed widgets
// No development overlays or hot reloading
createRoot(document.getElementById("root")!).render(<EmbedApp />);
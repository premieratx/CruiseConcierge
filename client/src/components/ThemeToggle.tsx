/**
 * ThemeToggle — floating pill that flips the site between the
 * default dark luxury theme and the light festive daytime theme.
 *
 * State lives in `localStorage.ppc-site-theme`. The toggle sets two
 * classes on document.body: `ppc-light` or `ppc-dark`. Site-wide
 * light-theme rules live in styles/site-light-theme.css and cascade
 * from `body.ppc-light`.
 *
 * Mount once per page tree (e.g. inside PublicNavigationLuxury).
 */
import { useEffect, useState } from "react";

const STORAGE_KEY = "ppc-site-theme";

type Theme = "dark" | "light";

function readSaved(): Theme {
  if (typeof window === "undefined") return "dark";
  const v = window.localStorage.getItem(STORAGE_KEY);
  return v === "light" ? "light" : "dark";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(readSaved);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, theme);
    document.body.classList.toggle("ppc-light", theme === "light");
    document.body.classList.toggle("ppc-dark", theme === "dark");
    // Legacy hook for Home-New.tsx page-scoped theme rules
    const page = document.querySelector(".hp2-page");
    if (page) page.classList.toggle("hp2-light", theme === "light");
  }, [theme]);

  return (
    <button
      type="button"
      className="ppc-theme-toggle"
      onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      data-testid="theme-toggle"
    >
      <span className="ppc-theme-toggle__dot" />
      {theme === "light" ? "Dark Mode" : "Light Mode"}
    </button>
  );
}

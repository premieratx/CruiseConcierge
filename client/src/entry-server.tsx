import { renderToString } from "react-dom/server";
import { Router } from "wouter";
// SSR FIX: Use default import for react-helmet-async to handle ESM/CJS compatibility
import HelmetAsyncDefault from "react-helmet-async";
const { HelmetProvider } = HelmetAsyncDefault;
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient.ts";
// TEMPORARY: BookingCacheProvider disabled to fix React preamble error
// import { BookingCacheProvider } from "./contexts/BookingCacheContext.tsx";
import { EditModeProvider } from "./contexts/EditModeContext.tsx";
import { AuthProvider } from "./hooks/use-auth.tsx";
import App from "./App.tsx";

// Custom location hook for SSR with wouter
const staticLocationHook = (path: string) => () => [path, () => {}] as const;

export interface SSRContext {
  helmetContext: {
    helmet?: {
      title?: { toString: () => string };
      meta?: { toString: () => string };
      link?: { toString: () => string };
      script?: { toString: () => string };
    };
  };
}

export function render(url: string) {
  const helmetContext: SSRContext["helmetContext"] = {};

  // Render the app with static location
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <EditModeProvider>
            {/* TEMPORARY: BookingCacheProvider disabled to fix React preamble error */}
            {/* <BookingCacheProvider> */}
              <Router hook={staticLocationHook(url)}>
                <App />
              </Router>
            {/* </BookingCacheProvider> */}
          </EditModeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );

  // Extract helmet data
  const helmet = helmetContext.helmet || {};

  return {
    html,
    helmet: {
      title: helmet.title?.toString() || '',
      meta: helmet.meta?.toString() || '',
      link: helmet.link?.toString() || '',
      script: helmet.script?.toString() || ''
    }
  };
}

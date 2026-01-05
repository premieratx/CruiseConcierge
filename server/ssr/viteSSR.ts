import path from 'path';
import fs from 'fs';
import { createServer as createViteServer, type ViteDevServer } from 'vite';

let viteDevServer: ViteDevServer | null = null;
let ssrModule: { render: (url: string) => Promise<{ html: string; helmet: any }> } | null = null;
let isInitializing = false;
let initPromise: Promise<void> | null = null;
let initAttempted = false;

export async function initViteSSR(): Promise<void> {
  if (viteDevServer || ssrModule) return;
  if (isInitializing && initPromise) return initPromise;
  
  isInitializing = true;
  
  initPromise = (async () => {
    try {
      // First, check if production SSR bundle exists
      const ssrBundlePath = path.resolve(process.cwd(), 'dist/server/entry-server.js');
      if (fs.existsSync(ssrBundlePath)) {
        ssrModule = await import(ssrBundlePath);
        console.log('[Vite SSR] Production SSR bundle loaded');
        initAttempted = true;
        return;
      }
      
      // No SSR bundle - create a Vite dev server for SSR
      // This works even when dist/public exists (preview mode)
      console.log('[Vite SSR] Creating Vite dev server for SSR...');
      const viteConfig = (await import('../../vite.config')).default;
      
      viteDevServer = await createViteServer({
        ...viteConfig,
        configFile: false,
        server: {
          middlewareMode: true,
        },
        appType: 'custom',
      });
      
      console.log('[Vite SSR] Vite dev server initialized for SSR');
      initAttempted = true;
    } catch (error) {
      console.error('[Vite SSR] Failed to initialize:', error);
      console.log('[Vite SSR] Will retry on next request');
      // Don't set initAttempted - allow retry on next request
    } finally {
      isInitializing = false;
    }
  })();
  
  return initPromise;
}

export async function renderReactSSR(url: string): Promise<{ html: string; helmet: any } | null> {
  try {
    await initViteSSR();
    
    // Use production SSR bundle if available
    if (ssrModule) {
      return await ssrModule.render(url);
    }
    
    // Use Vite dev server for SSR if available
    if (viteDevServer) {
      const entryPath = path.resolve(process.cwd(), 'client/src/entry-server.tsx');
      const module = await viteDevServer.ssrLoadModule(entryPath);
      return await module.render(url);
    }
    
    return null;
  } catch (error) {
    console.error('[Vite SSR] Render error for', url, ':', error);
    return null;
  }
}

export function getViteDevServer(): ViteDevServer | null {
  return viteDevServer;
}

export async function closeViteSSR(): Promise<void> {
  if (viteDevServer) {
    await viteDevServer.close();
    viteDevServer = null;
  }
}

import fs from 'fs';
import path from 'path';

// Vite manifest structure
interface ViteManifestEntry {
  file: string;
  src?: string;
  isEntry?: boolean;
  css?: string[];
  assets?: string[];
}

type ViteManifest = Record<string, ViteManifestEntry>;

let manifest: ViteManifest | null = null;

/**
 * Load Vite manifest.json at server startup (production only)
 * Manifest maps original asset paths to fingerprinted/hashed paths
 */
export function loadViteManifest() {
  // Only load manifest in production
  if (process.env.NODE_ENV !== 'production') {
    console.log('[vite-manifest] Development mode - skipping manifest load');
    return;
  }
  
  const manifestPath = path.join(process.cwd(), 'dist/client/.vite/manifest.json');
  
  if (fs.existsSync(manifestPath)) {
    try {
      const manifestContent = fs.readFileSync(manifestPath, 'utf-8');
      manifest = JSON.parse(manifestContent);
      console.log('[vite-manifest] ✅ Loaded production manifest from dist/client/.vite/manifest.json');
    } catch (error) {
      console.error('[vite-manifest] ❌ Failed to load manifest:', error);
    }
  } else {
    console.warn('[vite-manifest] ⚠️ Manifest not found at:', manifestPath);
  }
}

/**
 * Resolve an asset path to its fingerprinted version using the manifest
 * @param originalPath - Original asset path (e.g., '/attached_assets/hero.webp')
 * @returns Hashed asset path (e.g., '/assets/hero-abc123.webp') or null if not found
 */
export function resolveAsset(originalPath: string): string | null {
  // No manifest in development or if load failed
  if (!manifest) {
    return null;
  }
  
  // Strip leading slash if present for manifest lookup
  const cleanPath = originalPath.replace(/^\//, '');
  
  // Try direct lookup first
  let entry = manifest[cleanPath];
  
  // If not found, try with 'client/' prefix (some Vite configs use this)
  if (!entry) {
    entry = manifest[`client/${cleanPath}`];
  }
  
  // Return hashed path with leading slash, or null if not found
  return entry ? `/${entry.file}` : null;
}

/**
 * Get the loaded manifest (for debugging)
 */
export function getManifest(): ViteManifest | null {
  return manifest;
}

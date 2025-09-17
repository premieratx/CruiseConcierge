/**
 * Utility functions for the server
 */

/**
 * Gets the public URL for the application.
 * Uses Replit environment variables when available, otherwise falls back to BASE_URL or a default.
 * @returns The public URL without trailing slash
 */
export function getPublicUrl(): string {
  let url = '';
  
  // In Replit environment, use the dev domain
  if (process.env.REPLIT_DEV_DOMAIN) {
    url = `https://${process.env.REPLIT_DEV_DOMAIN}`;
  }
  // Use custom BASE_URL if configured
  else if (process.env.BASE_URL) {
    url = process.env.BASE_URL.replace(/\/$/, ''); // Remove trailing slash if present
  }
  // In production deployment, check for REPLIT_DOMAINS (deployed URL)
  else if (process.env.REPLIT_DOMAINS) {
    const domain = process.env.REPLIT_DOMAINS.split(',')[0]; // Take first domain if multiple
    url = `https://${domain}`;
  }
  // Default fallback (should rarely be reached)
  else {
    url = 'https://premierpartycruises.com';
  }
  
  console.log('🌐 getPublicUrl() result:', {
    url,
    source: process.env.REPLIT_DEV_DOMAIN ? 'REPLIT_DEV_DOMAIN' :
            process.env.BASE_URL ? 'BASE_URL' :
            process.env.REPLIT_DOMAINS ? 'REPLIT_DOMAINS' : 'default',
    envVars: {
      REPLIT_DEV_DOMAIN: !!process.env.REPLIT_DEV_DOMAIN,
      BASE_URL: !!process.env.BASE_URL,
      REPLIT_DOMAINS: !!process.env.REPLIT_DOMAINS
    }
  });
  
  return url;
}

/**
 * Generates a full URL for a given path
 * @param path The path to append to the base URL (should start with /)
 * @returns The full URL
 */
export function getFullUrl(path: string): string {
  const baseUrl = getPublicUrl();
  // Ensure path starts with /
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
}
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

/**
 * Generates a quote URL with the proper domain (not localhost)
 * This is critical for quote links that need to work from any device
 * @param token The quote access token
 * @param req Optional Express request object (not used anymore)
 * @returns The full quote URL
 */
export function getQuoteUrl(token: string, req?: any): string {
  // Always use the production domain for quotes
  // This ensures quotes work from anywhere
  const productionDomain = 'https://cruise-concierge-brian-hill.replit.app';
  
  console.log('🔗 Generated quote URL:', {
    token: token.substring(0, 10) + '...',
    baseUrl: productionDomain,
    fullUrl: `${productionDomain}/q/${token}`,
    source: 'production_domain'
  });
  
  return `${productionDomain}/q/${token}`;
}
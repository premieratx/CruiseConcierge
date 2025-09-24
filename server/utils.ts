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
  
  // Prioritize BASE_URL for live domain (FIXED: was prioritizing dev domain)
  if (process.env.BASE_URL && process.env.BASE_URL.trim()) {
    url = process.env.BASE_URL.trim().replace(/\/$/, ''); // Remove whitespace and trailing slash
  }
  // Use dev domain only if no BASE_URL is set
  else if (process.env.REPLIT_DEV_DOMAIN) {
    url = `https://${process.env.REPLIT_DEV_DOMAIN}`;
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
    source: process.env.BASE_URL && process.env.BASE_URL.trim() ? 'BASE_URL' :
            process.env.REPLIT_DEV_DOMAIN ? 'REPLIT_DEV_DOMAIN' :
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
  // Use the same logic as getPublicUrl to get the actual domain
  let baseUrl = '';
  
  // Prioritize BASE_URL for live domain (FIXED: was prioritizing dev domain)
  if (process.env.BASE_URL && process.env.BASE_URL.trim()) {
    baseUrl = process.env.BASE_URL.trim().replace(/\/$/, ''); // Remove whitespace and trailing slash
  }
  // Use dev domain only if no BASE_URL is set
  else if (process.env.REPLIT_DEV_DOMAIN) {
    baseUrl = `https://${process.env.REPLIT_DEV_DOMAIN}`;
  }
  // In production deployment, check for REPLIT_DOMAINS
  else if (process.env.REPLIT_DOMAINS) {
    const domain = process.env.REPLIT_DOMAINS.split(',')[0]; // Take first domain if multiple
    baseUrl = `https://${domain}`;
  }
  // Final fallback to the known Replit app URL
  else {
    baseUrl = 'https://cruise-concierge-brian-hill.replit.app';
  }
  
  console.log('🔗 Generated quote URL:', {
    token: token.substring(0, 10) + '...',
    baseUrl: baseUrl,
    fullUrl: `${baseUrl}/chat?quote=${token}`,
    source: process.env.BASE_URL && process.env.BASE_URL.trim() ? 'BASE_URL' :
            process.env.REPLIT_DEV_DOMAIN ? 'REPLIT_DEV_DOMAIN' : 
            process.env.REPLIT_DOMAINS ? 'REPLIT_DOMAINS' : 'fallback',
    envVars: {
      REPLIT_DEV_DOMAIN: process.env.REPLIT_DEV_DOMAIN || 'not set',
      BASE_URL: process.env.BASE_URL || 'not set',
      REPLIT_DOMAINS: process.env.REPLIT_DOMAINS ? process.env.REPLIT_DOMAINS.substring(0, 50) + '...' : 'not set'
    }
  });
  
  return `${baseUrl}/chat?quote=${token}`;
}
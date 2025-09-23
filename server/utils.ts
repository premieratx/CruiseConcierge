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
 * @param req Optional Express request object for fallback
 * @returns The full quote URL
 */
export function getQuoteUrl(token: string, req?: any): string {
  let baseUrl = '';
  
  // Priority 1: Use REPLIT_URL environment variable if available
  if (process.env.REPLIT_URL) {
    baseUrl = process.env.REPLIT_URL;
  }
  // Priority 2: Use Replit dev domain
  else if (process.env.REPLIT_DEV_DOMAIN) {
    baseUrl = `https://${process.env.REPLIT_DEV_DOMAIN}`;
  }
  // Priority 3: Use custom BASE_URL if configured
  else if (process.env.BASE_URL) {
    baseUrl = process.env.BASE_URL.replace(/\/$/, '');
  }
  // Priority 4: Use REPLIT_DOMAINS (deployed URL)
  else if (process.env.REPLIT_DOMAINS) {
    const domain = process.env.REPLIT_DOMAINS.split(',')[0];
    baseUrl = `https://${domain}`;
  }
  // Priority 5: Try to get from request headers (but avoid localhost)
  else if (req) {
    const protocol = req.headers['x-forwarded-proto'] || req.protocol || 'https';
    const host = req.headers['x-forwarded-host'] || req.get('host');
    
    // Avoid localhost URLs - they won't work from external devices
    if (host && !host.includes('localhost') && !host.includes('127.0.0.1')) {
      baseUrl = `${protocol}://${host}`;
    }
  }
  
  // Last resort: use the getPublicUrl function
  if (!baseUrl) {
    baseUrl = getPublicUrl();
  }
  
  // Remove trailing slash if present
  baseUrl = baseUrl.replace(/\/$/, '');
  
  console.log('🔗 Generated quote URL:', {
    token: token.substring(0, 10) + '...',
    baseUrl,
    fullUrl: `${baseUrl}/q/${token}`,
    source: process.env.REPLIT_URL ? 'REPLIT_URL' :
            process.env.REPLIT_DEV_DOMAIN ? 'REPLIT_DEV_DOMAIN' :
            process.env.BASE_URL ? 'BASE_URL' :
            process.env.REPLIT_DOMAINS ? 'REPLIT_DOMAINS' :
            req ? 'request' : 'getPublicUrl'
  });
  
  return `${baseUrl}/q/${token}`;
}
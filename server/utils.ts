/**
 * Utility functions for the server
 */

/**
 * Gets the public URL for the application.
 * Uses Replit environment variables when available, otherwise falls back to BASE_URL or a default.
 * @returns The public URL without trailing slash
 */
export function getPublicUrl(): string {
  // In Replit environment, use the dev domain
  if (process.env.REPLIT_DEV_DOMAIN) {
    return `https://${process.env.REPLIT_DEV_DOMAIN}`;
  }
  
  // Use custom BASE_URL if configured
  if (process.env.BASE_URL) {
    return process.env.BASE_URL.replace(/\/$/, ''); // Remove trailing slash if present
  }
  
  // In production deployment, check for REPLIT_DOMAINS (deployed URL)
  if (process.env.REPLIT_DOMAINS) {
    const domain = process.env.REPLIT_DOMAINS.split(',')[0]; // Take first domain if multiple
    return `https://${domain}`;
  }
  
  // Default fallback (should rarely be reached)
  return 'https://premierpartycruises.com';
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
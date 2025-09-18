import { randomBytes, createHmac, timingSafeEqual } from 'crypto';

export interface QuoteTokenPayload {
  quoteId: string;
  scope: 'quote:view' | 'quote:download' | 'quote:accept';
  exp: number; // expiration timestamp
  iat: number; // issued at timestamp
  aud: string; // audience (e.g., 'customer', 'admin')
}

export interface QuoteTokenOptions {
  expiresIn?: number; // milliseconds from now, default 7 days
  scope?: QuoteTokenPayload['scope'];
  audience?: string;
}

export class QuoteTokenService {
  private readonly secret: string;
  private readonly defaultExpiresIn: number = 7 * 24 * 60 * 60 * 1000; // 7 days

  constructor() {
    // Use environment variable or fallback to consistent secret
    this.secret = process.env.QUOTE_TOKEN_SECRET || '8f7e6d5c4b3a2918f7e6d5c4b3a2918f7e6d5c4b3a2918f7e6d5c4b3a291';
    
    if (!process.env.QUOTE_TOKEN_SECRET) {
      console.warn('⚠️ QUOTE_TOKEN_SECRET not set. Using fallback consistent secret.');
    }
  }

  private generateSecret(): string {
    return randomBytes(32).toString('hex');
  }

  /**
   * Generate a secure, signed, time-limited token for quote access
   */
  generateSecureToken(quoteId: string, options: QuoteTokenOptions = {}): string {
    const now = Date.now();
    const expiresIn = options.expiresIn || this.defaultExpiresIn;
    
    const payload: QuoteTokenPayload = {
      quoteId,
      scope: options.scope || 'quote:view',
      exp: now + expiresIn,
      iat: now,
      aud: options.audience || 'customer'
    };

    // Create the token parts
    const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'QT' })).toString('base64url');
    const payloadEncoded = Buffer.from(JSON.stringify(payload)).toString('base64url');
    
    // Create signature
    const signature = this.createSignature(`${header}.${payloadEncoded}`);
    
    const token = `${header}.${payloadEncoded}.${signature}`;
    
    console.log('🔐 Generated secure quote token:', {
      quoteId,
      scope: payload.scope,
      expiresAt: new Date(payload.exp).toISOString(),
      audience: payload.aud,
      tokenLength: token.length
    });

    return token;
  }

  /**
   * Verify and decode a quote token
   */
  verifyToken(token: string): { valid: boolean; payload?: QuoteTokenPayload; error?: string } {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        return { valid: false, error: 'Invalid token format' };
      }

      const [header, payloadEncoded, signature] = parts;
      
      // Verify signature
      const expectedSignature = this.createSignature(`${header}.${payloadEncoded}`);
      if (!this.timingSafeCompare(signature, expectedSignature)) {
        console.warn('🚨 Quote token signature verification failed');
        return { valid: false, error: 'Invalid signature' };
      }

      // Decode payload
      const payload: QuoteTokenPayload = JSON.parse(Buffer.from(payloadEncoded, 'base64url').toString());
      
      // Check expiration
      const now = Date.now();
      if (payload.exp < now) {
        console.warn('🚨 Quote token expired:', {
          quoteId: payload.quoteId,
          expiredAt: new Date(payload.exp).toISOString(),
          now: new Date(now).toISOString()
        });
        return { valid: false, error: 'Token expired' };
      }

      // Check issued at time (prevent future tokens)
      if (payload.iat > now + 60000) { // Allow 1 minute clock skew
        return { valid: false, error: 'Token issued in future' };
      }

      console.log('✅ Quote token verified successfully:', {
        quoteId: payload.quoteId,
        scope: payload.scope,
        audience: payload.aud,
        expiresAt: new Date(payload.exp).toISOString()
      });

      return { valid: true, payload };
    } catch (error: any) {
      console.error('❌ Quote token verification error:', error.message);
      return { valid: false, error: 'Token parsing error' };
    }
  }

  /**
   * Generate a secure quote URL with embedded token
   */
  generateSecureQuoteUrl(quoteId: string, baseUrl?: string, options: QuoteTokenOptions = {}): string {
    const token = this.generateSecureToken(quoteId, options);
    
    // Determine the base URL with fallbacks
    let effectiveBaseUrl = baseUrl || '';
    
    if (!effectiveBaseUrl) {
      // Fallback 1: Try environment variables
      if (process.env.REPLIT_DEV_DOMAIN) {
        effectiveBaseUrl = `https://${process.env.REPLIT_DEV_DOMAIN}`;
      } else if (process.env.BASE_URL) {
        effectiveBaseUrl = process.env.BASE_URL;
      } else if (process.env.REPLIT_DOMAINS) {
        const domain = process.env.REPLIT_DOMAINS.split(',')[0];
        effectiveBaseUrl = `https://${domain}`;
      }
    }
    
    // Clean the base URL
    const cleanBaseUrl = effectiveBaseUrl.replace(/\/$/, '');
    
    if (!cleanBaseUrl) {
      console.error('❌ CRITICAL: No base URL available for quote URL generation');
      console.error('Available env vars:', {
        REPLIT_DEV_DOMAIN: process.env.REPLIT_DEV_DOMAIN,
        BASE_URL: process.env.BASE_URL,
        REPLIT_DOMAINS: process.env.REPLIT_DOMAINS,
        providedBaseUrl: baseUrl
      });
      // In case of complete failure, return a relative URL that might work
      return `/quote/${encodeURIComponent(quoteId)}?token=${encodeURIComponent(token)}`;
    }
    
    const url = `${cleanBaseUrl}/quote/${encodeURIComponent(quoteId)}?token=${encodeURIComponent(token)}`;
    
    console.log('🔗 Generated secure quote URL:', {
      quoteId,
      providedBaseUrl: baseUrl || 'none',
      effectiveBaseUrl: cleanBaseUrl,
      isFullUrl: url.startsWith('http'),
      scope: options.scope || 'quote:view',
      expiresIn: options.expiresIn || this.defaultExpiresIn,
      urlPreview: url.substring(0, 100) + '...'
    });

    return url;
  }

  /**
   * Refresh a token (generate new token with extended expiry)
   */
  refreshToken(oldToken: string, options: QuoteTokenOptions = {}): { success: boolean; token?: string; error?: string } {
    const verification = this.verifyToken(oldToken);
    
    if (!verification.valid || !verification.payload) {
      return { success: false, error: verification.error };
    }

    // Generate new token with same quoteId but extended expiry
    const newToken = this.generateSecureToken(
      verification.payload.quoteId,
      {
        ...options,
        scope: verification.payload.scope,
        audience: verification.payload.aud
      }
    );

    console.log('🔄 Refreshed quote token:', {
      quoteId: verification.payload.quoteId,
      oldExpiry: new Date(verification.payload.exp).toISOString(),
      newExpiry: new Date(Date.now() + (options.expiresIn || this.defaultExpiresIn)).toISOString()
    });

    return { success: true, token: newToken };
  }

  /**
   * Revoke a token by adding it to a blacklist (in-memory for now)
   */
  private revokedTokens = new Set<string>();

  revokeToken(token: string): boolean {
    const verification = this.verifyToken(token);
    if (!verification.valid) {
      return false;
    }

    this.revokedTokens.add(token);
    
    console.log('🚫 Revoked quote token:', {
      quoteId: verification.payload?.quoteId,
      revokedAt: new Date().toISOString()
    });

    return true;
  }

  /**
   * Check if token is revoked
   */
  isTokenRevoked(token: string): boolean {
    return this.revokedTokens.has(token);
  }

  /**
   * Create HMAC signature
   */
  private createSignature(data: string): string {
    return createHmac('sha256', this.secret)
      .update(data)
      .digest('base64url');
  }

  /**
   * Timing-safe string comparison to prevent timing attacks
   */
  private timingSafeCompare(a: string, b: string): boolean {
    if (a.length !== b.length) {
      return false;
    }
    return timingSafeEqual(Buffer.from(a), Buffer.from(b));
  }

  /**
   * Get token info without verification (for debugging)
   */
  decodeTokenUnsafe(token: string): QuoteTokenPayload | null {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      
      const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString());
      return payload as QuoteTokenPayload;
    } catch {
      return null;
    }
  }

  /**
   * Clean up expired revoked tokens (should be called periodically)
   */
  cleanupExpiredTokens(): number {
    const now = Date.now();
    let cleaned = 0;

    for (const token of this.revokedTokens) {
      const payload = this.decodeTokenUnsafe(token);
      if (payload && payload.exp < now) {
        this.revokedTokens.delete(token);
        cleaned++;
      }
    }

    if (cleaned > 0) {
      console.log(`🧹 Cleaned up ${cleaned} expired revoked tokens`);
    }

    return cleaned;
  }
}

// Export singleton instance
export const quoteTokenService = new QuoteTokenService();
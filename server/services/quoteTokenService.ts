import { randomBytes, createHmac, timingSafeEqual } from 'crypto';
import { getPublicUrl } from '../utils';
import { googleSheetsService } from './googleSheets';

export interface QuoteTokenPayload {
  quoteId: string;
  leadId?: string; // NEW: Include leadId to fetch complete data from Google Sheets
  scope: 'quote:view' | 'quote:download' | 'quote:accept';
  exp: number; // expiration timestamp
  iat: number; // issued at timestamp
  aud: string; // audience (e.g., 'customer', 'admin')
}

export interface EnhancedQuoteTokenPayload extends QuoteTokenPayload {
  leadData?: any; // Complete lead data from Google Sheets
}

export interface QuoteTokenOptions {
  expiresIn?: number; // milliseconds from now, default 7 days
  scope?: QuoteTokenPayload['scope'];
  audience?: string;
  leadId?: string; // NEW: Include leadId for complete data fetching
}

export class QuoteTokenService {
  private readonly secret: string;
  private readonly defaultExpiresIn: number = 7 * 24 * 60 * 60 * 1000; // 7 days

  constructor() {
    // SECURITY: QUOTE_TOKEN_SECRET must be set in environment variables - no fallback allowed
    this.secret = process.env.QUOTE_TOKEN_SECRET;
    
    if (!this.secret) {
      if (process.env.NODE_ENV === 'development') {
        this.secret = 'dev-only-insecure-token-secret-do-not-use-in-production';
        console.log('⚠️ Using dev-only QUOTE_TOKEN_SECRET (not for production)');
      } else {
        const error = 'CRITICAL SECURITY ERROR: QUOTE_TOKEN_SECRET environment variable not set. This is required for secure token generation.';
        console.error('🚨', error);
        console.error('💡 Set QUOTE_TOKEN_SECRET environment variable to a secure 32-byte hex string');
        console.error('   Example: export QUOTE_TOKEN_SECRET="3a291fc3dd81fdea8989406574ed05a6f29240a7a31525fd91d5ab8fda7cc090"');
        throw new Error(error);
      }
    }
    
    console.log('🔐 QUOTE_TOKEN_SECRET configured securely from environment');
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
      leadId: options.leadId, // NEW: Include leadId for complete data fetching
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
      leadId: payload.leadId,
      scope: payload.scope,
      expiresAt: new Date(payload.exp).toISOString(),
      audience: payload.aud,
      tokenLength: token.length
    });

    return token;
  }

  /**
   * Verify and decode a quote token with complete lead data
   */
  async verifyTokenWithLeadData(token: string): Promise<{ valid: boolean; payload?: EnhancedQuoteTokenPayload; error?: string }> {
    const basicVerification = this.verifyToken(token);
    
    if (!basicVerification.valid || !basicVerification.payload) {
      return basicVerification;
    }

    const payload = basicVerification.payload;
    
    // If leadId is available, fetch complete lead data from Google Sheets
    let leadData;
    if (payload.leadId) {
      console.log(`🔍 Fetching complete lead data for leadId: ${payload.leadId}`);
      try {
        const leadResult = await googleSheetsService.getCompleteLeadData(payload.leadId);
        if (leadResult.success && leadResult.leadData) {
          leadData = leadResult.leadData;
          console.log(`✅ Successfully fetched complete lead data for token verification`);
        } else {
          console.warn(`⚠️ Could not fetch lead data for leadId: ${payload.leadId}`);
        }
      } catch (error: any) {
        console.error(`❌ Error fetching lead data for token verification:`, error.message);
      }
    }

    const enhancedPayload: EnhancedQuoteTokenPayload = {
      ...payload,
      leadData
    };

    console.log(`✅ Token verified with enhanced lead data:`, {
      quoteId: payload.quoteId,
      leadId: payload.leadId,
      hasLeadData: !!leadData,
      leadDataFields: leadData ? Object.keys(leadData).length : 0
    });

    return {
      valid: true,
      payload: enhancedPayload
    };
  }

  /**
   * Verify and decode a quote token (basic version)
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
   * Generate a secure quote URL with embedded token including lead data
   */
  generateSecureQuoteUrl(quoteId: string, baseUrl?: string, options: QuoteTokenOptions = {}): string {
    const token = this.generateSecureToken(quoteId, options);
    
    // Use the provided baseUrl or get the public URL from utils
    const effectiveBaseUrl = baseUrl || getPublicUrl();
    
    // Clean the base URL (remove trailing slash)
    const cleanBaseUrl = effectiveBaseUrl.replace(/\/$/, '');
    
    // Use /quote/ path for dedicated QuoteViewer component
    const url = `${cleanBaseUrl}/quote/${encodeURIComponent(token)}`;
    
    console.log('🔗 Generated secure quote URL with lead data:', {
      quoteId,
      leadId: options.leadId,
      providedBaseUrl: baseUrl || 'auto-detected',
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
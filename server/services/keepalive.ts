import { db } from '../db';
import { sql } from 'drizzle-orm';

/**
 * Keepalive Service - Prevents Neon database from going to sleep
 * 
 * Neon databases on free/scale-to-zero plans go dormant after ~5 minutes of inactivity.
 * This service pings the database every 4 minutes to keep it active and prevent:
 * - Cold start delays (500ms-2s)
 * - Control plane timeout errors
 * - 500 errors on production pages
 */
export class KeepaliveService {
  private intervalId: NodeJS.Timeout | null = null;
  private readonly PING_INTERVAL_MS = 4 * 60 * 1000; // 4 minutes
  private isRunning = false;
  private pingCount = 0;
  private lastPingTime: Date | null = null;
  private lastError: Error | null = null;

  /**
   * Start the keepalive service
   */
  start() {
    if (this.isRunning) {
      console.log('⏭️ Keepalive service already running');
      return;
    }

    console.log('🏓 Starting keepalive service - will ping database every 4 minutes');
    
    // Ping immediately on start to wake database
    this.ping();
    
    // Set up recurring pings
    this.intervalId = setInterval(() => {
      this.ping();
    }, this.PING_INTERVAL_MS);
    
    this.isRunning = true;
  }

  /**
   * Stop the keepalive service
   */
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.isRunning = false;
      console.log('🛑 Keepalive service stopped');
    }
  }

  /**
   * Ping the database to keep it awake
   */
  private async ping() {
    try {
      const startTime = Date.now();
      
      // Simple query that doesn't modify data but keeps connection alive
      const result = await db.execute(sql`SELECT 1 as ping`);
      
      const duration = Date.now() - startTime;
      this.pingCount++;
      this.lastPingTime = new Date();
      this.lastError = null;
      
      console.log(`✅ Keepalive ping #${this.pingCount} successful (${duration}ms)`);
    } catch (error) {
      this.lastError = error as Error;
      console.error('❌ Keepalive ping failed:', error);
    }
  }

  /**
   * Get service status
   */
  getStatus() {
    return {
      isRunning: this.isRunning,
      pingCount: this.pingCount,
      lastPingTime: this.lastPingTime,
      lastError: this.lastError?.message || null,
      nextPingIn: this.isRunning 
        ? `${Math.round((this.PING_INTERVAL_MS - (Date.now() - (this.lastPingTime?.getTime() || Date.now()))) / 1000)}s`
        : 'N/A',
    };
  }

  /**
   * Force a manual ping (useful for health checks)
   */
  async forcePing() {
    await this.ping();
    return this.getStatus();
  }
}

// Export singleton instance
export const keepaliveService = new KeepaliveService();

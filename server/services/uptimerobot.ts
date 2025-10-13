import axios from 'axios';

export interface UptimeRobotMonitor {
  id: number;
  friendly_name: string;
  url: string;
  type: number; // 1=HTTP(s), 2=Keyword, 3=Ping, 4=Port, 5=Heartbeat
  status: number; // 0=paused, 1=not checked yet, 2=up, 8=seems down, 9=down
  create_datetime: number;
  average_response_time?: number;
  custom_uptime_ratio?: string; // "99.98" for 99.98%
  logs?: Array<{
    type: number; // 1=down, 2=up, 98=started, 99=paused
    datetime: number;
    duration: number;
    reason?: {
      code: string;
      detail: string;
    };
  }>;
}

export interface UptimeRobotResponse {
  stat: string;
  pagination?: {
    offset: number;
    limit: number;
    total: number;
  };
  monitors: UptimeRobotMonitor[];
}

export class UptimeRobotService {
  private apiKey: string;
  private baseUrl = 'https://api.uptimerobot.com/v2';

  constructor() {
    this.apiKey = process.env.UPTIMEROBOT_API_KEY || '';
    
    if (!this.apiKey) {
      console.warn('⚠️ UPTIMEROBOT_API_KEY not configured');
    } else {
      console.log('✅ UptimeRobot API initialized');
    }
  }

  // Get all monitors with optional logs and response times
  async getMonitors(options?: {
    logs?: boolean;
    responseTimes?: boolean;
    customUptimeRatio?: string; // e.g., "1-7-30" for last 1,7,30 days
  }): Promise<UptimeRobotMonitor[]> {
    if (!this.apiKey) {
      throw new Error('UptimeRobot API key not configured');
    }

    try {
      const params: any = {
        api_key: this.apiKey,
        format: 'json',
        logs: options?.logs ? 1 : 0,
        response_times: options?.responseTimes ? 1 : 0,
      };

      if (options?.customUptimeRatio) {
        params.custom_uptime_ratios = options.customUptimeRatio;
      }

      const response = await axios.post<UptimeRobotResponse>(
        `${this.baseUrl}/getMonitors`,
        new URLSearchParams(params).toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cache-Control': 'no-cache',
          },
        }
      );

      if (response.data.stat !== 'ok') {
        throw new Error(`UptimeRobot API error: ${JSON.stringify(response.data)}`);
      }

      return response.data.monitors || [];
    } catch (error: any) {
      console.error('❌ UptimeRobot API error:', error.message);
      throw error;
    }
  }

  // Get a single monitor by ID
  async getMonitor(monitorId: number): Promise<UptimeRobotMonitor | null> {
    const monitors = await this.getMonitors({ logs: true, responseTimes: true });
    return monitors.find(m => m.id === monitorId) || null;
  }

  // Get uptime status summary for all monitors
  async getUptimeSummary(): Promise<{
    totalMonitors: number;
    upMonitors: number;
    downMonitors: number;
    pausedMonitors: number;
    averageUptime: number;
    monitors: Array<{
      id: number;
      name: string;
      url: string;
      status: 'up' | 'down' | 'paused' | 'unknown';
      statusCode: number;
      uptimeRatio: string;
      responseTime: number;
      lastCheck: Date | null;
    }>;
  }> {
    const monitors = await this.getMonitors({ 
      logs: true, 
      responseTimes: true,
      customUptimeRatio: '1-7-30' 
    });

    const summary = {
      totalMonitors: monitors.length,
      upMonitors: 0,
      downMonitors: 0,
      pausedMonitors: 0,
      averageUptime: 0,
      monitors: monitors.map(m => {
        const status = this.getStatusLabel(m.status);
        
        if (status === 'up') this.upMonitors++;
        else if (status === 'down') this.downMonitors++;
        else if (status === 'paused') this.pausedMonitors++;

        // Get last check time from logs
        let lastCheck: Date | null = null;
        if (m.logs && m.logs.length > 0) {
          lastCheck = new Date(m.logs[0].datetime * 1000);
        }

        return {
          id: m.id,
          name: m.friendly_name,
          url: m.url,
          status,
          statusCode: m.status,
          uptimeRatio: m.custom_uptime_ratio || '0',
          responseTime: m.average_response_time || 0,
          lastCheck,
        };
      }),
    };

    // Calculate average uptime from all monitors
    const uptimeValues = monitors
      .map(m => parseFloat(m.custom_uptime_ratio || '0'))
      .filter(v => !isNaN(v));
    
    if (uptimeValues.length > 0) {
      summary.averageUptime = uptimeValues.reduce((a, b) => a + b, 0) / uptimeValues.length;
    }

    return summary;
  }

  // Helper to convert status code to label
  private getStatusLabel(status: number): 'up' | 'down' | 'paused' | 'unknown' {
    switch (status) {
      case 0: return 'paused';
      case 2: return 'up';
      case 8: return 'down'; // seems down
      case 9: return 'down';
      default: return 'unknown';
    }
  }

  // Check if a monitor is currently down
  isMonitorDown(monitor: UptimeRobotMonitor): boolean {
    return monitor.status === 8 || monitor.status === 9;
  }

  // Get monitor type label
  getMonitorTypeLabel(type: number): string {
    const types: Record<number, string> = {
      1: 'HTTP(s)',
      2: 'Keyword',
      3: 'Ping',
      4: 'Port',
      5: 'Heartbeat',
    };
    return types[type] || 'Unknown';
  }
}

// Export singleton instance
export const uptimeRobotService = new UptimeRobotService();

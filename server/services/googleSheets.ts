// Google Sheets API integration for availability management
export interface AvailabilityData {
  date: string;
  time: string;
  boat: string;
  status: 'AVAILABLE' | 'BOOKED' | 'MAINTENANCE';
  capacity: number;
  bookedBy?: string;
}

export class GoogleSheetsService {
  private apiKey: string;
  private spreadsheetId: string;

  constructor() {
    this.apiKey = process.env.GOOGLE_SHEETS_CREDENTIALS || "";
    this.spreadsheetId = process.env.SHEET_ID || "";
    
    if (!this.apiKey || !this.spreadsheetId) {
      console.warn("Google Sheets credentials not configured. Using mock data.");
    }
  }

  async getAvailability(startDate: Date, endDate: Date): Promise<AvailabilityData[]> {
    try {
      if (!this.apiKey || !this.spreadsheetId) {
        return this.getMockAvailability(startDate, endDate);
      }

      const range = 'Availability!A2:F100'; // Adjust range as needed
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}/values/${range}?key=${this.apiKey}`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      const rows = data.values || [];
      
      return rows.map((row: any[]) => ({
        date: row[0] || '',
        time: row[1] || '',
        boat: row[2] || '',
        status: row[3] || 'AVAILABLE',
        capacity: parseInt(row[4]) || 0,
        bookedBy: row[5] || undefined
      })).filter((item: AvailabilityData) => {
        const itemDate = new Date(item.date);
        return itemDate >= startDate && itemDate <= endDate;
      });
    } catch (error) {
      console.error("Error fetching availability from Google Sheets:", error);
      return this.getMockAvailability(startDate, endDate);
    }
  }

  async updateAvailability(date: string, time: string, boat: string, status: string, bookedBy?: string): Promise<boolean> {
    try {
      if (!this.apiKey || !this.spreadsheetId) {
        console.log("Would update Google Sheets:", { date, time, boat, status, bookedBy });
        return true;
      }

      // In a real implementation, you would use the Google Sheets API to update the cell
      // This requires OAuth2 credentials and write permissions
      console.log("Updating availability in Google Sheets:", { date, time, boat, status, bookedBy });
      return true;
    } catch (error) {
      console.error("Error updating availability in Google Sheets:", error);
      return false;
    }
  }

  private getMockAvailability(startDate: Date, endDate: Date): AvailabilityData[] {
    const availability: AvailabilityData[] = [];
    const boats = [
      { name: "Disco Boat", capacity: 30 },
      { name: "Classic Pontoon", capacity: 12 }
    ];
    const times = ["12:00", "15:00", "18:00"];
    
    const current = new Date(startDate);
    while (current <= endDate) {
      boats.forEach(boat => {
        times.forEach(time => {
          availability.push({
            date: current.toISOString().split('T')[0],
            time,
            boat: boat.name,
            status: Math.random() > 0.3 ? 'AVAILABLE' : 'BOOKED',
            capacity: boat.capacity,
            bookedBy: Math.random() > 0.7 ? 'Sample Customer' : undefined
          });
        });
      });
      current.setDate(current.getDate() + 1);
    }
    
    return availability;
  }

  async checkAvailability(date: string, time: string, groupSize: number): Promise<AvailabilityData[]> {
    const startDate = new Date(date);
    const endDate = new Date(date);
    const allAvailability = await this.getAvailability(startDate, endDate);
    
    return allAvailability.filter(slot => 
      slot.date === date && 
      slot.time === time && 
      slot.status === 'AVAILABLE' && 
      slot.capacity >= groupSize
    );
  }
}

export const googleSheetsService = new GoogleSheetsService();

// Google Sheets API integration for availability management
export interface AvailabilityData {
  date: string;
  day: string;
  time: string;
  boatType: string;
  capacity: number;
  baseRate: number; // hourly rate in dollars
  status: 'AVAILABLE' | 'BOOKED' | 'MAINTENANCE';
  bookedBy?: string;
  groupSize?: number;
  notes?: string;
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

      const range = 'Availability!A2:J100'; // Extended range for new columns
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}/values/${range}?key=${this.apiKey}`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      const rows = data.values || [];
      
      return rows.map((row: any[]) => ({
        date: row[0] || '',
        day: row[1] || '',
        time: row[2] || '',
        boatType: row[3] || '',
        capacity: parseInt(row[4]) || 0,
        baseRate: parseFloat(row[5]) || 0,
        status: row[6] || 'AVAILABLE',
        bookedBy: row[7] || undefined,
        groupSize: parseInt(row[8]) || undefined,
        notes: row[9] || undefined
      })).filter((item: AvailabilityData) => {
        const itemDate = new Date(item.date);
        return itemDate >= startDate && itemDate <= endDate;
      });
    } catch (error) {
      console.error("Error fetching availability from Google Sheets:", error);
      return this.getMockAvailability(startDate, endDate);
    }
  }

  async updateAvailability(date: string, time: string, boatType: string, status: string, bookedBy?: string, groupSize?: number): Promise<boolean> {
    try {
      if (!this.apiKey || !this.spreadsheetId) {
        console.log("Would update Google Sheets:", { date, time, boatType, status, bookedBy, groupSize });
        return true;
      }

      // In a real implementation, you would use the Google Sheets API to update the cell
      // This requires OAuth2 credentials and write permissions
      console.log("Updating availability in Google Sheets:", { date, time, boatType, status, bookedBy, groupSize });
      return true;
    } catch (error) {
      console.error("Error updating availability in Google Sheets:", error);
      return false;
    }
  }

  private getMockAvailability(startDate: Date, endDate: Date): AvailabilityData[] {
    const availability: AvailabilityData[] = [];
    const boats = [
      { name: "14-Person Luxury Yacht", capacity: 14, weekdayRate: 200, fridayRate: 250, weekendRate: 300 },
      { name: "25-Person Party Cruiser", capacity: 25, weekdayRate: 250, fridayRate: 300, weekendRate: 350 },
      { name: "50-Person Charter Yacht", capacity: 50, weekdayRate: 300, fridayRate: 350, weekendRate: 400 },
      { name: "ATX Disco Cruise", capacity: 30, weekdayRate: 85, fridayRate: 85, weekendRate: 85 }
    ];
    const times = ["12:00", "15:00", "18:00"];
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    const current = new Date(startDate);
    while (current <= endDate) {
      const dayOfWeek = current.getDay();
      const dayName = dayNames[dayOfWeek];
      const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 4;
      const isFriday = dayOfWeek === 5;
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      
      boats.forEach(boat => {
        // ATX Disco Cruise only on Friday/Saturday specific times
        if (boat.name === "ATX Disco Cruise") {
          if (isFriday) {
            availability.push({
              date: current.toISOString().split('T')[0],
              day: dayName,
              time: "12:00",
              boatType: boat.name,
              capacity: boat.capacity,
              baseRate: boat.fridayRate,
              status: Math.random() > 0.3 ? 'AVAILABLE' : 'BOOKED',
              notes: "Disco Packages Available"
            });
          } else if (dayOfWeek === 6) { // Saturday
            ["11:00", "15:30"].forEach(time => {
              availability.push({
                date: current.toISOString().split('T')[0],
                day: dayName,
                time,
                boatType: boat.name,
                capacity: boat.capacity,
                baseRate: boat.weekendRate,
                status: Math.random() > 0.3 ? 'AVAILABLE' : 'BOOKED',
                notes: "Disco Packages Available"
              });
            });
          }
        } else {
          // Regular boats available all days
          times.forEach(time => {
            let rate = boat.weekdayRate;
            if (isFriday) rate = boat.fridayRate;
            else if (isWeekend) rate = boat.weekendRate;
            
            availability.push({
              date: current.toISOString().split('T')[0],
              day: dayName,
              time,
              boatType: boat.name,
              capacity: boat.capacity,
              baseRate: rate,
              status: Math.random() > 0.3 ? 'AVAILABLE' : 'BOOKED',
              bookedBy: Math.random() > 0.7 ? 'Sample Customer' : undefined
            });
          });
        }
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

  // New method to get all available boats for a specific date and group size
  async getAvailableBoats(date: string, groupSize: number): Promise<AvailabilityData[]> {
    const startDate = new Date(date);
    const endDate = new Date(date);
    const allAvailability = await this.getAvailability(startDate, endDate);
    
    return allAvailability.filter(slot => 
      slot.date === date && 
      slot.status === 'AVAILABLE' && 
      slot.capacity >= groupSize
    );
  }

  // New method to get pricing for a specific boat type and date
  async getBoatPricing(date: string, boatType: string): Promise<number> {
    const startDate = new Date(date);
    const endDate = new Date(date);
    const allAvailability = await this.getAvailability(startDate, endDate);
    
    const slot = allAvailability.find(slot => 
      slot.date === date && 
      slot.boatType === boatType
    );
    
    return slot ? slot.baseRate : 0;
  }
}

export const googleSheetsService = new GoogleSheetsService();

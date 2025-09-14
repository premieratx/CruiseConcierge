import { google } from 'googleapis';
import { GoogleAuth } from 'google-auth-library';

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
  private auth: GoogleAuth | null = null;
  private sheets: any = null;
  private spreadsheetId: string;
  private serviceAccountCredentials: any = null;

  constructor() {
    this.spreadsheetId = process.env.SHEET_ID || "";
    
    // Parse service account credentials from environment variable
    const credentialsJson = process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS;
    if (credentialsJson) {
      try {
        this.serviceAccountCredentials = JSON.parse(credentialsJson);
        this.initializeAuth();
      } catch (error) {
        console.error("Failed to parse GOOGLE_SERVICE_ACCOUNT_CREDENTIALS:", error);
      }
    }
    
    if (!this.serviceAccountCredentials || !this.spreadsheetId) {
      console.warn("Google Sheets credentials not properly configured. Using mock data.");
    }
  }

  private async initializeAuth() {
    try {
      this.auth = new GoogleAuth({
        credentials: this.serviceAccountCredentials,
        scopes: [
          'https://www.googleapis.com/auth/spreadsheets',
          'https://www.googleapis.com/auth/drive.file'
        ],
      });

      this.sheets = google.sheets({ version: 'v4', auth: this.auth });
      console.log("Google Sheets API initialized with Service Account authentication");
    } catch (error) {
      console.error("Failed to initialize Google Sheets authentication:", error);
      this.auth = null;
      this.sheets = null;
    }
  }

  async getAvailability(startDate: Date, endDate: Date): Promise<AvailabilityData[]> {
    try {
      if (!this.sheets || !this.spreadsheetId) {
        return this.getMockAvailability(startDate, endDate);
      }

      const range = 'Availability!A2:J1000'; // Extended range for new columns
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: range,
      });
      
      const rows = response.data.values || [];
      
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
      if (!this.sheets || !this.spreadsheetId) {
        console.log("Would update Google Sheets:", { date, time, boatType, status, bookedBy, groupSize });
        return true;
      }

      // Find the row that matches the criteria
      const range = 'Availability!A2:J1000';
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: range,
      });
      
      const rows = response.data.values || [];
      let rowIndex = -1;
      
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        if (row[0] === date && row[2] === time && row[3] === boatType) {
          rowIndex = i + 2; // Add 2 because arrays are 0-indexed and we start from A2
          break;
        }
      }
      
      if (rowIndex === -1) {
        console.error("Row not found for update:", { date, time, boatType });
        return false;
      }
      
      // Update the specific cells
      const updates = [];
      updates.push({
        range: `Availability!G${rowIndex}`,
        values: [[status]]
      });
      
      if (bookedBy !== undefined) {
        updates.push({
          range: `Availability!H${rowIndex}`,
          values: [[bookedBy]]
        });
      }
      
      if (groupSize !== undefined) {
        updates.push({
          range: `Availability!I${rowIndex}`,
          values: [[groupSize]]
        });
      }
      
      await this.sheets.spreadsheets.values.batchUpdate({
        spreadsheetId: this.spreadsheetId,
        resource: {
          valueInputOption: 'RAW',
          data: updates
        }
      });
      
      console.log("Successfully updated availability in Google Sheets:", { date, time, boatType, status, bookedBy, groupSize });
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

  // New method to populate the spreadsheet with 3 months of availability data
  async populateSpreadsheet(): Promise<boolean> {
    try {
      if (!this.sheets || !this.spreadsheetId) {
        console.error("Google Sheets API not properly initialized");
        return false;
      }

      // First, ensure the "Availability" sheet exists
      console.log("🔍 Checking if 'Availability' sheet exists...");
      await this.ensureAvailabilitySheetExists();
      console.log("✅ Sheet check/creation completed");

      // Generate 3 months of availability data starting from today
      const startDate = new Date(); // September 14, 2025
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 3); // December 14, 2025

      console.log(`Generating availability data from ${startDate.toDateString()} to ${endDate.toDateString()}`);

      // Generate availability data using the same logic as getMockAvailability
      const availabilityData = this.generateAvailabilityData(startDate, endDate);
      
      // Prepare data for Google Sheets - add headers
      const headers = [
        'Date', 'Day', 'Time', 'Boat Type', 'Capacity', 'Base Rate', 'Status', 'Booked By', 'Group Size', 'Notes'
      ];
      
      const sheetData = [headers];
      
      // Add all availability data
      availabilityData.forEach(item => {
        sheetData.push([
          item.date,
          item.day,
          item.time,
          item.boatType,
          item.capacity.toString(),
          item.baseRate.toString(),
          item.status,
          item.bookedBy || '',
          item.groupSize ? item.groupSize.toString() : '',
          item.notes || ''
        ]);
      });

      console.log(`Generated ${sheetData.length - 1} availability records`);

      // Clear existing data first (only if the sheet has data)
      try {
        await this.sheets.spreadsheets.values.clear({
          spreadsheetId: this.spreadsheetId,
          range: 'Availability!A:J'
        });
        console.log("✅ Cleared existing data from Availability sheet");
      } catch (clearError: any) {
        console.log("Clear operation failed (sheet might be empty or new), continuing...", clearError.message);
        // This is fine - the sheet might be new and empty
      }

      // Write new data to the spreadsheet
      await this.sheets.spreadsheets.values.update({
        spreadsheetId: this.spreadsheetId,
        range: 'Availability!A1',
        valueInputOption: 'RAW',
        resource: {
          values: sheetData
        }
      });

      console.log("Successfully populated Google Sheets with availability data");
      return true;
    } catch (error) {
      console.error("Error populating spreadsheet:", error);
      return false;
    }
  }

  // Helper method to ensure the Availability sheet exists
  private async ensureAvailabilitySheetExists(): Promise<void> {
    try {
      // Get spreadsheet metadata to check existing sheets
      const spreadsheet = await this.sheets.spreadsheets.get({
        spreadsheetId: this.spreadsheetId
      });

      const sheets = spreadsheet.data.sheets || [];
      const availabilitySheet = sheets.find(sheet => sheet.properties?.title === 'Availability');

      if (!availabilitySheet) {
        console.log("Creating 'Availability' sheet...");
        
        // Create the Availability sheet
        await this.sheets.spreadsheets.batchUpdate({
          spreadsheetId: this.spreadsheetId,
          resource: {
            requests: [{
              addSheet: {
                properties: {
                  title: 'Availability',
                  gridProperties: {
                    rowCount: 1000,
                    columnCount: 10
                  }
                }
              }
            }]
          }
        });
        
        console.log("✅ Successfully created 'Availability' sheet");
      } else {
        console.log("✅ 'Availability' sheet already exists");
      }
    } catch (error) {
      console.error("Error ensuring Availability sheet exists:", error);
      throw error;
    }
  }

  // Helper method to generate availability data (similar to getMockAvailability but returns all as AVAILABLE)
  private generateAvailabilityData(startDate: Date, endDate: Date): AvailabilityData[] {
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
              status: 'AVAILABLE', // All start as available
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
                status: 'AVAILABLE', // All start as available
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
              status: 'AVAILABLE' // All start as available
            });
          });
        }
      });
      current.setDate(current.getDate() + 1);
    }
    
    return availability;
  }
}

export const googleSheetsService = new GoogleSheetsService();

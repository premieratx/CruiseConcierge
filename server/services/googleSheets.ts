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

// Google Sheets API integration for lead tracking
export interface LeadData {
  leadId: string;
  createdDate: string;
  name: string;
  email: string;
  phone?: string;
  eventType?: string;
  eventTypeLabel?: string;
  cruiseDate?: string;
  groupSize?: number;
  boatType?: string;
  discoPackage?: string;
  timeSlot?: string;
  status: 'NEW' | 'CONTACT_INFO' | 'DATE_SELECTED' | 'OPTIONS_SELECTED' | 'QUOTED' | 'BOOKED' | 'LOST';
  progress: 'started' | 'contact_complete' | 'date_selected' | 'size_selected' | 'options_selected' | 'complete';
  lastUpdated: string;
  source: string;
  specialRequests?: string;
  budget?: string;
  projectId?: string;
  notes?: string;
  quoteUrl?: string;
  quoteId?: string;
}

// Google Sheets API integration for partial lead tracking
export interface PartialLeadData {
  partialLeadId: string;
  sessionId: string;
  createdDate: string;
  name?: string;
  email?: string;
  phone?: string;
  eventType?: string;
  eventTypeLabel?: string;
  preferredDate?: string;
  groupSize?: number;
  chatbotData?: any;
  quoteId?: string;
  status: 'partial' | 'abandoned' | 'contacted' | 'converted';
  lastUpdated: string;
  abandonedAt?: string;
  convertedToContactId?: string;
  source: string;
  notes?: string;
  quoteUrl?: string;
}

export type LeadProgressStage = 'started' | 'contact_complete' | 'date_selected' | 'size_selected' | 'options_selected' | 'complete';
export type LeadStatus = 'NEW' | 'CONTACT_INFO' | 'DATE_SELECTED' | 'OPTIONS_SELECTED' | 'QUOTED' | 'BOOKED' | 'LOST';

export interface LeadUpdateData {
  name?: string;
  email?: string;
  phone?: string;
  eventType?: string;
  eventTypeLabel?: string;
  cruiseDate?: string;
  groupSize?: number;
  boatType?: string;
  discoPackage?: string;
  timeSlot?: string;
  status?: LeadStatus;
  progress?: LeadProgressStage;
  specialRequests?: string;
  budget?: string;
  projectId?: string;
  notes?: string;
  quoteUrl?: string;
  quoteId?: string;
}

export class GoogleSheetsService {
  private auth: GoogleAuth | null = null;
  private sheets: any = null;
  private spreadsheetId: string;
  private serviceAccountCredentials: any = null;
  private maxRetries: number = 3;
  private baseDelay: number = 1000; // 1 second

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

  // Enhanced retry mechanism with exponential backoff
  private async withRetry<T>(
    operation: () => Promise<T>,
    operationName: string,
    maxRetries: number = this.maxRetries
  ): Promise<T> {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const result = await operation();
        if (attempt > 1) {
          console.log(`✅ ${operationName} succeeded on attempt ${attempt}`);
        }
        return result;
      } catch (error: any) {
        console.error(`❌ ${operationName} failed on attempt ${attempt}:`, error.message);
        
        if (attempt === maxRetries) {
          console.error(`💥 ${operationName} failed after ${maxRetries} attempts`);
          throw error;
        }
        
        // Check if it's a retryable error
        const isRetryable = this.isRetryableError(error);
        if (!isRetryable) {
          console.error(`🚫 ${operationName} encountered non-retryable error, giving up`);
          throw error;
        }
        
        // Exponential backoff with jitter
        const delay = this.baseDelay * Math.pow(2, attempt - 1) + Math.random() * 1000;
        console.log(`⏱️ Retrying ${operationName} in ${Math.round(delay)}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    throw new Error(`Max retries exceeded for ${operationName}`);
  }

  // Check if error is retryable
  private isRetryableError(error: any): boolean {
    if (!error.code && !error.status) return true; // Unknown errors are retryable
    
    // HTTP status codes that are retryable
    const retryableStatuses = [408, 429, 500, 502, 503, 504];
    if (error.status && retryableStatuses.includes(error.status)) {
      return true;
    }
    
    // Google API specific error codes that are retryable
    const retryableCodes = ['RATE_LIMIT_EXCEEDED', 'INTERNAL_ERROR', 'BACKEND_ERROR'];
    if (error.code && retryableCodes.includes(error.code)) {
      return true;
    }
    
    return false;
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
      { name: "boat_day_tripper", displayName: "Day Tripper", capacity: 14, weekdayRate: 200, fridayRate: 250, weekendRate: 300 },
      { name: "boat_me_seeks_the_irony", displayName: "Me Seeks The Irony", capacity: 30, weekdayRate: 250, fridayRate: 300, weekendRate: 350 },
      { name: "boat_clever_girl", displayName: "Clever Girl", capacity: 75, weekdayRate: 300, fridayRate: 350, weekendRate: 400 },
      { name: "boat_atx_disco", displayName: "ATX Disco Cruise", capacity: 100, weekdayRate: 85, fridayRate: 85, weekendRate: 85 }
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
        if (boat.name === "boat_atx_disco") {
          if (isFriday) {
            availability.push({
              date: current.toISOString().split('T')[0],
              day: dayName,
              time: "12:00 PM - 4:00 PM",
              boatType: boat.name,
              capacity: boat.capacity,
              baseRate: boat.fridayRate,
              status: Math.random() > 0.3 ? 'AVAILABLE' : 'BOOKED',
              notes: "Disco Packages Available"
            });
          } else if (dayOfWeek === 6) { // Saturday
            ["11:00 AM - 3:00 PM", "3:30 PM - 7:30 PM"].forEach(time => {
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

  // New method to read all sheets for Memorial Weekend 2026 analysis
  async getAllSheetsData(): Promise<any> {
    try {
      if (!this.sheets || !this.spreadsheetId) {
        console.warn("Google Sheets API not properly initialized");
        return {
          success: false,
          error: "Google Sheets API not initialized",
          data: null
        };
      }

      // Override spreadsheet ID with the one provided
      const targetSpreadsheetId = '13VHEq3Aqv46oSt0tGiF5ZBOxs1WxBU0SqEIwG6QUsxI';
      console.log(`📊 Reading ALL sheets from spreadsheet: ${targetSpreadsheetId}`);
      
      // First, get the spreadsheet metadata to find all sheet names
      const spreadsheet = await this.sheets.spreadsheets.get({
        spreadsheetId: targetSpreadsheetId
      });
      
      const sheets = spreadsheet.data.sheets || [];
      if (sheets.length === 0) {
        console.error("No sheets found in spreadsheet");
        return {
          success: false,
          error: "No sheets found in spreadsheet",
          data: null
        };
      }
      
      // Log all sheet names
      console.log(`📋 Found ${sheets.length} sheets in spreadsheet:`);
      sheets.forEach((sheet: any) => {
        console.log(`  - ${sheet.properties?.title}`);
      });

      // Sheets to read
      const targetSheets = [
        'Master Availability Rules',
        'Holiday Exceptions',
        'Booked Dates',
        'Special Pricing',
        'Blackout Dates'
      ];

      const allSheetsData: any = {};
      const memorialDayWeekendData: any = {
        date: 'May 24-25, 2026',
        sundayDate: '2026-05-24',
        mondayDate: '2026-05-25',
        holidayExceptions: [],
        specialPricing: [],
        blackoutDates: [],
        bookedDates: [],
        masterRules: [],
        sundayTimeSlots: []
      };

      // Read each target sheet
      for (const sheetName of targetSheets) {
        const sheetExists = sheets.find((sheet: any) => sheet.properties?.title === sheetName);
        
        if (!sheetExists) {
          console.warn(`⚠️ Sheet "${sheetName}" not found in spreadsheet`);
          allSheetsData[sheetName] = { exists: false, data: [] };
          continue;
        }

        console.log(`📖 Reading sheet: "${sheetName}"`);
        
        try {
          const range = `'${sheetName}'!A:Z`; // Read all columns A through Z
          const response = await this.sheets.spreadsheets.values.get({
            spreadsheetId: targetSpreadsheetId,
            range: range,
          });
          
          const values = response.data.values || [];
          
          if (values.length === 0) {
            console.log(`   Sheet "${sheetName}" is empty`);
            allSheetsData[sheetName] = { 
              exists: true, 
              data: [], 
              headers: [],
              rowCount: 0 
            };
            continue;
          }
          
          // Process the data - assume first row is headers
          const headers = values[0];
          const rows = values.slice(1);
          
          // Convert to JSON format with headers as keys
          const jsonData = rows.map((row, index) => {
            const obj: any = {
              rowNumber: index + 2 // +2 because arrays are 0-indexed and we skip header row
            };
            headers.forEach((header, colIndex) => {
              obj[header] = row[colIndex] || '';
            });
            return obj;
          });
          
          console.log(`   ✅ Read ${jsonData.length} rows from "${sheetName}"`);
          
          allSheetsData[sheetName] = {
            exists: true,
            headers: headers,
            rowCount: jsonData.length,
            data: jsonData
          };

          // Check for Memorial Day Weekend 2026 data
          if (sheetName === 'Holiday Exceptions') {
            const memorialDayRows = jsonData.filter(row => {
              const dateField = row['Date'] || row['Holiday Date'] || row['Exception Date'] || '';
              const holidayName = row['Holiday'] || row['Holiday Name'] || row['Name'] || '';
              
              // Check if this is Memorial Day 2026
              return (
                dateField.includes('2026-05-24') ||
                dateField.includes('2026-05-25') ||
                dateField.includes('5/24/2026') ||
                dateField.includes('5/25/2026') ||
                dateField.includes('May 24') ||
                dateField.includes('May 25') ||
                holidayName.toLowerCase().includes('memorial')
              );
            });
            
            if (memorialDayRows.length > 0) {
              console.log(`   🎯 Found ${memorialDayRows.length} Memorial Day Weekend 2026 entries!`);
              memorialDayWeekendData.holidayExceptions = memorialDayRows;
            }
          }

          // Check Special Pricing for Memorial Weekend
          if (sheetName === 'Special Pricing') {
            const memorialPricing = jsonData.filter(row => {
              const dateField = row['Date'] || row['Start Date'] || row['Price Date'] || '';
              return (
                dateField.includes('2026-05-24') ||
                dateField.includes('2026-05-25') ||
                dateField.includes('5/24/2026') ||
                dateField.includes('5/25/2026')
              );
            });
            
            if (memorialPricing.length > 0) {
              console.log(`   💰 Found ${memorialPricing.length} Special Pricing entries for Memorial Weekend!`);
              memorialDayWeekendData.specialPricing = memorialPricing;
            }
          }

          // Check Blackout Dates
          if (sheetName === 'Blackout Dates') {
            const memorialBlackouts = jsonData.filter(row => {
              const dateField = row['Date'] || row['Blackout Date'] || row['Start Date'] || '';
              return (
                dateField.includes('2026-05-24') ||
                dateField.includes('2026-05-25') ||
                dateField.includes('5/24/2026') ||
                dateField.includes('5/25/2026')
              );
            });
            
            if (memorialBlackouts.length > 0) {
              console.log(`   🚫 Found ${memorialBlackouts.length} Blackout entries for Memorial Weekend!`);
              memorialDayWeekendData.blackoutDates = memorialBlackouts;
            }
          }

          // Check Booked Dates
          if (sheetName === 'Booked Dates') {
            const memorialBookings = jsonData.filter(row => {
              const dateField = row['Date'] || row['Booking Date'] || row['Event Date'] || '';
              return (
                dateField.includes('2026-05-24') ||
                dateField.includes('2026-05-25') ||
                dateField.includes('5/24/2026') ||
                dateField.includes('5/25/2026')
              );
            });
            
            if (memorialBookings.length > 0) {
              console.log(`   📅 Found ${memorialBookings.length} Bookings for Memorial Weekend!`);
              memorialDayWeekendData.bookedDates = memorialBookings;
            }
          }

          // Check Master Availability Rules for Sunday rules
          if (sheetName === 'Master Availability Rules') {
            const sundayRules = jsonData.filter(row => {
              const dayField = row['Day'] || row['Day of Week'] || row['Weekday'] || '';
              return dayField.toLowerCase().includes('sunday');
            });
            
            if (sundayRules.length > 0) {
              console.log(`   📏 Found ${sundayRules.length} Sunday rules in Master Availability!`);
              memorialDayWeekendData.masterRules = sundayRules;
              
              // Extract time slots from Sunday rules
              sundayRules.forEach(rule => {
                const timeSlot = rule['Time Slot'] || rule['Time'] || rule['Available Times'] || '';
                if (timeSlot) {
                  memorialDayWeekendData.sundayTimeSlots.push({
                    timeSlot: timeSlot,
                    boat: rule['Boat'] || rule['Boat Type'] || '',
                    capacity: rule['Capacity'] || rule['Max Capacity'] || '',
                    price: rule['Price'] || rule['Rate'] || '',
                    status: rule['Status'] || rule['Availability'] || 'Available'
                  });
                }
              });
            }
          }
          
        } catch (error: any) {
          console.error(`   ❌ Error reading sheet "${sheetName}":`, error.message);
          allSheetsData[sheetName] = { 
            exists: true, 
            error: error.message, 
            data: [] 
          };
        }
      }

      // Summary of Memorial Day Weekend 2026 findings
      console.log('\n🎆 MEMORIAL DAY WEEKEND 2026 SUMMARY:');
      console.log('====================================');
      console.log(`📅 Sunday, May 24, 2026 - Monday, May 25, 2026`);
      console.log(`🎯 Holiday Exceptions: ${memorialDayWeekendData.holidayExceptions.length} entries`);
      console.log(`💰 Special Pricing: ${memorialDayWeekendData.specialPricing.length} entries`);
      console.log(`🚫 Blackout Dates: ${memorialDayWeekendData.blackoutDates.length} entries`);
      console.log(`📅 Booked Dates: ${memorialDayWeekendData.bookedDates.length} entries`);
      console.log(`📏 Sunday Rules: ${memorialDayWeekendData.masterRules.length} rules`);
      console.log(`⏰ Sunday Time Slots: ${memorialDayWeekendData.sundayTimeSlots.length} slots`);
      
      if (memorialDayWeekendData.sundayTimeSlots.length > 0) {
        console.log('\n⏰ AVAILABLE TIME SLOTS FOR SUNDAY OF MEMORIAL WEEKEND:');
        memorialDayWeekendData.sundayTimeSlots.forEach((slot: any) => {
          console.log(`   - ${slot.timeSlot} | Boat: ${slot.boat} | Capacity: ${slot.capacity} | Price: ${slot.price}`);
        });
      }

      return {
        success: true,
        spreadsheetId: targetSpreadsheetId,
        sheetsFound: sheets.map((s: any) => s.properties?.title),
        allSheetsData: allSheetsData,
        memorialDayWeekend2026: memorialDayWeekendData,
        summary: {
          totalSheets: sheets.length,
          targetSheetsRead: Object.keys(allSheetsData).length,
          memorialDayFindings: {
            hasHolidayException: memorialDayWeekendData.holidayExceptions.length > 0,
            hasSpecialPricing: memorialDayWeekendData.specialPricing.length > 0,
            hasBlackouts: memorialDayWeekendData.blackoutDates.length > 0,
            hasBookings: memorialDayWeekendData.bookedDates.length > 0,
            sundayTimeSlotsAvailable: memorialDayWeekendData.sundayTimeSlots.length
          }
        }
      };
      
    } catch (error: any) {
      console.error("Error reading all sheets from Google Sheets:", error);
      return {
        success: false,
        error: error.message || "Failed to read data from Google Sheets",
        data: null
      };
    }
  }

  // New method to read pricing and availability from the first tab
  async getPricingAndAvailability(): Promise<any> {
    try {
      if (!this.sheets || !this.spreadsheetId) {
        console.warn("Google Sheets API not properly initialized");
        return {
          success: false,
          error: "Google Sheets API not initialized",
          data: null
        };
      }

      console.log(`📊 Reading pricing & availability from spreadsheet: ${this.spreadsheetId}`);
      
      // First, get the spreadsheet metadata to find the first sheet's name
      const spreadsheet = await this.sheets.spreadsheets.get({
        spreadsheetId: this.spreadsheetId
      });
      
      const sheets = spreadsheet.data.sheets || [];
      if (sheets.length === 0) {
        console.error("No sheets found in spreadsheet");
        return {
          success: false,
          error: "No sheets found in spreadsheet",
          data: null
        };
      }
      
      // Get the first sheet (tab 1)
      const firstSheet = sheets[0];
      const sheetName = firstSheet.properties?.title || 'Sheet1';
      console.log(`📄 Reading from first tab: "${sheetName}"`);
      
      // Read all data from the first tab
      const range = `${sheetName}!A:Z`; // Read all columns A through Z
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: range,
      });
      
      const values = response.data.values || [];
      
      if (values.length === 0) {
        console.warn("No data found in the first tab");
        return {
          success: true,
          sheetName: sheetName,
          data: [],
          message: "Sheet is empty"
        };
      }
      
      // Process the data - assume first row is headers
      const headers = values[0];
      const rows = values.slice(1);
      
      // Convert to JSON format with headers as keys
      const jsonData = rows.map((row, index) => {
        const obj: any = {
          rowNumber: index + 2 // +2 because arrays are 0-indexed and we skip header row
        };
        headers.forEach((header, colIndex) => {
          obj[header] = row[colIndex] || '';
        });
        return obj;
      });
      
      console.log(`✅ Successfully read ${jsonData.length} rows from "${sheetName}"`);
      
      // Log some sample data for 14-person cruises
      const fourteenPersonData = jsonData.filter(row => {
        // Check various possible column names for group size/capacity
        // The user has entered "14 or Less" in the spreadsheet
        const peopleField = row['# of People'] || row['Capacity'] || row['People'] || row['Size'] || '';
        return peopleField === '14' || 
               peopleField === '14 or Less' ||
               peopleField === '14 people' ||
               peopleField.includes('14') ||
               row['capacity'] === '14' ||
               row['Group Size'] === '14' ||
               row['group_size'] === '14' ||
               row['Max Capacity'] === '14' ||
               row['Max People'] === '14' ||
               (row['Boat'] && row['Boat'].toLowerCase().includes('day tripper')) ||
               (row['Boat Type'] && row['Boat Type'].toLowerCase().includes('day tripper')) ||
               (row['Boat Name'] && row['Boat Name'].toLowerCase().includes('day tripper'));
      });
      
      if (fourteenPersonData.length > 0) {
        console.log(`🚢 Found ${fourteenPersonData.length} entries for 14-person cruises:`);
        console.log(JSON.stringify(fourteenPersonData.slice(0, 3), null, 2)); // Log first 3 entries
      }
      
      return {
        success: true,
        spreadsheetId: this.spreadsheetId,
        sheetName: sheetName,
        headers: headers,
        rowCount: jsonData.length,
        data: jsonData,
        fourteenPersonCruises: fourteenPersonData // Include filtered data for 14-person cruises
      };
      
    } catch (error: any) {
      console.error("Error reading pricing & availability from Google Sheets:", error);
      return {
        success: false,
        error: error.message || "Failed to read data from Google Sheets",
        data: null
      };
    }
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
      const availabilitySheet = sheets.find((sheet: any) => sheet.properties?.title === 'Availability');

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

  // Helper method to find the next available row in the Leads sheet
  private async getNextAvailableRow(): Promise<number> {
    try {
      if (!this.sheets || !this.spreadsheetId) {
        return 2; // Default to row 2 if no sheets access
      }

      // Get all data from the Leads sheet to find the last populated row
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: 'Leads!A:A', // Just check column A for any data
      });
      
      const rows = response.data.values || [];
      // Return the next row after the last populated row
      // Add 1 because rows array is 0-indexed, add 1 more for next empty row
      const nextRow = rows.length + 1;
      
      console.log(`📊 Next available row in Leads sheet: ${nextRow} (found ${rows.length} existing rows)`);
      return nextRow;
    } catch (error) {
      console.error('Error finding next available row:', error);
      return 2; // Default to row 2 on error
    }
  }

  // Lead tracking methods with enhanced retry and logging
  // Simple method to add leads to Google Sheets (used by quote creation)
  async addLeadToSheet(leadData: {
    name: string;
    email: string;
    phone?: string;
    eventDate?: string;
    eventType?: string;
    groupSize?: string;
    quoteUrl?: string;
    createdDate?: string;
    leadSource?: string;
    status?: string;
  }): Promise<boolean> {
    console.log('📊 Adding lead to Google Sheets (simple)...', {
      name: leadData.name,
      email: leadData.email,
      hasQuoteUrl: !!leadData.quoteUrl
    });

    try {
      if (!this.sheets || !this.spreadsheetId) {
        console.log("📊 Google Sheets not configured - simulating lead addition:", leadData);
        return true;
      }

      // Ensure the Leads sheet exists with retry
      await this.withRetry(
        () => this.ensureLeadsSheetExists(),
        'Ensure Leads sheet exists'
      );

      const now = new Date().toISOString();
      const leadId = `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      const leadRow = [
        leadId, // A: Lead ID
        leadData.createdDate || now, // B: Created Date
        leadData.name, // C: Name
        leadData.email, // D: Email
        leadData.phone || '', // E: Phone
        '', // F: Event Type (old format)
        leadData.eventType || '', // G: Event Type Label
        leadData.eventDate || '', // H: Cruise Date
        leadData.groupSize || '', // I: Group Size
        '', // J: Boat Type (filled later)
        '', // K: Disco Package (filled later)
        '', // L: Time Slot (filled later)
        leadData.status || 'NEW', // M: Status
        'started', // N: Progress
        now, // O: Last Updated
        leadData.leadSource || 'Web', // P: Source
        leadData.quoteUrl || '', // Q: Quote URL - CRITICAL COLUMN FOR AUTOMATION !!!
        '', // R: Budget
        '', // S: Project ID
        '', // T: Notes
        '', // U: Special Requests (moved from Q)
        '' // V: Quote ID
      ];

      console.log('📊 Writing lead row to Google Sheets (simple):', {
        leadId,
        rowLength: leadRow.length,
        quoteUrl: leadData.quoteUrl,
        range: 'Leads!A:V'
      });

      // Find the next available row and write lead there specifically
      const nextRow = await this.getNextAvailableRow();
      const specificRange = `Leads!A${nextRow}:V${nextRow}`;
      
      console.log(`📊 Writing to specific range: ${specificRange}`);
      
      await this.withRetry(
        async () => {
          const response = await this.sheets.spreadsheets.values.update({
            spreadsheetId: this.spreadsheetId,
            range: specificRange,
            valueInputOption: 'RAW',
            resource: {
              values: [leadRow]
            }
          });
          return response;
        },
        `Add lead ${leadData.name} to Google Sheets at row ${nextRow}`
      );

      console.log('✅ Successfully added lead to Google Sheets:', {
        leadId,
        name: leadData.name,
        quoteUrl: leadData.quoteUrl
      });
      
      return true;
    } catch (error: any) {
      console.error('❌ Error adding lead to Google Sheets:', {
        name: leadData.name,
        error: error.message,
        quoteUrl: leadData.quoteUrl
      });
      return false;
    }
  }

  async createLead(leadData: {
    leadId: string;
    name: string;
    email: string;
    phone?: string;
    eventType?: string;
    eventTypeLabel?: string;
    source?: string;
    quoteUrl?: string;
    quoteId?: string;
    cruiseDate?: string;
    groupSize?: number;
  }): Promise<boolean> {
    console.log('📊 Creating lead in Google Sheets...', {
      leadId: leadData.leadId,
      name: leadData.name,
      email: leadData.email,
      hasQuoteUrl: !!leadData.quoteUrl,
      hasQuoteId: !!leadData.quoteId,
      source: leadData.source
    });

    try {
      if (!this.sheets || !this.spreadsheetId) {
        console.log("📊 Google Sheets not configured - simulating lead creation:", {
          leadId: leadData.leadId,
          quoteUrl: leadData.quoteUrl,
          quoteId: leadData.quoteId
        });
        return true;
      }

      // Ensure the Leads sheet exists with retry
      await this.withRetry(
        () => this.ensureLeadsSheetExists(),
        'Ensure Leads sheet exists'
      );

      const now = new Date().toISOString();
      const leadRow = [
        leadData.leadId, // A: Lead ID
        now, // B: Created Date
        leadData.name, // C: Name
        leadData.email, // D: Email
        leadData.phone || '', // E: Phone
        leadData.eventType || '', // F: Event Type
        leadData.eventTypeLabel || '', // G: Event Type Label
        leadData.cruiseDate || '', // H: Cruise Date
        leadData.groupSize ? leadData.groupSize.toString() : '', // I: Group Size
        '', // J: Boat Type (filled later)
        '', // K: Disco Package (filled later)
        '', // L: Time Slot (filled later)
        'NEW', // M: Status
        'started', // N: Progress
        now, // O: Last Updated
        leadData.source || 'AI Chatbot Flow', // P: Source
        leadData.quoteUrl || '', // Q: Quote URL - CRITICAL COLUMN FOR AUTOMATION !!!
        '', // R: Budget
        '', // S: Project ID
        '', // T: Notes
        '', // U: Special Requests (moved from Q)
        leadData.quoteId || '' // V: Quote ID - CRITICAL FOR AUTOMATION
      ];

      // Find the next available row and write lead there specifically
      const nextRow = await this.getNextAvailableRow();
      const specificRange = `Leads!A${nextRow}:V${nextRow}`;
      
      console.log('📊 Writing lead row to Google Sheets:', {
        leadId: leadData.leadId,
        rowLength: leadRow.length,
        quoteUrlColumn: leadRow[16], // Column Q (index 16) - Quote URL - FIXED!
        quoteIdColumn: leadRow[21],  // Column V (index 21) - Quote ID
        specificRange: specificRange,
        targetRow: nextRow
      });

      // Write lead with retry mechanism to specific row
      await this.withRetry(
        async () => {
          const response = await this.sheets.spreadsheets.values.update({
            spreadsheetId: this.spreadsheetId,
            range: specificRange,
            valueInputOption: 'RAW',
            resource: {
              values: [leadRow]
            }
          });
          return response;
        },
        `Create lead ${leadData.leadId} in Google Sheets at row ${nextRow}`
      );

      console.log('✅ Successfully created lead in Google Sheets:', {
        leadId: leadData.leadId,
        quoteUrl: leadData.quoteUrl,
        quoteId: leadData.quoteId,
        message: 'Quote link automatically populated in Google Sheets!'
      });
      
      return true;
    } catch (error: any) {
      console.error('❌ Error creating lead in Google Sheets:', {
        leadId: leadData.leadId,
        error: error.message,
        quoteUrl: leadData.quoteUrl,
        quoteId: leadData.quoteId
      });
      return false;
    }
  }

  async updateLead(leadId: string, updates: LeadUpdateData): Promise<boolean> {
    try {
      if (!this.sheets || !this.spreadsheetId) {
        console.log("Would update lead in Google Sheets:", { leadId, updates });
        return true;
      }

      // Find the lead row
      const range = 'Leads!A2:T1000';
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: range,
      });
      
      const rows = response.data.values || [];
      let rowIndex = -1;
      
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        if (row[0] === leadId) { // leadId is in column A
          rowIndex = i + 2; // Add 2 because arrays are 0-indexed and we start from A2
          break;
        }
      }
      
      if (rowIndex === -1) {
        console.error("Lead not found for update:", leadId);
        return false;
      }

      // Prepare updates with current data + new updates
      const currentRow = rows[rowIndex - 2]; // Convert back to 0-indexed
      const now = new Date().toISOString();
      
      const updatedRow = [
        leadId, // A: leadId
        currentRow[1] || now, // B: createdDate (keep original)
        updates.name !== undefined ? updates.name : (currentRow[2] || ''), // C: name
        updates.email !== undefined ? updates.email : (currentRow[3] || ''), // D: email
        updates.phone !== undefined ? updates.phone : (currentRow[4] || ''), // E: phone
        updates.eventType !== undefined ? updates.eventType : (currentRow[5] || ''), // F: eventType
        updates.eventTypeLabel !== undefined ? updates.eventTypeLabel : (currentRow[6] || ''), // G: eventTypeLabel
        updates.cruiseDate !== undefined ? updates.cruiseDate : (currentRow[7] || ''), // H: cruiseDate
        updates.groupSize !== undefined ? updates.groupSize.toString() : (currentRow[8] || ''), // I: groupSize
        updates.boatType !== undefined ? updates.boatType : (currentRow[9] || ''), // J: boatType
        updates.discoPackage !== undefined ? updates.discoPackage : (currentRow[10] || ''), // K: discoPackage
        updates.timeSlot !== undefined ? updates.timeSlot : (currentRow[11] || ''), // L: timeSlot
        updates.status !== undefined ? updates.status : (currentRow[12] || 'NEW'), // M: status
        updates.progress !== undefined ? updates.progress : (currentRow[13] || 'started'), // N: progress
        now, // O: lastUpdated
        currentRow[15] || 'AI Chatbot Flow', // P: source (keep original)
        updates.specialRequests !== undefined ? updates.specialRequests : (currentRow[16] || ''), // Q: specialRequests
        updates.budget !== undefined ? updates.budget : (currentRow[17] || ''), // R: budget
        updates.projectId !== undefined ? updates.projectId : (currentRow[18] || ''), // S: projectId
        updates.notes !== undefined ? updates.notes : (currentRow[19] || ''), // T: notes
        updates.quoteUrl !== undefined ? updates.quoteUrl : (currentRow[20] || ''), // U: quoteUrl - NEW
        updates.quoteId !== undefined ? updates.quoteId : (currentRow[21] || '') // V: quoteId - NEW
      ];

      await this.sheets.spreadsheets.values.update({
        spreadsheetId: this.spreadsheetId,
        range: `Leads!A${rowIndex}:V${rowIndex}`,
        valueInputOption: 'RAW',
        resource: {
          values: [updatedRow]
        }
      });
      
      console.log("Successfully updated lead in Google Sheets:", leadId, updates);
      return true;
    } catch (error) {
      console.error("Error updating lead in Google Sheets:", error);
      return false;
    }
  }

  async getLead(leadId: string): Promise<LeadData | null> {
    try {
      if (!this.sheets || !this.spreadsheetId) {
        // Return mock data for development
        return this.getMockLead(leadId);
      }

      const range = 'Leads!A2:V1000';
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: range,
      });
      
      const rows = response.data.values || [];
      const leadRow = rows.find((row: any[]) => row[0] === leadId);
      
      if (!leadRow) {
        return null;
      }

      return this.mapRowToLeadData(leadRow);
    } catch (error) {
      console.error("Error fetching lead from Google Sheets:", error);
      return this.getMockLead(leadId);
    }
  }

  async getAllLeads(): Promise<LeadData[]> {
    try {
      if (!this.sheets || !this.spreadsheetId) {
        return this.getMockLeads();
      }

      const range = 'Leads!A2:V1000';
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: range,
      });
      
      const rows = response.data.values || [];
      return rows.map((row: any[]) => this.mapRowToLeadData(row)).filter((lead: LeadData | null) => lead !== null) as LeadData[];
    } catch (error) {
      console.error("Error fetching leads from Google Sheets:", error);
      return this.getMockLeads();
    }
  }

  private mapRowToLeadData(row: any[]): LeadData | null {
    if (!row || row.length < 4) return null;
    
    return {
      leadId: row[0] || '',
      createdDate: row[1] || '',
      name: row[2] || '',
      email: row[3] || '',
      phone: row[4] || undefined,
      eventType: row[5] || undefined,
      eventTypeLabel: row[6] || undefined,
      cruiseDate: row[7] || undefined,
      groupSize: row[8] ? parseInt(row[8]) : undefined,
      boatType: row[9] || undefined,
      discoPackage: row[10] || undefined,
      timeSlot: row[11] || undefined,
      status: (row[12] as LeadStatus) || 'NEW',
      progress: (row[13] as LeadProgressStage) || 'started',
      lastUpdated: row[14] || '',
      source: row[15] || 'AI Chatbot Flow',
      specialRequests: row[16] || undefined,
      budget: row[17] || undefined,
      projectId: row[18] || undefined,
      notes: row[19] || undefined,
      quoteUrl: row[16] || undefined, // Column Q - CORRECTED
      quoteId: row[21] || undefined
    };
  }

  private getMockLead(leadId: string): LeadData {
    const now = new Date().toISOString();
    return {
      leadId,
      createdDate: now,
      name: 'Mock User',
      email: 'mock@example.com',
      phone: '512-488-5892',
      eventType: 'bachelor',
      eventTypeLabel: 'Bachelor Party',
      status: 'NEW',
      progress: 'started',
      lastUpdated: now,
      source: 'AI Chatbot Flow'
    };
  }

  private getMockLeads(): LeadData[] {
    const now = new Date().toISOString();
    return [
      {
        leadId: 'lead_mock_1',
        createdDate: now,
        name: 'John Smith',
        email: 'john@example.com',
        phone: '512-488-5892',
        eventType: 'bachelor',
        eventTypeLabel: 'Bachelor Party',
        cruiseDate: '2025-10-15',
        groupSize: 20,
        status: 'DATE_SELECTED',
        progress: 'date_selected',
        lastUpdated: now,
        source: 'AI Chatbot Flow'
      },
      {
        leadId: 'lead_mock_2',
        createdDate: now,
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        phone: '512-488-5892',
        eventType: 'wedding',
        eventTypeLabel: 'Wedding Reception',
        status: 'CONTACT_INFO',
        progress: 'contact_complete',
        lastUpdated: now,
        source: 'AI Chatbot Flow'
      }
    ];
  }

  // Helper method to ensure the Leads sheet exists
  private async ensureLeadsSheetExists(): Promise<void> {
    try {
      // Get spreadsheet metadata to check existing sheets
      const spreadsheet = await this.sheets.spreadsheets.get({
        spreadsheetId: this.spreadsheetId
      });

      const sheets = spreadsheet.data.sheets || [];
      const leadsSheet = sheets.find((sheet: any) => sheet.properties?.title === 'Leads');

      if (!leadsSheet) {
        console.log("Creating 'Leads' sheet...");
        
        // Create the Leads sheet
        await this.sheets.spreadsheets.batchUpdate({
          spreadsheetId: this.spreadsheetId,
          resource: {
            requests: [{
              addSheet: {
                properties: {
                  title: 'Leads',
                  gridProperties: {
                    rowCount: 1000,
                    columnCount: 22
                  }
                }
              }
            }]
          }
        });

        // Add headers to the Leads sheet
        const headers = [
          'Lead ID', 'Created Date', 'Name', 'Email', 'Phone', 'Event Type', 'Event Type Label',
          'Cruise Date', 'Group Size', 'Boat Type', 'Disco Package', 'Time Slot', 'Status',
          'Progress', 'Last Updated', 'Source', 'Special Requests', 'Budget', 'Project ID', 'Notes',
          'Quote URL', 'Quote ID'
        ];
        
        await this.sheets.spreadsheets.values.update({
          spreadsheetId: this.spreadsheetId,
          range: 'Leads!A1:V1',
          valueInputOption: 'RAW',
          resource: {
            values: [headers]
          }
        });
        
        console.log("✅ Successfully created 'Leads' sheet with headers");
      } else {
        console.log("✅ 'Leads' sheet already exists");
      }
    } catch (error) {
      console.error("Error ensuring Leads sheet exists:", error);
      throw error;
    }
  }

  // NEW METHOD: Get lead data by email (for cases where we only have email)
  async getLeadByEmail(email: string): Promise<LeadData | null> {
    console.log(`🔍 Finding lead by email: ${email}`);
    
    try {
      if (!this.sheets || !this.spreadsheetId) {
        console.log("📊 Google Sheets not configured - returning null");
        return null;
      }

      const range = 'Leads!A2:V1000';
      const response = await this.withRetry(
        () => this.sheets.spreadsheets.values.get({
          spreadsheetId: this.spreadsheetId,
          range: range
        }),
        `Get lead by email ${email}`
      );
      
      const rows = response.data.values || [];
      const leadRow = rows.find((row: any[]) => row[3] === email); // Email is in column D (index 3)
      
      if (!leadRow) {
        console.log(`❌ Lead with email ${email} not found in Google Sheets`);
        return null;
      }

      const leadData = this.mapRowToLeadData(leadRow);
      console.log(`✅ Found lead by email ${email}:`, leadData?.leadId);
      return leadData;
    } catch (error: any) {
      console.error(`❌ Error finding lead by email ${email}:`, error.message);
      return null;
    }
  }

  // NEW METHOD: Get complete lead data with Quote Builder selections by lead ID
  async getCompleteLeadData(leadId: string): Promise<{
    success: boolean;
    leadData?: any;
    error?: string;
  }> {
    console.log(`🔍 Getting complete lead data for ${leadId}...`);
    
    try {
      if (!this.sheets || !this.spreadsheetId) {
        return {
          success: false,
          error: 'Google Sheets not configured'
        };
      }

      const range = 'Leads!A2:V1000';
      const response = await this.withRetry(
        () => this.sheets.spreadsheets.values.get({
          spreadsheetId: this.spreadsheetId,
          range: range
        }),
        `Get complete lead data ${leadId}`
      );
      
      const rows = response.data.values || [];
      const leadRow = rows.find((row: any[]) => row[0] === leadId);
      
      if (!leadRow) {
        console.log(`❌ Lead ${leadId} not found in Google Sheets`);
        return {
          success: false,
          error: 'Lead not found in Google Sheets'
        };
      }

      // Map all available data from the spreadsheet row
      const completeData = {
        leadId: leadRow[0] || '',
        createdDate: leadRow[1] || '',
        name: leadRow[2] || '',
        email: leadRow[3] || '',
        phone: leadRow[4] || '',
        eventType: leadRow[5] || '',
        eventTypeLabel: leadRow[6] || '',
        cruiseDate: leadRow[7] || '',
        groupSize: leadRow[8] ? parseInt(leadRow[8]) : undefined,
        boatType: leadRow[9] || '',
        discoPackage: leadRow[10] || '',
        timeSlot: leadRow[11] || '',
        status: leadRow[12] || 'NEW',
        progress: leadRow[13] || 'started',
        lastUpdated: leadRow[14] || '',
        source: leadRow[15] || 'AI Chatbot Flow',
        quoteUrl: leadRow[16] || '', // Column Q - CORRECT COLUMN FOR QUOTE URL
        specialRequests: leadRow[17] || '',
        budget: leadRow[18] || '',
        projectId: leadRow[19] || '',
        notes: leadRow[19] || '', // Column T - Updated from index 20 to 19
        quoteId: leadRow[21] || '' // Column V
      };

      console.log(`✅ Complete lead data retrieved for ${leadId}:`, {
        hasQuoteUrl: !!completeData.quoteUrl,
        hasQuoteId: !!completeData.quoteId,
        eventType: completeData.eventType,
        groupSize: completeData.groupSize,
        cruiseDate: completeData.cruiseDate
      });

      return {
        success: true,
        leadData: completeData
      };
    } catch (error: any) {
      console.error(`❌ Error getting complete lead data ${leadId}:`, error.message);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // CRITICAL METHOD: Update Quote URL in Column Q - MUST work for quote sharing!
  async updateQuoteUrlInColumnQ(leadId: string, quoteUrl: string): Promise<boolean> {
    console.log(`📝 CRITICAL: Updating Column Q (Quote URL) for lead ${leadId}...`);
    console.log(`📝 URL to save: ${quoteUrl}`);
    
    // Add retry wrapper for the entire operation
    const maxRetries = 3;
    let lastError: any = null;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`🔄 Attempt ${attempt}/${maxRetries} to update Column Q for lead ${leadId}`);
        
        if (!this.sheets || !this.spreadsheetId) {
          console.warn("⚠️ WARNING: Google Sheets not configured - Column Q cannot be updated!", {
            leadId,
            quoteUrl,
            error: "No sheets service or spreadsheet ID"
          });
          // Return false to indicate failure when Sheets is not configured
          return false;
        }

      // Find the lead row with better error handling
      const range = 'Leads!A2:V1000';
      console.log(`🔍 Searching for lead ${leadId} in range ${range}...`);
      
      const response = await this.withRetry(
        () => this.sheets.spreadsheets.values.get({
          spreadsheetId: this.spreadsheetId,
          range: range
        }),
        `Find lead ${leadId} for Column Q update`,
        5 // Increase retries for this critical operation
      );
      
      const rows = response.data.values || [];
      console.log(`🔍 Found ${rows.length} rows in Leads sheet`);
      
      let rowIndex = -1;
      let foundRow = null;
      
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        if (row[0] === leadId) {
          rowIndex = i + 2; // Add 2 because arrays are 0-indexed and we start from A2
          foundRow = row;
          console.log(`✅ Found lead ${leadId} at row ${rowIndex}`);
          console.log(`📊 Current Column Q value: "${row[16] || 'EMPTY'}"`);
          break;
        }
      }
      
      if (rowIndex === -1) {
        console.error(`❌ CRITICAL: Lead ${leadId} not found in Google Sheets for Column Q update!`);
        console.error(`Searched ${rows.length} rows but could not find lead with ID: ${leadId}`);
        return false;
      }

      console.log(`📝 CRITICAL: Updating Google Sheets Column Q (row ${rowIndex}) with quote URL:`, {
        cell: `Q${rowIndex}`,
        quoteUrl: quoteUrl,
        currentValue: foundRow?.[16] || 'EMPTY'
      });

      // Update Column Q (index 16) with the quote URL - with enhanced retry
      const updateResult = await this.withRetry(
        () => this.sheets.spreadsheets.values.update({
          spreadsheetId: this.spreadsheetId,
          range: `Leads!Q${rowIndex}`,
          valueInputOption: 'RAW',
          resource: {
            values: [[quoteUrl]]
          }
        }),
        `CRITICAL: Update Column Q for lead ${leadId}`,
        5 // Increase retries for this critical operation
      );
      
        // Verify the update actually happened
        if (updateResult && updateResult.data) {
          console.log(`✅ CRITICAL SUCCESS: Column Q (row ${rowIndex}) updated with quote URL!`);
          console.log(`📊 Update details:`, {
            updatedCells: updateResult.data.updatedCells,
            updatedColumns: updateResult.data.updatedColumns,
            updatedRows: updateResult.data.updatedRows,
            updatedRange: updateResult.data.updatedRange
          });
          
          // DOUBLE VERIFICATION: Read back the value to confirm it was actually saved
          try {
            const verifyResponse = await this.sheets.spreadsheets.values.get({
              spreadsheetId: this.spreadsheetId,
              range: `Leads!Q${rowIndex}`
            });
            const savedValue = verifyResponse.data.values?.[0]?.[0];
            if (savedValue === quoteUrl) {
              console.log(`✅✅ DOUBLE VERIFIED: Column Q value confirmed as: ${savedValue}`);
              return true;
            } else {
              console.error(`❌ VERIFICATION FAILED: Expected '${quoteUrl}' but found '${savedValue}'`);
              throw new Error('Verification failed - value mismatch');
            }
          } catch (verifyError: any) {
            console.error(`⚠️ Could not verify update, but update was reported as successful:`, verifyError.message);
            // Still return true if the update was reported successful
            return true;
          }
        } else {
          throw new Error('Update appeared to succeed but no confirmation received');
        }
      } catch (error: any) {
        lastError = error;
        console.error(`❌ Attempt ${attempt}/${maxRetries} FAILED for lead ${leadId}:`, error.message);
        
        if (attempt < maxRetries) {
          // Wait before retrying (exponential backoff)
          const waitTime = Math.min(1000 * Math.pow(2, attempt - 1), 5000);
          console.log(`⏳ Waiting ${waitTime}ms before retry...`);
          await new Promise(resolve => setTimeout(resolve, waitTime));
        }
      }
    }
    
    // All retries failed
    console.error(`❌❌❌ CRITICAL FAILURE: All ${maxRetries} attempts to update Column Q failed for lead ${leadId}`);
    console.error(`Last error:`, lastError);
    if (lastError?.stack) {
      console.error(`Stack trace:`, lastError.stack);
    }
    return false;
  }

  // VERIFICATION METHOD: Get lead data by ID to verify quote link population
  async getLeadForVerification(leadId: string): Promise<{
    found: boolean;
    leadData?: any;
    quoteUrl?: string;
    quoteId?: string;
    error?: string;
  }> {
    console.log(`🔍 Verifying lead ${leadId} in Google Sheets...`);
    
    try {
      if (!this.sheets || !this.spreadsheetId) {
        return {
          found: false,
          error: 'Google Sheets not configured'
        };
      }

      const range = 'Leads!A2:V1000';
      const response = await this.withRetry(
        () => this.sheets.spreadsheets.values.get({
          spreadsheetId: this.spreadsheetId,
          range: range
        }),
        `Get lead ${leadId} for verification`
      );
      
      const rows = response.data.values || [];
      const leadRow = rows.find((row: any[]) => row[0] === leadId);
      
      if (!leadRow) {
        console.log(`❌ Lead ${leadId} not found in Google Sheets`);
        return {
          found: false,
          error: 'Lead not found in Google Sheets'
        };
      }

      const leadData = {
        leadId: leadRow[0],
        createdDate: leadRow[1],
        name: leadRow[2],
        email: leadRow[3],
        phone: leadRow[4],
        eventType: leadRow[5],
        eventTypeLabel: leadRow[6],
        cruiseDate: leadRow[7],
        groupSize: leadRow[8],
        status: leadRow[12],
        progress: leadRow[13],
        source: leadRow[15],
        quoteUrl: leadRow[16], // Column Q - CORRECTED
        quoteId: leadRow[21]   // Column V
      };

      console.log(`✅ Lead ${leadId} verification complete:`, {
        found: true,
        hasQuoteUrl: !!leadData.quoteUrl,
        hasQuoteId: !!leadData.quoteId,
        quoteUrl: leadData.quoteUrl,
        quoteId: leadData.quoteId
      });

      return {
        found: true,
        leadData,
        quoteUrl: leadData.quoteUrl,
        quoteId: leadData.quoteId
      };
    } catch (error: any) {
      console.error(`❌ Error verifying lead ${leadId}:`, error.message);
      return {
        found: false,
        error: error.message
      };
    }
  }

  // ENHANCED METHOD: Update existing lead with quote link information
  async updateLeadWithQuoteLink(leadId: string, quoteUrl: string, quoteId: string): Promise<boolean> {
    console.log(`📝 Updating lead ${leadId} with quote link in Google Sheets...`);
    
    try {
      if (!this.sheets || !this.spreadsheetId) {
        console.log("📝 Google Sheets not configured - simulating quote link update:", {
          leadId,
          quoteUrl,
          quoteId
        });
        return true;
      }

      // Find the lead row
      const range = 'Leads!A2:V1000';
      const response = await this.withRetry(
        () => this.sheets.spreadsheets.values.get({
          spreadsheetId: this.spreadsheetId,
          range: range
        }),
        `Find lead ${leadId} for quote link update`
      );
      
      const rows = response.data.values || [];
      let rowIndex = -1;
      
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        if (row[0] === leadId) {
          rowIndex = i + 2; // Add 2 because arrays are 0-indexed and we start from A2
          break;
        }
      }
      
      if (rowIndex === -1) {
        console.error(`❌ Lead ${leadId} not found for quote link update`);
        return false;
      }

      console.log(`📝 Updating Google Sheets row ${rowIndex} with quote link:`, {
        quoteUrlCell: `U${rowIndex}`,
        quoteIdCell: `V${rowIndex}`,
        quoteUrl,
        quoteId
      });

      // Update both Quote URL (U) and Quote ID (V) columns
      await this.withRetry(
        () => this.sheets.spreadsheets.values.batchUpdate({
          spreadsheetId: this.spreadsheetId,
          resource: {
            valueInputOption: 'RAW',
            data: [
              {
                range: `Leads!U${rowIndex}:V${rowIndex}`,
                values: [[quoteUrl, quoteId]]
              }
            ]
          }
        }),
        `Update quote link for lead ${leadId}`
      );
      
      console.log(`✅ Successfully updated Google Sheets row ${rowIndex} with quote link`);
      return true;
    } catch (error: any) {
      console.error(`❌ Error updating lead ${leadId} with quote link:`, error.message);
      return false;
    }
  }

  // ALIAS METHOD: For backward compatibility with existing route calls
  async updateLeadWithQuote(contactId: string, quoteId: string, quoteUrl: string): Promise<boolean> {
    console.log(`🔗 Updating lead with quote (alias method) - contactId: ${contactId}, quoteId: ${quoteId}`);
    
    try {
      // Get contact details to match with leads
      // Note: This is a simple approach - we'll match leads by project association
      // In a more sophisticated implementation, you'd store contactId in the lead record
      
      // For now, find the most recent lead without a quote that could match this contact
      const allLeads = await this.getAllLeads();
      const candidateLeads = allLeads.filter(l => !l.quoteUrl && !l.quoteId); // Find leads without quotes
      
      if (candidateLeads.length === 0) {
        console.log(`❌ No unquoted leads found to update with quote for contact ${contactId}`);
        return false;
      }
      
      // Use the most recent lead (assumes chronological lead IDs)
      const targetLead = candidateLeads.sort((a, b) => b.createdDate.localeCompare(a.createdDate))[0];
      
      console.log(`✅ Found candidate lead ${targetLead.leadId} to update with quote ${quoteId}`);
      
      // Use the existing updateLeadWithQuoteLink method with the lead ID
      return await this.updateLeadWithQuoteLink(targetLead.leadId, quoteUrl, quoteId);
    } catch (error: any) {
      console.error(`❌ Error in updateLeadWithQuote alias:`, error.message);
      return false;
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
        if (boat.name === "boat_atx_disco") {
          if (isFriday) {
            availability.push({
              date: current.toISOString().split('T')[0],
              day: dayName,
              time: "12:00 PM - 4:00 PM",
              boatType: boat.name,
              capacity: boat.capacity,
              baseRate: boat.fridayRate,
              status: 'AVAILABLE', // All start as available
              notes: "Disco Packages Available"
            });
          } else if (dayOfWeek === 6) { // Saturday
            ["11:00 AM - 3:00 PM", "3:30 PM - 7:30 PM"].forEach(time => {
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

  // Partial Lead tracking methods
  async createPartialLead(partialLeadData: {
    partialLeadId: string;
    sessionId: string;
    name?: string;
    email?: string;
    phone?: string;
    eventType?: string;
    eventTypeLabel?: string;
    preferredDate?: string;
    groupSize?: number;
    chatbotData?: any;
    status?: 'partial' | 'abandoned' | 'contacted' | 'converted';
  }): Promise<boolean> {
    try {
      if (!this.sheets || !this.spreadsheetId) {
        console.log("Would create partial lead in Google Sheets:", partialLeadData);
        return true;
      }

      // Ensure the Partial Leads sheet exists
      await this.ensurePartialLeadsSheetExists();

      const now = new Date().toISOString();
      const partialLeadRow = [
        partialLeadData.partialLeadId,
        partialLeadData.sessionId,
        now, // createdDate
        partialLeadData.name || '',
        partialLeadData.email || '',
        partialLeadData.phone || '',
        partialLeadData.eventType || '',
        partialLeadData.eventTypeLabel || '',
        partialLeadData.preferredDate || '',
        partialLeadData.groupSize?.toString() || '',
        JSON.stringify(partialLeadData.chatbotData || {}),
        '', // quoteId
        partialLeadData.status || 'partial',
        now, // lastUpdated
        '', // abandonedAt
        '', // convertedToContactId
        'AI Chatbot Flow - Partial Lead',
        '', // notes
        '' // quoteUrl
      ];

      await this.sheets.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range: 'PartialLeads!A:S',
        valueInputOption: 'RAW',
        resource: {
          values: [partialLeadRow]
        }
      });

      console.log("Successfully created partial lead in Google Sheets:", partialLeadData.partialLeadId);
      return true;
    } catch (error) {
      console.error("Error creating partial lead in Google Sheets:", error);
      return false;
    }
  }

  async updatePartialLead(partialLeadId: string, updates: {
    name?: string;
    email?: string;
    phone?: string;
    eventType?: string;
    eventTypeLabel?: string;
    preferredDate?: string;
    groupSize?: number;
    chatbotData?: any;
    quoteId?: string;
    status?: 'partial' | 'abandoned' | 'contacted' | 'converted';
    abandonedAt?: string;
    convertedToContactId?: string;
    notes?: string;
    quoteUrl?: string;
  }): Promise<boolean> {
    try {
      if (!this.sheets || !this.spreadsheetId) {
        console.log("Would update partial lead in Google Sheets:", { partialLeadId, updates });
        return true;
      }

      // Find the partial lead row
      const range = 'PartialLeads!A2:S1000';
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: range,
      });
      
      const rows = response.data.values || [];
      let rowIndex = -1;
      
      for (let i = 0; i < rows.length; i++) {
        if (rows[i][0] === partialLeadId) {
          rowIndex = i + 2; // +2 because we're 0-indexed and skipping header
          break;
        }
      }

      if (rowIndex === -1) {
        console.log("Partial lead not found in Google Sheets:", partialLeadId);
        return false;
      }

      const existingRow = rows[rowIndex - 2];
      const now = new Date().toISOString();
      
      // Update fields that are provided
      const updatedRow = [
        existingRow[0], // partialLeadId
        existingRow[1], // sessionId
        existingRow[2], // createdDate
        updates.name !== undefined ? updates.name : existingRow[3],
        updates.email !== undefined ? updates.email : existingRow[4],
        updates.phone !== undefined ? updates.phone : existingRow[5],
        updates.eventType !== undefined ? updates.eventType : existingRow[6],
        updates.eventTypeLabel !== undefined ? updates.eventTypeLabel : existingRow[7],
        updates.preferredDate !== undefined ? updates.preferredDate : existingRow[8],
        updates.groupSize !== undefined ? updates.groupSize.toString() : existingRow[9],
        updates.chatbotData !== undefined ? JSON.stringify(updates.chatbotData) : existingRow[10],
        updates.quoteId !== undefined ? updates.quoteId : existingRow[11],
        updates.status !== undefined ? updates.status : existingRow[12],
        now, // lastUpdated
        updates.abandonedAt !== undefined ? updates.abandonedAt : existingRow[14],
        updates.convertedToContactId !== undefined ? updates.convertedToContactId : existingRow[15],
        existingRow[16], // source
        updates.notes !== undefined ? updates.notes : existingRow[17],
        updates.quoteUrl !== undefined ? updates.quoteUrl : existingRow[18]
      ];

      await this.sheets.spreadsheets.values.update({
        spreadsheetId: this.spreadsheetId,
        range: `PartialLeads!A${rowIndex}:S${rowIndex}`,
        valueInputOption: 'RAW',
        resource: {
          values: [updatedRow]
        }
      });

      console.log("Successfully updated partial lead in Google Sheets:", partialLeadId);
      return true;
    } catch (error) {
      console.error("Error updating partial lead in Google Sheets:", error);
      return false;
    }
  }

  // Helper method to ensure the Partial Leads sheet exists
  private async ensurePartialLeadsSheetExists(): Promise<void> {
    try {
      // Get spreadsheet metadata to check existing sheets
      const spreadsheet = await this.sheets.spreadsheets.get({
        spreadsheetId: this.spreadsheetId
      });

      const sheets = spreadsheet.data.sheets || [];
      const partialLeadsSheet = sheets.find((sheet: any) => sheet.properties?.title === 'PartialLeads');

      if (!partialLeadsSheet) {
        console.log("Creating 'PartialLeads' sheet...");
        
        // Create the PartialLeads sheet
        await this.sheets.spreadsheets.batchUpdate({
          spreadsheetId: this.spreadsheetId,
          resource: {
            requests: [{
              addSheet: {
                properties: {
                  title: 'PartialLeads',
                  gridProperties: {
                    rowCount: 1000,
                    columnCount: 19
                  }
                }
              }
            }]
          }
        });

        // Add headers
        const headers = [
          'Partial Lead ID', 'Session ID', 'Created Date', 'Name', 'Email', 'Phone',
          'Event Type', 'Event Type Label', 'Preferred Date', 'Group Size', 'Chatbot Data',
          'Quote ID', 'Status', 'Last Updated', 'Abandoned At', 'Converted To Contact ID',
          'Source', 'Notes', 'Quote URL'
        ];

        await this.sheets.spreadsheets.values.update({
          spreadsheetId: this.spreadsheetId,
          range: 'PartialLeads!A1:S1',
          valueInputOption: 'RAW',
          resource: {
            values: [headers]
          }
        });
        
        console.log("✅ Successfully created 'PartialLeads' sheet with headers");
      } else {
        console.log("✅ 'PartialLeads' sheet already exists");
      }
    } catch (error) {
      console.error("Error ensuring PartialLeads sheet exists:", error);
      throw error;
    }
  }

  // New method to read data from the "Availability" tab
  async getAvailabilityTabData(): Promise<any> {
    try {
      if (!this.sheets || !this.spreadsheetId) {
        console.warn("Google Sheets API not properly initialized");
        return {
          success: false,
          error: "Google Sheets API not initialized",
          data: null
        };
      }

      console.log(`📊 Reading data from Availability tab in spreadsheet: ${this.spreadsheetId}`);
      
      // Read all data from the "Availability" tab
      const sheetName = 'Availability';
      const range = `${sheetName}!A:Z`; // Read all columns A through Z
      
      try {
        const response = await this.sheets.spreadsheets.values.get({
          spreadsheetId: this.spreadsheetId,
          range: range,
        });
        
        const values = response.data.values || [];
        
        if (values.length === 0) {
          console.warn("No data found in the Availability tab");
          return {
            success: true,
            sheetName: sheetName,
            data: [],
            message: "Availability sheet is empty"
          };
        }
        
        // Process the data - assume first row is headers
        const headers = values[0];
        const rows = values.slice(1);
        
        // Convert to JSON format with headers as keys
        const jsonData = rows.map((row, index) => {
          const obj: any = {
            rowNumber: index + 2 // +2 because arrays are 0-indexed and we skip header row
          };
          headers.forEach((header, colIndex) => {
            obj[header] = row[colIndex] || '';
          });
          return obj;
        });
        
        console.log(`✅ Successfully read ${jsonData.length} rows from "${sheetName}" tab`);
        
        // Log sample data for analysis
        if (jsonData.length > 0) {
          console.log(`📄 Sample data from first 3 rows:`);
          console.log(JSON.stringify(jsonData.slice(0, 3), null, 2));
        }
        
        // Analyze the data structure
        const dataStructure = {
          totalRows: jsonData.length,
          headers: headers,
          sampleRows: jsonData.slice(0, 5), // First 5 rows for analysis
          // Group by various potential fields to understand the structure
          uniqueDays: [...new Set(jsonData.map(row => 
            row['Day'] || row['Day of Week'] || row['day'] || row['DayOfWeek'] || ''
          ).filter(Boolean))],
          uniqueMonths: [...new Set(jsonData.map(row => 
            row['Month'] || row['month'] || row['MonthName'] || ''
          ).filter(Boolean))],
          uniqueTimeSlots: [...new Set(jsonData.map(row => 
            row['Time'] || row['Time Slot'] || row['TimeSlot'] || row['time'] || row['Availability'] || row['Available Times'] || ''
          ).filter(Boolean))].slice(0, 10), // Limit to 10 for cleaner output
          hasAvailability: headers.some(h => 
            h.toLowerCase().includes('available') || 
            h.toLowerCase().includes('availability')
          ),
          hasPricing: headers.some(h => 
            h.toLowerCase().includes('price') || 
            h.toLowerCase().includes('cost') || 
            h.toLowerCase().includes('rate')
          ),
          dateFields: headers.filter(h => 
            h.toLowerCase().includes('date') || 
            h.toLowerCase().includes('day') || 
            h.toLowerCase().includes('month') || 
            h.toLowerCase().includes('year')
          )
        };
        
        console.log(`📊 Data structure analysis:`, JSON.stringify(dataStructure, null, 2));
        
        return {
          success: true,
          spreadsheetId: this.spreadsheetId,
          sheetName: sheetName,
          headers: headers,
          rowCount: jsonData.length,
          data: jsonData,
          structure: dataStructure,
          timestamp: new Date().toISOString()
        };
        
      } catch (sheetError: any) {
        // If the "Availability" tab doesn't exist, return appropriate error
        if (sheetError.message?.includes('Unable to parse range') || 
            sheetError.code === 400) {
          console.error(`❌ The "Availability" tab was not found in the spreadsheet`);
          
          // Get list of available sheets for debugging
          const availableSheets = await this.getAvailableSheets();
          console.log(`📋 Available sheets in spreadsheet: ${availableSheets.join(', ')}`);
          
          return {
            success: false,
            error: `The "Availability" tab was not found in the spreadsheet. Please ensure the tab is named exactly "Availability".`,
            sheetName: sheetName,
            availableTabs: availableSheets
          };
        }
        throw sheetError;
      }
      
    } catch (error: any) {
      console.error("❌ Error reading Availability tab from Google Sheets:", error);
      return {
        success: false,
        error: error.message || "Failed to read Availability tab",
        data: null
      };
    }
  }
  
  // Helper method to get list of available sheets in the spreadsheet
  async getAvailableSheets(): Promise<string[]> {
    try {
      if (!this.sheets || !this.spreadsheetId) {
        return [];
      }
      
      const spreadsheet = await this.sheets.spreadsheets.get({
        spreadsheetId: this.spreadsheetId
      });
      
      const sheets = spreadsheet.data.sheets || [];
      return sheets.map((sheet: any) => sheet.properties?.title || 'Unnamed Sheet');
    } catch (error) {
      console.error("Error fetching sheet names:", error);
      return [];
    }
  }

  // Create comprehensive availability management structure
  async createAvailabilityManagementStructure(): Promise<{success: boolean, message: string, createdSheets?: string[]}> {
    try {
      if (!this.sheets || !this.spreadsheetId) {
        return {
          success: false,
          message: "Google Sheets API not properly initialized"
        };
      }

      console.log('📊 Creating comprehensive availability management structure...');
      
      // Get existing sheets to avoid duplicates
      const existingSheets = await this.getAvailableSheets();
      console.log(`📋 Existing sheets: ${existingSheets.join(', ')}`);
      
      const sheetsToCreate = [];
      const createdSheets: string[] = [];
      
      // Define all sheets with their structure and example data
      const sheetDefinitions = [
        {
          title: 'Master Availability Rules',
          headers: ['Day Type', 'Valid Group Sizes', 'Available Time Slots', 'Effective Start Date', 'Effective End Date', 'Notes'],
          exampleData: [
            ['Monday-Thursday', '14, 25, 30, 50, 75', '10:00 AM, 2:00 PM, 6:00 PM', '2025-01-01', '2025-12-31', 'Weekday standard schedule'],
            ['Friday', '14, 25, 30, 50, 75, 100', '10:00 AM, 2:00 PM, 6:00 PM, 10:00 PM', '2025-01-01', '2025-12-31', 'Friday extended hours + disco cruise']
          ]
        },
        {
          title: 'Holiday Exceptions',
          headers: ['Date', 'Holiday Name', 'Day Override', 'Custom Time Slots', 'Price Multiplier', 'Closed', 'Notes'],
          exampleData: [
            ['2025-07-04', 'Independence Day', 'Treat as Saturday', '12:00 PM, 3:00 PM, 7:00 PM, 10:00 PM', '1.5', 'No', 'Premium pricing for holiday'],
            ['2025-12-25', 'Christmas Day', 'N/A', '', '0', 'Yes', 'Closed for Christmas']
          ]
        },
        {
          title: 'Booked Dates',
          headers: ['Date', 'Time Slot', 'Boat Name', 'Group Size', 'Customer Name', 'Booking ID', 'Status', 'Notes'],
          exampleData: [
            ['2025-02-14', '6:00 PM', 'Clever Girl', '45', 'John Smith', 'BK-2025-0214-001', 'Confirmed', 'Valentine\'s Day special event'],
            ['2025-03-15', '2:00 PM', 'Day Tripper', '12', 'Jane Doe', 'BK-2025-0315-002', 'Pending', 'Birthday party']
          ]
        },
        {
          title: 'Special Pricing',
          headers: ['Start Date', 'End Date', 'Day of Week', 'Time Slot', 'Group Size Range', 'Base Price Override', 'Discount Percentage', 'Promotion Name', 'Notes'],
          exampleData: [
            ['2025-01-15', '2025-02-28', 'All', 'All', '1-14', '', '20', 'Winter Special', 'Early season discount for small groups'],
            ['2025-03-01', '2025-03-31', 'Monday-Thursday', '10:00 AM', '15-30', '250', '', 'Spring Break Promo', 'Fixed rate for morning cruises']
          ]
        },
        {
          title: 'Blackout Dates',
          headers: ['Date', 'Reason', 'Affected Boats', 'Affected Time Slots', 'Notes'],
          exampleData: [
            ['2025-04-15', 'Maintenance', 'Day Tripper, Me Seeks The Irony', 'All', 'Annual maintenance for smaller boats'],
            ['2025-05-20', 'Private Event', 'All', '2:00 PM, 6:00 PM', 'Lake reserved for private corporate event']
          ]
        }
      ];

      // Create batch requests for sheets that don't exist
      const requests: any[] = [];
      
      for (const sheetDef of sheetDefinitions) {
        if (!existingSheets.includes(sheetDef.title)) {
          requests.push({
            addSheet: {
              properties: {
                title: sheetDef.title,
                gridProperties: {
                  rowCount: 1000,
                  columnCount: sheetDef.headers.length + 2, // Extra columns for flexibility
                  frozenRowCount: 1 // Freeze header row
                }
              }
            }
          });
          sheetsToCreate.push(sheetDef);
        } else {
          console.log(`⚠️ Sheet "${sheetDef.title}" already exists, will populate with data`);
          sheetsToCreate.push(sheetDef); // Still need to populate existing sheets
        }
      }

      // Create new sheets if any
      if (requests.length > 0) {
        console.log(`📝 Creating ${requests.length} new sheets...`);
        await this.withRetry(
          async () => {
            await this.sheets.spreadsheets.batchUpdate({
              spreadsheetId: this.spreadsheetId,
              resource: {
                requests: requests
              }
            });
          },
          `Create ${requests.length} availability management sheets`
        );
        console.log(`✅ Successfully created ${requests.length} new sheets`);
      }

      // Now populate each sheet with headers and example data
      const dataUpdates: any[] = [];
      
      for (const sheetDef of sheetsToCreate) {
        const sheetData = [
          sheetDef.headers, // Header row
          ...sheetDef.exampleData // Example data rows
        ];
        
        dataUpdates.push({
          range: `'${sheetDef.title}'!A1`,
          values: sheetData
        });
        
        createdSheets.push(sheetDef.title);
      }

      // Batch update all sheet data
      if (dataUpdates.length > 0) {
        console.log(`📝 Populating ${dataUpdates.length} sheets with headers and example data...`);
        
        await this.withRetry(
          async () => {
            await this.sheets.spreadsheets.values.batchUpdate({
              spreadsheetId: this.spreadsheetId,
              resource: {
                valueInputOption: 'RAW',
                data: dataUpdates
              }
            });
          },
          `Populate ${dataUpdates.length} sheets with data`
        );
        
        console.log(`✅ Successfully populated all sheets with headers and example data`);
      }

      // Format the sheets for better readability
      const formatRequests: any[] = [];
      
      // Get updated sheet metadata to get sheet IDs
      const updatedSpreadsheet = await this.sheets.spreadsheets.get({
        spreadsheetId: this.spreadsheetId
      });
      
      const sheetIdMap: {[key: string]: number} = {};
      for (const sheet of updatedSpreadsheet.data.sheets || []) {
        const title = sheet.properties?.title;
        if (title && sheetsToCreate.some(s => s.title === title)) {
          sheetIdMap[title] = sheet.properties?.sheetId;
        }
      }
      
      // Add formatting requests for each sheet
      for (const sheetDef of sheetsToCreate) {
        const sheetId = sheetIdMap[sheetDef.title];
        if (sheetId !== undefined) {
          // Bold header row
          formatRequests.push({
            repeatCell: {
              range: {
                sheetId: sheetId,
                startRowIndex: 0,
                endRowIndex: 1
              },
              cell: {
                userEnteredFormat: {
                  textFormat: {
                    bold: true
                  },
                  backgroundColor: {
                    red: 0.9,
                    green: 0.9,
                    blue: 0.9
                  }
                }
              },
              fields: 'userEnteredFormat(textFormat,backgroundColor)'
            }
          });
          
          // Auto-resize columns
          formatRequests.push({
            autoResizeDimensions: {
              dimensions: {
                sheetId: sheetId,
                dimension: 'COLUMNS',
                startIndex: 0,
                endIndex: sheetDef.headers.length
              }
            }
          });
        }
      }
      
      // Apply formatting if we have requests
      if (formatRequests.length > 0) {
        console.log('🎨 Applying formatting to sheets...');
        try {
          await this.sheets.spreadsheets.batchUpdate({
            spreadsheetId: this.spreadsheetId,
            resource: {
              requests: formatRequests
            }
          });
          console.log('✅ Successfully applied formatting');
        } catch (formatError) {
          console.warn('⚠️ Formatting partially failed, but sheets are created:', formatError);
          // Don't fail the whole operation if formatting fails
        }
      }

      const message = `Successfully created/updated availability management structure with ${createdSheets.length} sheets: ${createdSheets.join(', ')}`;
      console.log(`✅ ${message}`);
      
      return {
        success: true,
        message: message,
        createdSheets: createdSheets
      };
      
    } catch (error: any) {
      console.error('❌ Error creating availability management structure:', error);
      return {
        success: false,
        message: `Failed to create availability management structure: ${error.message || 'Unknown error'}`
      };
    }
  }
}

export const googleSheetsService = new GoogleSheetsService();

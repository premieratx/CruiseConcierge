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

  // Lead tracking methods
  async createLead(leadData: {
    leadId: string;
    name: string;
    email: string;
    phone?: string;
    eventType?: string;
    eventTypeLabel?: string;
    source?: string;
  }): Promise<boolean> {
    try {
      if (!this.sheets || !this.spreadsheetId) {
        console.log("Would create lead in Google Sheets:", leadData);
        return true;
      }

      // Ensure the Leads sheet exists
      await this.ensureLeadsSheetExists();

      const now = new Date().toISOString();
      const leadRow = [
        leadData.leadId,
        now, // createdDate
        leadData.name,
        leadData.email,
        leadData.phone || '',
        leadData.eventType || '',
        leadData.eventTypeLabel || '',
        '', // cruiseDate
        '', // groupSize
        '', // boatType
        '', // discoPackage
        '', // timeSlot
        'NEW', // status
        'started', // progress
        now, // lastUpdated
        leadData.source || 'AI Chatbot Flow',
        '', // specialRequests
        '', // budget
        '', // projectId
        '' // notes
      ];

      await this.sheets.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range: 'Leads!A:T',
        valueInputOption: 'RAW',
        resource: {
          values: [leadRow]
        }
      });

      console.log("Successfully created lead in Google Sheets:", leadData.leadId);
      return true;
    } catch (error) {
      console.error("Error creating lead in Google Sheets:", error);
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
        updates.notes !== undefined ? updates.notes : (currentRow[19] || '') // T: notes
      ];

      await this.sheets.spreadsheets.values.update({
        spreadsheetId: this.spreadsheetId,
        range: `Leads!A${rowIndex}:T${rowIndex}`,
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

      const range = 'Leads!A2:T1000';
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

      const range = 'Leads!A2:T1000';
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
      notes: row[19] || undefined
    };
  }

  private getMockLead(leadId: string): LeadData {
    const now = new Date().toISOString();
    return {
      leadId,
      createdDate: now,
      name: 'Mock User',
      email: 'mock@example.com',
      phone: '512-555-0123',
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
        phone: '512-555-0123',
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
        phone: '512-555-0456',
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
                    columnCount: 20
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
          'Progress', 'Last Updated', 'Source', 'Special Requests', 'Budget', 'Project ID', 'Notes'
        ];
        
        await this.sheets.spreadsheets.values.update({
          spreadsheetId: this.spreadsheetId,
          range: 'Leads!A1:T1',
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
}

export const googleSheetsService = new GoogleSheetsService();

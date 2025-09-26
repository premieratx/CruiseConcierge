import { db } from "./db";
import { 
  masterAvailabilityRules,
  holidayExceptions,
  bookings,
  specialPricingRules,
  blackoutDates,
  type InsertMasterAvailabilityRule,
  type InsertHolidayException,
  type InsertBooking,
  type InsertSpecialPricingRule,
  type InsertBlackoutDate
} from "@shared/schema";
import { GoogleSheetsService } from "./services/googleSheets";
import { eq, and, sql } from "drizzle-orm";
import { format, parse, parseISO, addHours } from "date-fns";

// Helper function to parse date strings
function parseDate(dateStr: string | undefined | null): Date | null {
  if (!dateStr) return null;
  
  try {
    // Try multiple date formats
    const formats = [
      'MM/dd/yyyy',
      'M/d/yyyy',
      'yyyy-MM-dd',
      'MMM dd, yyyy',
      'MMMM dd, yyyy',
      'dd/MM/yyyy'
    ];
    
    for (const fmt of formats) {
      try {
        const date = parse(dateStr, fmt, new Date());
        if (!isNaN(date.getTime())) {
          return date;
        }
      } catch {}
    }
    
    // Try native Date parsing as fallback
    const date = new Date(dateStr);
    if (!isNaN(date.getTime())) {
      return date;
    }
  } catch (error) {
    console.error(`Failed to parse date: ${dateStr}`, error);
  }
  
  return null;
}

// Helper to parse time slots
function parseTimeSlot(timeStr: string): { startTime: string; endTime: string } | null {
  if (!timeStr) return null;
  
  // Handle various time slot formats
  const patterns = [
    /(\d{1,2}):?(\d{2})?\s*(am|pm)?\s*[-–]\s*(\d{1,2}):?(\d{2})?\s*(am|pm)?/i,
    /(\d{1,2})\s*(am|pm)\s*[-–]\s*(\d{1,2})\s*(am|pm)/i,
  ];
  
  for (const pattern of patterns) {
    const match = timeStr.match(pattern);
    if (match) {
      let startHour = parseInt(match[1]);
      let endHour = parseInt(match[4] || match[3]);
      const startMinutes = match[2] || '00';
      const endMinutes = match[5] || '00';
      const startPeriod = match[3] || match[6];
      const endPeriod = match[6] || match[4];
      
      // Convert to 24-hour format
      if (startPeriod && startPeriod.toLowerCase() === 'pm' && startHour !== 12) {
        startHour += 12;
      } else if (startPeriod && startPeriod.toLowerCase() === 'am' && startHour === 12) {
        startHour = 0;
      }
      
      if (endPeriod && endPeriod.toLowerCase() === 'pm' && endHour !== 12) {
        endHour += 12;
      } else if (endPeriod && endPeriod.toLowerCase() === 'am' && endHour === 12) {
        endHour = 0;
      }
      
      return {
        startTime: `${startHour.toString().padStart(2, '0')}:${startMinutes.padStart(2, '0')}`,
        endTime: `${endHour.toString().padStart(2, '0')}:${endMinutes.padStart(2, '0')}`
      };
    }
  }
  
  return null;
}

// Helper to determine day type
function getDayType(dayName: string | undefined): string | null {
  if (!dayName) return null;
  
  const day = dayName.toLowerCase();
  if (day.includes('weekday') || ['monday', 'tuesday', 'wednesday', 'thursday'].some(d => day.includes(d))) {
    return 'weekday';
  } else if (day.includes('friday')) {
    return 'friday';
  } else if (day.includes('saturday')) {
    return 'saturday';
  } else if (day.includes('sunday')) {
    return 'sunday';
  }
  
  return null;
}

// Helper to parse group size
function parseGroupSize(sizeStr: string | undefined): { min: number; max: number } | null {
  if (!sizeStr) return null;
  
  // Handle formats like "14-25", "30+", "50-75", etc.
  const rangeMatch = sizeStr.match(/(\d+)\s*[-–]\s*(\d+)/);
  if (rangeMatch) {
    return {
      min: parseInt(rangeMatch[1]),
      max: parseInt(rangeMatch[2])
    };
  }
  
  const singleMatch = sizeStr.match(/(\d+)/);
  if (singleMatch) {
    const size = parseInt(singleMatch[1]);
    return { min: size, max: size };
  }
  
  return null;
}

// Main sync function
export async function syncGoogleSheetsData(): Promise<{
  success: boolean;
  message: string;
  imported: {
    masterRules: number;
    holidayExceptions: number;
    bookedDates: number;
    specialPricing: number;
    blackoutDates: number;
  };
  errors: string[];
}> {
  const errors: string[] = [];
  const imported = {
    masterRules: 0,
    holidayExceptions: 0,
    bookedDates: 0,
    specialPricing: 0,
    blackoutDates: 0
  };

  try {
    const sheetsService = new GoogleSheetsService();
    console.log("🚀 Starting Google Sheets data sync...");
    
    // Fetch all sheets data at once
    const result = await sheetsService.getAllSheetsData();
    if (!result || !result.success || !result.allSheetsData) {
      throw new Error("Failed to fetch Google Sheets data");
    }
    
    const allSheetsData = result.allSheetsData;

    // 1. Sync Master Availability Rules
    console.log("📋 Processing Master Availability Rules...");
    try {
      const rulesSheet = allSheetsData['Master Availability Rules'];
      const rulesData = rulesSheet?.data || [];
      console.log(`  Found ${rulesData.length} master rules`);
      
      for (const row of rulesData) {
        if (!row || !row['Day Type'] || !row['Available Time Slots']) continue;
        
        const dayType = getDayType(row['Day Type']);
        const timeSlot = parseTimeSlot(row['Available Time Slots']);
        const groupSize = parseGroupSize(row['Valid Group Sizes']);
        
        if (!dayType || !timeSlot || !groupSize) {
          console.warn(`  ⚠️ Skipping invalid rule: ${JSON.stringify(row)}`);
          continue;
        }
        
        const rule: InsertMasterAvailabilityRule = {
          orgId: "org_demo",
          dayType,
          groupSizeMin: groupSize.min,
          groupSizeMax: groupSize.max,
          startTime: timeSlot.startTime,
          endTime: timeSlot.endTime,
          duration: row['Duration'] ? parseInt(row['Duration']) : undefined,
          boatId: row['Boat'] || undefined,
          cruiseType: row['Type'] === 'Disco' ? 'disco' : 'private',
          basePrice: row['Base Price'] ? Math.round(parseFloat(row['Base Price']) * 100) : undefined,
          pricePerPerson: row['Per Person'] ? Math.round(parseFloat(row['Per Person']) * 100) : undefined,
          active: true,
          priority: row['Priority'] ? parseInt(row['Priority']) : 0,
          notes: row['Notes'] || undefined
        };
        
        try {
          await db.insert(masterAvailabilityRules).values(rule);
          imported.masterRules++;
        } catch (error) {
          console.error(`  ❌ Failed to insert rule: ${error}`);
        }
      }
    } catch (error) {
      errors.push(`Master Rules: ${error}`);
      console.error("❌ Error fetching Master Availability Rules:", error);
    }

    // 2. Sync Holiday Exceptions
    console.log("📋 Processing Holiday Exceptions...");
    try {
      const exceptionsSheet = allSheetsData['Holiday Exceptions'];
      const exceptionsData = exceptionsSheet?.data || [];
      console.log(`  Found ${exceptionsData.length} holiday exceptions`);
      
      for (const row of exceptionsData) {
        if (!row || !row['Date']) continue;
        
        const exceptionDate = parseDate(row['Date']);
        if (!exceptionDate) {
          console.warn(`  ⚠️ Skipping exception with invalid date: ${row['Date']}`);
          continue;
        }
        
        const exception: InsertHolidayException = {
          orgId: "org_demo",
          exceptionDate,
          holidayName: row['Holiday'] || row['Name'] || undefined,
          dayType: getDayType(row['Override Day Type']) || undefined,
          priceMultiplier: row['Price Multiplier'] ? Math.round(parseFloat(row['Price Multiplier']) * 100) : 100,
          availabilityStatus: row['Status'] || 'modified',
          customSlots: [],
          active: true,
          notes: row['Notes'] || undefined
        };
        
        // Parse custom time slots if provided
        if (row['Custom Slots']) {
          try {
            exception.customSlots = JSON.parse(row['Custom Slots']);
          } catch {}
        }
        
        try {
          await db.insert(holidayExceptions).values(exception);
          imported.holidayExceptions++;
        } catch (error) {
          console.error(`  ❌ Failed to insert exception: ${error}`);
        }
      }
    } catch (error) {
      errors.push(`Holiday Exceptions: ${error}`);
      console.error("❌ Error fetching Holiday Exceptions:", error);
    }

    // 3. Sync Booked Dates (Most Important - 79 bookings)
    console.log("📋 Processing Booked Dates...");
    try {
      const bookedSheet = allSheetsData['Booked Dates'];
      const bookedData = bookedSheet?.data || [];
      console.log(`  Found ${bookedData.length} booked dates`);
      
      for (const row of bookedData) {
        if (!row) continue;
        
        // Map columns according to requirements
        const cruiseDate = parseDate(row['Actual Cruise Date']);
        if (!cruiseDate) {
          console.warn(`  ⚠️ Skipping booking with invalid cruise date: ${row['Actual Cruise Date']}`);
          continue;
        }
        
        // Parse time slot to get start and end times
        const timeSlot = parseTimeSlot(row['Actual Time Slot'] || row['Time Slot'] || '');
        if (!timeSlot) {
          console.warn(`  ⚠️ Skipping booking with invalid time slot: ${row['Actual Time Slot']}`);
          continue;
        }
        
        // Create start and end timestamps
        const startTime = new Date(cruiseDate);
        const [startHour, startMin] = timeSlot.startTime.split(':');
        startTime.setHours(parseInt(startHour), parseInt(startMin), 0, 0);
        
        const endTime = new Date(cruiseDate);
        const [endHour, endMin] = timeSlot.endTime.split(':');
        endTime.setHours(parseInt(endHour), parseInt(endMin), 0, 0);
        
        // Handle end time that goes past midnight
        if (endTime <= startTime) {
          endTime.setDate(endTime.getDate() + 1);
        }
        
        const booking: InsertBooking = {
          orgId: "org_demo",
          boatId: row['Boat'] || undefined,
          type: row['Experience'] === 'Disco' ? 'disco' : 'private',
          status: 'confirmed',
          startTime,
          endTime,
          partyType: row['Experience'] || row['Event Type'] || undefined,
          groupSize: row['# People'] ? parseInt(row['# People']) : 0,
          contactName: row['Client Name'] || undefined,
          contactEmail: row['Email'] || undefined,
          contactPhone: row['Phone'] || undefined,
          paymentStatus: 'fully_paid',
          totalAmount: row['Total'] ? Math.round(parseFloat(row['Total']) * 100) : 0,
          notes: row['Notes'] || undefined,
          adminNotes: `Imported from Google Sheets. Confirmation Date: ${row['Date Reservation Confirmed']}`
        };
        
        try {
          await db.insert(bookings).values(booking);
          imported.bookedDates++;
        } catch (error) {
          console.error(`  ❌ Failed to insert booking: ${error}`);
        }
      }
    } catch (error) {
      errors.push(`Booked Dates: ${error}`);
      console.error("❌ Error fetching Booked Dates:", error);
    }

    // 4. Sync Special Pricing
    console.log("📋 Processing Special Pricing...");
    try {
      const pricingSheet = allSheetsData['Special Pricing'];
      const pricingData = pricingSheet?.data || [];
      console.log(`  Found ${pricingData.length} special pricing rules`);
      
      for (const row of pricingData) {
        if (!row || !row['Start Date'] || !row['End Date']) continue;
        
        const startDate = parseDate(row['Start Date']);
        const endDate = parseDate(row['End Date']);
        if (!startDate || !endDate) {
          console.warn(`  ⚠️ Skipping pricing rule with invalid dates`);
          continue;
        }
        
        const groupSize = parseGroupSize(row['Group Size']);
        
        const pricing: InsertSpecialPricingRule = {
          orgId: "org_demo",
          name: row['Name'] || `Special Pricing ${startDate.toISOString()}`,
          startDate,
          endDate,
          dayTypes: row['Day Types'] ? row['Day Types'].split(',').map((d: string) => d.trim()) : [],
          groupSizeMin: groupSize?.min || undefined,
          groupSizeMax: groupSize?.max || undefined,
          boatId: row['Boat'] || undefined,
          cruiseType: row['Cruise Type'] === 'Disco' ? 'disco' : row['Cruise Type'] === 'Private' ? 'private' : undefined,
          pricingType: row['Type'] || 'multiplier',
          pricingValue: row['Value'] ? Math.round(parseFloat(row['Value']) * 100) : 100,
          priority: row['Priority'] ? parseInt(row['Priority']) : 0,
          active: true,
          notes: row['Notes'] || undefined
        };
        
        try {
          await db.insert(specialPricingRules).values(pricing);
          imported.specialPricing++;
        } catch (error) {
          console.error(`  ❌ Failed to insert pricing rule: ${error}`);
        }
      }
    } catch (error) {
      errors.push(`Special Pricing: ${error}`);
      console.error("❌ Error fetching Special Pricing:", error);
    }

    // 5. Sync Blackout Dates
    console.log("📋 Processing Blackout Dates...");
    try {
      const blackoutSheet = allSheetsData['Blackout Dates'];
      const blackoutData = blackoutSheet?.data || [];
      console.log(`  Found ${blackoutData.length} blackout dates`);
      
      for (const row of blackoutData) {
        if (!row || !row['Date']) continue;
        
        const blackoutDate = parseDate(row['Date']);
        if (!blackoutDate) {
          console.warn(`  ⚠️ Skipping blackout with invalid date`);
          continue;
        }
        
        const blackout: InsertBlackoutDate = {
          orgId: "org_demo",
          name: row['Reason'] || 'Blackout Period',
          startDate: blackoutDate,
          endDate: blackoutDate,  // Single day blackout
          boatId: undefined,  // Will handle multiple boats below
          blockType: 'other',
          affectedSlots: [],
          recurring: false,
          active: true,
          notes: row['Notes'] || undefined
        };
        
        // Parse affected time slots if provided
        if (row['Affected Time Slots']) {
          const slots = row['Affected Time Slots'];
          if (slots.toLowerCase() === 'all') {
            blackout.affectedSlots = ['all'];
          } else {
            blackout.affectedSlots = slots.split(',').map((s: string) => s.trim());
          }
        }
        
        // Handle affected boats - may be multiple boats separated by comma  
        if (row['Affected Boats']) {
          const boats = row['Affected Boats'];
          if (!boats.toLowerCase().includes('all')) {
            // Store boat info in notes for now
            blackout.notes = `Affected boats: ${boats}. ${blackout.notes || ''}`;
          }
        }
        
        try {
          await db.insert(blackoutDates).values(blackout);
          imported.blackoutDates++;
        } catch (error) {
          console.error(`  ❌ Failed to insert blackout: ${error}`);
        }
      }
    } catch (error) {
      errors.push(`Blackout Dates: ${error}`);
      console.error("❌ Error fetching Blackout Dates:", error);
    }

    // Summary
    console.log("\n✅ Google Sheets sync completed!");
    console.log("📊 Import Summary:");
    console.log(`  - Master Rules: ${imported.masterRules}`);
    console.log(`  - Holiday Exceptions: ${imported.holidayExceptions}`);
    console.log(`  - Booked Dates: ${imported.bookedDates}`);
    console.log(`  - Special Pricing: ${imported.specialPricing}`);
    console.log(`  - Blackout Dates: ${imported.blackoutDates}`);
    
    if (errors.length > 0) {
      console.log("\n⚠️ Errors encountered:");
      errors.forEach(err => console.log(`  - ${err}`));
    }

    return {
      success: true,
      message: `Successfully imported data from Google Sheets. Total records: ${
        imported.masterRules + imported.holidayExceptions + imported.bookedDates + 
        imported.specialPricing + imported.blackoutDates
      }`,
      imported,
      errors
    };
  } catch (error) {
    console.error("❌ Critical error during sync:", error);
    return {
      success: false,
      message: `Sync failed: ${error}`,
      imported,
      errors: [...errors, `Critical error: ${error}`]
    };
  }
}

// API endpoint handler
export async function handleGoogleSheetsSync(req: any, res: any) {
  try {
    const result = await syncGoogleSheetsData();
    res.json(result);
  } catch (error) {
    console.error("Error in sync endpoint:", error);
    res.status(500).json({
      success: false,
      message: "Failed to sync Google Sheets data",
      error: error instanceof Error ? error.message : String(error)
    });
  }
}
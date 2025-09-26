import { GoogleSheetsService } from './googleSheets';
import { db } from '../db';
import { products } from '@shared/schema';
import { eq, and, not, or, inArray } from 'drizzle-orm';

// Target spreadsheet with authoritative pricing data
const PRICING_SPREADSHEET_ID = '13VHEq3Aqv46oSt0tGiF5ZBOxs1WxBU0SqEIwG6QUsxI';

// Boat mappings - handles both individual and combined names from Google Sheets
const BOAT_MAPPINGS = {
  'Day Tripper': { 
    id: 'boat_day_tripper', 
    capacity: 14, 
    maxCapacity: 14,
    crewFee: 0 // No crew fee for Day Tripper
  },
  'Me Seek': { 
    id: 'boat_me_seek', 
    capacity: 25, 
    maxCapacity: 30,
    crewFee: 5000 // $50/hour crew fee in cents
  },
  'The Irony': { 
    id: 'boat_the_irony', 
    capacity: 25, 
    maxCapacity: 30,
    crewFee: 5000 // $50/hour crew fee in cents
  },
  'Meeseeks / Irony': { // Combined entry from Google Sheets
    id: 'boat_me_seek', // Will use Me Seek as primary
    capacity: 25, 
    maxCapacity: 30,
    crewFee: 5000 // $50/hour crew fee in cents
  },
  'Clever Girl': { 
    id: 'boat_clever_girl', 
    capacity: 50, 
    maxCapacity: 75,
    crewFee: 10000 // $100/hour crew fee for 51-75 people in cents
  },
  'Disco Cruise': {
    id: 'boat_atx_disco',
    capacity: 100,
    maxCapacity: 100,
    crewFee: 0 // No crew fee for disco
  }
};

// Day type mappings
const DAY_TYPE_MAP: { [key: string]: string } = {
  'Mon-Thu': 'weekday',
  'Monday-Thursday': 'weekday',
  'Weekday': 'weekday',
  'Friday': 'friday',
  'Fri': 'friday',
  'Saturday': 'saturday',
  'Sat': 'saturday',
  'Sunday': 'sunday',
  'Sun': 'sunday',
  'Weekend': 'weekend',
  'Sat-Sun': 'weekend'
};

// Parse price string to cents
function parsePriceToCents(priceStr: string | undefined): number {
  if (!priceStr) return 0;
  
  // Remove dollar sign, commas, and whitespace
  const cleaned = priceStr.replace(/[$,\s]/g, '');
  
  // Handle per hour notation (e.g., "$200/hr")
  const perHourMatch = cleaned.match(/(\d+(?:\.\d+)?)(\/hr|\/hour)?/i);
  if (perHourMatch) {
    const amount = parseFloat(perHourMatch[1]);
    return Math.round(amount * 100); // Convert to cents
  }
  
  return 0;
}

// Parse group size range
function parseGroupSizeRange(sizeStr: string | undefined): { min: number; max: number } | null {
  if (!sizeStr) return null;
  
  // Handle formats like "1-14", "15-25", "26-30", "31-50", "51-75"
  const rangeMatch = sizeStr.match(/(\d+)\s*[-–]\s*(\d+)/);
  if (rangeMatch) {
    return {
      min: parseInt(rangeMatch[1]),
      max: parseInt(rangeMatch[2])
    };
  }
  
  // Handle single numbers
  const singleMatch = sizeStr.match(/(\d+)/);
  if (singleMatch) {
    const size = parseInt(singleMatch[1]);
    return { min: size, max: size };
  }
  
  return null;
}

export interface SyncedPricingData {
  boatPricing: {
    boat: string;
    boatId: string;
    dayType: string;
    groupSizeMin: number;
    groupSizeMax: number;
    hourlyRateCents: number;
    crewFeePerHourCents: number;
  }[];
  discoPricing: {
    packageName: string;
    pricePerPersonCents: number;
  }[];
  addonPricing: {
    name: string;
    priceCents: number;
    pricingModel: 'per_person' | 'per_hour' | 'flat_rate';
  }[];
}

export class GoogleSheetsPricingSync {
  private sheetsService: GoogleSheetsService;
  
  constructor() {
    this.sheetsService = new GoogleSheetsService();
  }

  /**
   * Fetch all pricing data from Google Sheets
   */
  async fetchPricingFromSheets(): Promise<SyncedPricingData> {
    console.log('🔄 Fetching pricing data from Google Sheets...');
    
    const result: SyncedPricingData = {
      boatPricing: [],
      discoPricing: [],
      addonPricing: []
    };
    
    try {
      // Override spreadsheet ID
      (this.sheetsService as any).spreadsheetId = PRICING_SPREADSHEET_ID;
      
      // Get all sheets data
      const sheetsData = await this.sheetsService.getAllSheetsData();
      
      if (!sheetsData.success || !sheetsData.allSheetsData) {
        throw new Error('Failed to fetch sheets data');
      }
      
      // 1. Process Weekly Pricing tab
      const weeklyPricing = sheetsData.allSheetsData['Weekly Pricing'];
      if (weeklyPricing?.data) {
        console.log(`📊 Processing ${weeklyPricing.data.length} rows from Weekly Pricing tab`);
        
        for (const row of weeklyPricing.data) {
          // Skip disco entries for boat pricing
          if (row['Private or Disco'] === 'Disco') {
            continue;
          }
          
          // Parse boat name - use correct column name from sheet
          const boatName = row['Boat to Recommend in Quote Builder'] || '';
          const boatInfo = BOAT_MAPPINGS[boatName as keyof typeof BOAT_MAPPINGS];
          
          if (!boatInfo) {
            console.warn(`⚠️ Unknown boat: ${boatName}`);
            continue;
          }
          
          // Parse day type from "Day of Week" column
          const dayTypeStr = row['Day of Week'] || '';
          let dayTypes: string[] = [];
          
          // Handle different day formats from the sheet
          if (dayTypeStr.includes('Monday') || dayTypeStr.includes('Thursday') || dayTypeStr.includes('Mon-Thu')) {
            dayTypes = ['weekday'];
          } else if (dayTypeStr.includes('Friday')) {
            dayTypes = ['friday'];
          } else if (dayTypeStr.includes('Saturday') && dayTypeStr.includes('Sunday')) {
            dayTypes = ['saturday', 'sunday'];
          } else if (dayTypeStr.includes('Saturday')) {
            dayTypes = ['saturday'];
          } else if (dayTypeStr.includes('Sunday')) {
            dayTypes = ['sunday'];
          }
          
          // Parse group size from "# of People" column
          const groupSizeStr = row['# of People'] || '';
          const groupSizeRange = parseGroupSizeRange(groupSizeStr) || 
            { min: 1, max: boatInfo.maxCapacity };
          
          // Parse hourly rate from "Base Hourly Price" column
          const hourlyRate = parsePriceToCents(
            row['Base Hourly Price'] || ''
          );
          
          if (hourlyRate === 0) {
            console.warn(`⚠️ No rate found for ${boatName} on ${dayTypeStr}`);
            continue;
          }
          
          // Add entry for each day type
          for (const dayType of dayTypes) {
            result.boatPricing.push({
              boat: boatName,
              boatId: boatInfo.id,
              dayType,
              groupSizeMin: groupSizeRange.min,
              groupSizeMax: groupSizeRange.max,
              hourlyRateCents: hourlyRate,
              crewFeePerHourCents: boatInfo.crewFee
            });
            
            console.log(`✅ Added pricing: ${boatName} (${dayType}): $${hourlyRate/100}/hr, Crew: $${boatInfo.crewFee/100}/hr`);
          }
        }
      }
      
      // 2. Process Disco entries from Weekly Pricing tab  
      if (weeklyPricing?.data) {
        console.log(`🎉 Processing disco entries from Weekly Pricing tab`);
        
        // Find disco entries and extract unique packages with their pricing
        const discoPackages = new Map<string, number>();
        
        for (const row of weeklyPricing.data) {
          if (row['Private or Disco'] === 'Disco') {
            const pricePerPerson = parsePriceToCents(row['Base Per Person Price (Disco Only)'] || '');
            
            // Determine package name based on price or other indicators
            if (pricePerPerson > 0) {
              let packageName = 'Basic';
              if (pricePerPerson === 8500) {
                packageName = 'Basic';
              } else if (pricePerPerson === 9500) {
                packageName = 'Queen';
              } else if (pricePerPerson === 10500) {
                packageName = 'Platinum';
              }
              
              discoPackages.set(packageName, pricePerPerson);
            }
          }
        }
        
        // Add disco packages to result
        for (const [packageName, pricePerPersonCents] of discoPackages) {
          result.discoPricing.push({
            packageName,
            pricePerPersonCents
          });
          console.log(`✅ Added disco package: ${packageName}: $${pricePerPersonCents/100}/person`);
        }
      }
      
      // If no disco packages found in sheet, use defaults from requirements
      if (result.discoPricing.length === 0) {
        console.log('📦 Using default disco packages from requirements');
        result.discoPricing = [
          { packageName: 'Basic', pricePerPersonCents: 8500 },  // $85
          { packageName: 'Queen', pricePerPersonCents: 9500 },  // $95  
          { packageName: 'Platinum', pricePerPersonCents: 10500 } // $105
        ];
      }
      
      // 3. Process Add-on Pricing (if exists)
      const addonPricing = sheetsData.allSheetsData['Add-on Pricing'] || 
                          sheetsData.allSheetsData['Private Add-ons'];
      if (addonPricing?.data) {
        console.log(`➕ Processing ${addonPricing.data.length} add-on packages`);
        
        for (const row of addonPricing.data) {
          const addonName = row['Add-on'] || row['Package'] || row['Name'] || '';
          const price = parsePriceToCents(
            row['Price'] || row['Cost'] || ''
          );
          const pricingModel = row['Pricing Model'] || row['Type'] || 'flat_rate';
          
          if (addonName && price > 0) {
            result.addonPricing.push({
              name: addonName,
              priceCents: price,
              pricingModel: pricingModel.includes('person') ? 'per_person' :
                           pricingModel.includes('hour') ? 'per_hour' : 'flat_rate'
            });
            
            console.log(`✅ Added add-on: ${addonName}: $${price/100} (${pricingModel})`);
          }
        }
      }
      
      console.log(`📊 Fetched ${result.boatPricing.length} boat prices, ${result.discoPricing.length} disco packages, ${result.addonPricing.length} add-ons`);
      return result;
      
    } catch (error) {
      console.error('❌ Error fetching pricing from sheets:', error);
      throw error;
    }
  }

  /**
   * Clear and rebuild products table with Google Sheets data
   */
  async syncProductsTable(): Promise<{
    success: boolean;
    message: string;
    stats: {
      deleted: number;
      created: number;
      errors: string[];
    };
  }> {
    console.log('🔄 Starting products table sync...');
    
    const stats = {
      deleted: 0,
      created: 0,
      errors: [] as string[]
    };
    
    try {
      // Fetch latest pricing from Google Sheets
      const pricingData = await this.fetchPricingFromSheets();
      
      // Start transaction
      await db.transaction(async (tx) => {
        // 1. Delete all existing products EXCEPT disco packages we want to keep
        console.log('🗑️ Clearing existing products (except disco packages)...');
        const deleteResult = await tx.delete(products)
          .where(
            not(
              and(
                eq(products.productType, 'disco_cruise'),
                inArray(products.name, [
                  'Disco Basic Package',
                  'Disco Queen Package', 
                  'Disco Platinum Package'
                ])
              )
            )
          );
        stats.deleted = deleteResult.rowCount || 0;
        console.log(`  Deleted ${stats.deleted} products`);
        
        // 2. Insert boat pricing products
        console.log('🚤 Creating boat pricing products...');
        for (const pricing of pricingData.boatPricing) {
          try {
            await tx.insert(products).values({
              orgId: 'org_demo',
              name: `${pricing.boat} - ${pricing.dayType} (${pricing.groupSizeMin}-${pricing.groupSizeMax} people)`,
              description: `Private cruise on ${pricing.boat} for ${pricing.dayType}`,
              unitPrice: pricing.hourlyRateCents,
              taxable: true,
              pricingModel: 'hourly',
              productType: 'private_cruise',
              dayType: pricing.dayType,
              groupSize: pricing.groupSizeMin, // Use min size for matching
              boatId: pricing.boatId,
              crewFeePerHour: pricing.crewFeePerHourCents,
              categoryType: 'experience',
              active: true
            });
            stats.created++;
          } catch (error) {
            const errMsg = `Failed to create product for ${pricing.boat} ${pricing.dayType}: ${error}`;
            console.error(errMsg);
            stats.errors.push(errMsg);
          }
        }
        
        // 3. Update or create disco packages
        console.log('🎉 Updating disco packages...');
        for (const disco of pricingData.discoPricing) {
          try {
            // Try to update existing
            const existingDisco = await tx.select().from(products)
              .where(
                and(
                  eq(products.productType, 'disco_cruise'),
                  eq(products.name, `Disco ${disco.packageName} Package`)
                )
              )
              .limit(1);
            
            if (existingDisco.length > 0) {
              // Update existing
              await tx.update(products)
                .set({ unitPrice: disco.pricePerPersonCents })
                .where(eq(products.id, existingDisco[0].id));
              console.log(`  Updated ${disco.packageName} to $${disco.pricePerPersonCents/100}/person`);
            } else {
              // Create new
              await tx.insert(products).values({
                orgId: 'org_demo',
                name: `Disco ${disco.packageName} Package`,
                description: `${disco.packageName} disco cruise package`,
                unitPrice: disco.pricePerPersonCents,
                taxable: true,
                pricingModel: 'per_person',
                productType: 'disco_cruise',
                boatId: 'boat_atx_disco',
                categoryType: 'experience',
                active: true
              });
              stats.created++;
            }
          } catch (error) {
            const errMsg = `Failed to update disco package ${disco.packageName}: ${error}`;
            console.error(errMsg);
            stats.errors.push(errMsg);
          }
        }
        
        // 4. Create add-on products
        if (pricingData.addonPricing.length > 0) {
          console.log('➕ Creating add-on products...');
          for (const addon of pricingData.addonPricing) {
            try {
              await tx.insert(products).values({
                orgId: 'org_demo',
                name: addon.name,
                description: `Add-on: ${addon.name}`,
                unitPrice: addon.priceCents,
                taxable: true,
                pricingModel: addon.pricingModel,
                productType: 'addon',
                categoryType: 'addon',
                active: true
              });
              stats.created++;
            } catch (error) {
              const errMsg = `Failed to create addon ${addon.name}: ${error}`;
              console.error(errMsg);
              stats.errors.push(errMsg);
            }
          }
        }
      });
      
      console.log(`✅ Sync complete: Deleted ${stats.deleted}, Created ${stats.created}`);
      
      return {
        success: true,
        message: `Successfully synced products table. Deleted ${stats.deleted} old products, created ${stats.created} new products.`,
        stats
      };
      
    } catch (error) {
      console.error('❌ Sync failed:', error);
      return {
        success: false,
        message: `Sync failed: ${error}`,
        stats
      };
    }
  }
  
  /**
   * Validate current pricing against Google Sheets
   */
  async validatePricingWithSheets(
    boatId: string, 
    dayType: string, 
    groupSize: number
  ): Promise<{
    isValid: boolean;
    expectedPriceCents: number;
    actualPriceCents?: number;
    discrepancyMessage?: string;
  }> {
    try {
      const pricingData = await this.fetchPricingFromSheets();
      
      // Find matching pricing in sheets data
      const matching = pricingData.boatPricing.find(p => 
        p.boatId === boatId &&
        p.dayType === dayType &&
        groupSize >= p.groupSizeMin &&
        groupSize <= p.groupSizeMax
      );
      
      if (!matching) {
        return {
          isValid: false,
          expectedPriceCents: 0,
          discrepancyMessage: `No pricing found in sheets for ${boatId} on ${dayType} for ${groupSize} people`
        };
      }
      
      // Query current product price
      const currentProduct = await db.select().from(products)
        .where(
          and(
            eq(products.boatId, boatId),
            eq(products.dayType, dayType),
            eq(products.productType, 'private_cruise'),
            eq(products.active, true)
          )
        )
        .limit(1);
      
      if (currentProduct.length === 0) {
        return {
          isValid: false,
          expectedPriceCents: matching.hourlyRateCents,
          discrepancyMessage: `Product not found in database for ${boatId} on ${dayType}`
        };
      }
      
      const actualPrice = currentProduct[0].unitPrice;
      const isValid = actualPrice === matching.hourlyRateCents;
      
      return {
        isValid,
        expectedPriceCents: matching.hourlyRateCents,
        actualPriceCents: actualPrice,
        discrepancyMessage: isValid ? undefined : 
          `Price mismatch: Expected $${matching.hourlyRateCents/100}/hr from sheets, got $${actualPrice/100}/hr in database`
      };
      
    } catch (error) {
      console.error('❌ Validation failed:', error);
      return {
        isValid: false,
        expectedPriceCents: 0,
        discrepancyMessage: `Validation error: ${error}`
      };
    }
  }
}

// Export singleton instance
export const googleSheetsPricingSync = new GoogleSheetsPricingSync();
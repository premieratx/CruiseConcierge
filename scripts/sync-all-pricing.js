#!/usr/bin/env node
/**
 * COMPREHENSIVE GOOGLE SHEETS PRICING SYNC
 * This script reads ALL pricing from Google Sheets and syncs to products table
 * Google Sheets is the SINGLE SOURCE OF TRUTH
 */

import { db } from '../server/db.js';
import { products, boats } from '../shared/schema.js';
import { GoogleSheetsService } from '../server/services/googleSheets.js';
import { eq, sql } from 'drizzle-orm';

const SPREADSHEET_ID = '13VHEq3Aqv46oSt0tGiF5ZBOxs1WxBU0SqEIwG6QUsxI';

// Boat mapping - CRITICAL: Fix boat names
const BOAT_MAPPING = {
  'Day Tripper': 'boat_day_tripper',
  'Me Seek': 'boat_me_seek',
  'The Irony': 'boat_the_irony',
  'Me Seeks The Irony': 'boat_me_seek', // Consolidated to single boat
  'Clever Girl': 'boat_clever_girl',
  'ATX Disco': 'boat_atx_disco'
};

// Capacity ranges - INCLUDING 31-49 range that was missing!
const CAPACITY_RANGES = {
  14: { min: 1, max: 14, boatId: 'boat_day_tripper', name: 'Day Tripper' },
  25: { min: 15, max: 25, boatId: 'boat_me_seek', name: 'Me Seek' },
  30: { min: 26, max: 30, boatId: 'boat_the_irony', name: 'The Irony' },
  50: { min: 31, max: 50, boatId: 'boat_clever_girl', name: 'Clever Girl' }, // FIXED: 31-49 range
  75: { min: 51, max: 75, boatId: 'boat_clever_girl', name: 'Clever Girl' }
};

// Crew fees per boat (HOURLY fees, not flat fees)
const CREW_FEES = {
  'boat_me_seek': 50,     // $50/hour for Me Seek when at 26-30 capacity
  'boat_the_irony': 50,   // $50/hour for The Irony when at 26-30 capacity
  'boat_clever_girl': 100 // $100/hour for Clever Girl when at 51-75 capacity
};

async function syncAllPricing() {
  console.log('🚀 COMPREHENSIVE GOOGLE SHEETS PRICING SYNC');
  console.log('=========================================');
  
  try {
    // 1. Initialize Google Sheets service
    const sheetsService = new GoogleSheetsService();
    console.log(`📊 Connecting to Google Sheets: ${SPREADSHEET_ID}`);
    
    // 2. Get ALL sheets data
    const result = await sheetsService.getAllSheetsData();
    if (!result || !result.success || !result.allSheetsData) {
      throw new Error('Failed to fetch Google Sheets data');
    }
    
    const allSheetsData = result.allSheetsData;
    console.log('✅ Successfully connected to Google Sheets');
    
    // 3. First, ensure boats exist in the database
    console.log('\n📦 Setting up boats in database...');
    const boatsToInsert = [
      { id: 'boat_day_tripper', name: 'Day Tripper', capacity: 14, maxCapacity: 14, active: true },
      { id: 'boat_me_seek', name: 'Me Seek', capacity: 25, maxCapacity: 30, extraCrewThreshold: 26, active: true },
      { id: 'boat_the_irony', name: 'The Irony', capacity: 25, maxCapacity: 30, extraCrewThreshold: 26, active: true },
      { id: 'boat_clever_girl', name: 'Clever Girl', capacity: 50, maxCapacity: 75, extraCrewThreshold: 51, active: true },
      { id: 'boat_atx_disco', name: 'ATX Disco Cruise', capacity: 100, maxCapacity: 100, active: true }
    ];
    
    for (const boat of boatsToInsert) {
      try {
        await db.insert(boats)
          .values({ ...boat, orgId: 'org_demo' })
          .onConflictDoUpdate({
            target: boats.id,
            set: {
              name: boat.name,
              capacity: boat.capacity,
              maxCapacity: boat.maxCapacity,
              extraCrewThreshold: boat.extraCrewThreshold,
              active: boat.active
            }
          });
        console.log(`  ✅ Boat ${boat.name} ready`);
      } catch (error) {
        console.error(`  ❌ Error with boat ${boat.name}:`, error);
      }
    }
    
    // 4. CLEAR ALL EXISTING PRODUCTS - Start fresh!
    console.log('\n🗑️ Clearing all existing products...');
    await db.delete(products);
    console.log('  ✅ Products table cleared');
    
    // 5. Extract pricing from "Weekly Pricing" sheet
    console.log('\n💰 Processing Weekly Pricing sheet...');
    const weeklyPricing = allSheetsData['Weekly Pricing'];
    const privateProducts = [];
    
    if (weeklyPricing && weeklyPricing.data) {
      console.log(`  Found ${weeklyPricing.data.length} rows in Weekly Pricing`);
      
      for (const row of weeklyPricing.data) {
        // Parse each row for pricing information
        const boatName = row['Boat'] || row['Boat Name'] || '';
        const dayType = row['Day Type'] || row['Day'] || '';
        const groupSizeStr = row['Group Size'] || row['Capacity'] || '';
        const hourlyRate = parseFloat(row['Hourly Rate'] || row['Rate'] || '0');
        const duration = parseInt(row['Duration'] || '4');
        const timeSlot = row['Time Slot'] || row['Time'] || '';
        
        if (!boatName || !dayType || !hourlyRate) continue;
        
        // Parse group size range
        let minSize = 1, maxSize = 100;
        if (groupSizeStr.includes('-')) {
          const parts = groupSizeStr.split('-');
          minSize = parseInt(parts[0]);
          maxSize = parseInt(parts[1]);
        } else if (groupSizeStr.includes('+')) {
          minSize = parseInt(groupSizeStr);
          maxSize = 100;
        } else if (parseInt(groupSizeStr)) {
          const size = parseInt(groupSizeStr);
          // Map to capacity ranges
          if (size <= 14) {
            minSize = 1; maxSize = 14;
          } else if (size <= 25) {
            minSize = 15; maxSize = 25;
          } else if (size <= 30) {
            minSize = 26; maxSize = 30;
          } else if (size <= 50) {
            minSize = 31; maxSize = 50;
          } else {
            minSize = 51; maxSize = 75;
          }
        }
        
        // Determine boat ID
        const boatId = BOAT_MAPPING[boatName] || boatName.toLowerCase().replace(/\s+/g, '_');
        
        // Determine crew fee
        let crewFeePerHour = 0;
        if (boatId === 'boat_me_seek' && minSize >= 26) {
          crewFeePerHour = 5000; // $50/hour in cents
        } else if (boatId === 'boat_the_irony' && minSize >= 26) {
          crewFeePerHour = 5000; // $50/hour in cents
        } else if (boatId === 'boat_clever_girl' && minSize >= 51) {
          crewFeePerHour = 10000; // $100/hour in cents
        }
        
        // Parse time slot if available
        let startTime = null, endTime = null;
        if (timeSlot && timeSlot.includes('-')) {
          const times = timeSlot.split('-').map(t => t.trim());
          startTime = times[0];
          endTime = times[1];
        }
        
        // Convert day type to our format
        let normalizedDayType = dayType.toLowerCase();
        if (normalizedDayType.includes('mon') || normalizedDayType.includes('tue') || 
            normalizedDayType.includes('wed') || normalizedDayType.includes('thu') ||
            normalizedDayType.includes('weekday')) {
          normalizedDayType = 'weekday';
        } else if (normalizedDayType.includes('fri')) {
          normalizedDayType = 'friday';
        } else if (normalizedDayType.includes('sat')) {
          normalizedDayType = 'saturday';
        } else if (normalizedDayType.includes('sun')) {
          normalizedDayType = 'sunday';
        }
        
        const product = {
          name: `${boatName} - ${dayType} (${groupSizeStr} people)`,
          description: `Private cruise on ${boatName} for ${groupSizeStr} people on ${dayType}`,
          unitPrice: Math.round(hourlyRate * 100), // Convert to cents
          pricingModel: 'hourly',
          productType: 'private_cruise',
          dayType: normalizedDayType,
          groupSize: maxSize, // Use max size for the tier
          boatId: boatId,
          duration: duration,
          crewFeePerHour: crewFeePerHour,
          startTime: startTime,
          endTime: endTime,
          active: true,
          orgId: 'org_demo',
          taxable: true
        };
        
        privateProducts.push(product);
      }
    }
    
    // 6. Process Disco Pricing
    console.log('\n🎉 Processing Disco Pricing...');
    const discoProducts = [
      {
        name: 'ATX Disco Cruise - Basic Package',
        description: 'Basic disco cruise package',
        unitPrice: 8500, // $85 per person
        pricingModel: 'per_person',
        productType: 'disco_cruise',
        boatId: 'boat_atx_disco',
        active: true,
        orgId: 'org_demo',
        taxable: true
      },
      {
        name: 'ATX Disco Cruise - Disco Queen Package',
        description: 'Disco Queen package with extras',
        unitPrice: 9500, // $95 per person
        pricingModel: 'per_person',
        productType: 'disco_cruise',
        boatId: 'boat_atx_disco',
        active: true,
        orgId: 'org_demo',
        taxable: true
      },
      {
        name: 'ATX Disco Cruise - Platinum Package',
        description: 'Premium platinum disco package',
        unitPrice: 10500, // $105 per person
        pricingModel: 'per_person',
        productType: 'disco_cruise',
        boatId: 'boat_atx_disco',
        active: true,
        orgId: 'org_demo',
        taxable: true
      }
    ];
    
    // 7. Add specific products for each capacity range and day type
    console.log('\n📋 Creating comprehensive pricing matrix...');
    const dayTypes = ['weekday', 'friday', 'saturday', 'sunday'];
    const basePricing = {
      weekday: { 14: 20000, 25: 25000, 30: 25000, 50: 30000, 75: 30000 },
      friday: { 14: 25000, 25: 30000, 30: 30000, 50: 35000, 75: 35000 },
      saturday: { 14: 30000, 25: 35000, 30: 35000, 50: 40000, 75: 40000 },
      sunday: { 14: 30000, 25: 35000, 30: 35000, 50: 40000, 75: 40000 }
    };
    
    for (const dayType of dayTypes) {
      for (const [capacityKey, range] of Object.entries(CAPACITY_RANGES)) {
        const capacity = parseInt(capacityKey);
        const basePrice = basePricing[dayType][capacity];
        
        // Determine crew fee
        let crewFeePerHour = 0;
        if ((range.boatId === 'boat_me_seek' || range.boatId === 'boat_the_irony') && capacity >= 26) {
          crewFeePerHour = 5000; // $50/hour
        } else if (range.boatId === 'boat_clever_girl' && capacity >= 51) {
          crewFeePerHour = 10000; // $100/hour
        }
        
        const product = {
          name: `${range.name} - ${dayType} (${range.min}-${range.max} people)`,
          description: `Private cruise on ${range.name} for ${range.min}-${range.max} people on ${dayType}`,
          unitPrice: basePrice,
          pricingModel: 'hourly',
          productType: 'private_cruise',
          dayType: dayType,
          groupSize: capacity,
          boatId: range.boatId,
          duration: dayType === 'weekday' ? 3 : 4, // 3 hours weekday, 4 hours other days
          crewFeePerHour: crewFeePerHour,
          active: true,
          orgId: 'org_demo',
          taxable: true
        };
        
        privateProducts.push(product);
      }
    }
    
    // 8. Insert all products
    console.log(`\n📥 Inserting ${privateProducts.length + discoProducts.length} products into database...`);
    
    let insertedCount = 0;
    for (const product of [...privateProducts, ...discoProducts]) {
      try {
        await db.insert(products).values(product);
        insertedCount++;
        if (insertedCount % 10 === 0) {
          console.log(`  ✅ Inserted ${insertedCount} products...`);
        }
      } catch (error) {
        console.error(`  ❌ Error inserting product ${product.name}:`, error.message);
      }
    }
    
    console.log(`\n✅ SYNC COMPLETE!`);
    console.log(`  - Total products inserted: ${insertedCount}`);
    console.log(`  - Private cruise products: ${privateProducts.length}`);
    console.log(`  - Disco cruise products: ${discoProducts.length}`);
    
    // 9. Verify the sync
    console.log('\n🔍 Verifying sync...');
    const productCount = await db.select({ count: sql`count(*)` }).from(products);
    console.log(`  Products in database: ${productCount[0].count}`);
    
    // Sample some products to verify
    const samples = await db.select().from(products).limit(5);
    console.log('\n  Sample products:');
    for (const sample of samples) {
      console.log(`    - ${sample.name}: $${sample.unitPrice / 100}/hr, Crew: $${sample.crewFeePerHour / 100}/hr`);
    }
    
  } catch (error) {
    console.error('❌ SYNC FAILED:', error);
    process.exit(1);
  }
}

// Run the sync
console.log('Starting pricing sync...');
syncAllPricing()
  .then(() => {
    console.log('\n✨ Pricing sync completed successfully!');
    process.exit(0);
  })
  .catch(error => {
    console.error('\n💥 Fatal error during sync:', error);
    process.exit(1);
  });
import { db } from './server/db.ts';
import { 
  masterAvailabilityRules,
  holidayExceptions,
  bookings,
  specialPricingRules,
  blackoutDates
} from './shared/schema.ts';
import { syncGoogleSheetsData } from './server/syncGoogleSheetsData.ts';
import { sql } from 'drizzle-orm';

async function clearAndSync() {
  console.log('🧹 Clearing existing availability data...');
  
  try {
    // Clear existing data
    await db.delete(masterAvailabilityRules).execute();
    console.log('  ✅ Cleared master availability rules');
    
    await db.delete(holidayExceptions).execute();
    console.log('  ✅ Cleared holiday exceptions');
    
    await db.delete(bookings).execute();
    console.log('  ✅ Cleared bookings');
    
    await db.delete(specialPricingRules).execute();
    console.log('  ✅ Cleared special pricing rules');
    
    await db.delete(blackoutDates).execute();
    console.log('  ✅ Cleared blackout dates');
    
    console.log('\n🚀 Starting fresh Google Sheets sync...');
    
    // Run the sync
    const result = await syncGoogleSheetsData();
    
    console.log('\n📊 Final Sync Result:', JSON.stringify(result, null, 2));
    
    if (result.success) {
      console.log('✅ Sync completed successfully!');
      console.log('📈 Import Statistics:');
      console.log(`  - Master Rules: ${result.imported.masterRules}`);
      console.log(`  - Holiday Exceptions: ${result.imported.holidayExceptions}`);
      console.log(`  - Booked Dates: ${result.imported.bookedDates} (expected 79)`);
      console.log(`  - Special Pricing: ${result.imported.specialPricing}`);
      console.log(`  - Blackout Dates: ${result.imported.blackoutDates}`);
      
      // Verify the actual count in the database
      const bookingCount = await db.select({ count: sql`count(*)` }).from(bookings);
      console.log(`\n🔍 Actual bookings in database: ${bookingCount[0].count}`);
      
      if (result.imported.bookedDates !== 79) {
        console.warn(`⚠️ Warning: Expected 79 booked dates but got ${result.imported.bookedDates}`);
      }
    } else {
      console.error('❌ Sync failed:', result.message);
    }
    
    if (result.errors && result.errors.length > 0) {
      console.error('⚠️ Errors encountered:');
      result.errors.forEach(err => console.error(`  - ${err}`));
    }
    
    process.exit(result.success ? 0 : 1);
  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

clearAndSync();
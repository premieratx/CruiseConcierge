import { syncGoogleSheetsData } from './server/syncGoogleSheetsData.ts';

async function runSync() {
  console.log('🚀 Starting Google Sheets data sync test...');
  
  try {
    const result = await syncGoogleSheetsData();
    console.log('\n📊 Sync Result:', JSON.stringify(result, null, 2));
    
    if (result.success) {
      console.log('✅ Sync completed successfully!');
      console.log('📈 Import Statistics:');
      console.log(`  - Master Rules: ${result.imported.masterRules}`);
      console.log(`  - Holiday Exceptions: ${result.imported.holidayExceptions}`);
      console.log(`  - Booked Dates: ${result.imported.bookedDates} (expected 79)`);
      console.log(`  - Special Pricing: ${result.imported.specialPricing}`);
      console.log(`  - Blackout Dates: ${result.imported.blackoutDates}`);
      
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
    console.error('❌ Fatal error during sync:', error);
    process.exit(1);
  }
}

runSync();
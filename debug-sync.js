import { db } from './server/db.ts';
import { GoogleSheetsService } from './server/services/googleSheets.ts';

async function debugSync() {
  console.log('🔍 Debug sync - checking data from Google Sheets...');
  
  const sheetsService = new GoogleSheetsService();
  const result = await sheetsService.getAllSheetsData();
  
  if (!result || !result.success || !result.allSheetsData) {
    console.error("Failed to fetch data");
    return;
  }
  
  const allSheetsData = result.allSheetsData;
  
  // Debug Master Availability Rules
  console.log('\n📋 MASTER AVAILABILITY RULES:');
  const rulesSheet = allSheetsData['Master Availability Rules'];
  const rulesData = rulesSheet?.data || [];
  
  console.log(`Total rules: ${rulesData.length}`);
  if (rulesData.length > 0) {
    console.log('Sample rule data (first 3):');
    rulesData.slice(0, 3).forEach((row, idx) => {
      console.log(`\nRule ${idx + 1}:`);
      console.log(`  Day Type: "${row['Day Type']}" (exists: ${!!row['Day Type']})`);
      console.log(`  Time Slot: "${row['Time Slot']}" (exists: ${!!row['Time Slot']})`);
      console.log(`  Group Size: "${row['Group Size']}" (exists: ${!!row['Group Size']})`);
      console.log(`  All fields:`, Object.keys(row));
    });
  }
  
  // Debug Blackout Dates
  console.log('\n🚫 BLACKOUT DATES:');
  const blackoutSheet = allSheetsData['Blackout Dates'];
  const blackoutData = blackoutSheet?.data || [];
  
  console.log(`Total blackouts: ${blackoutData.length}`);
  if (blackoutData.length > 0) {
    console.log('Sample blackout data (all):');
    blackoutData.forEach((row, idx) => {
      console.log(`\nBlackout ${idx + 1}:`);
      console.log(`  Start Date: "${row['Start Date']}" (exists: ${!!row['Start Date']})`);
      console.log(`  End Date: "${row['End Date']}" (exists: ${!!row['End Date']})`);
      console.log(`  All fields:`, Object.keys(row));
      console.log(`  Full row:`, JSON.stringify(row, null, 2));
    });
  }
  
  process.exit(0);
}

debugSync();
import { db } from './db';
import { products } from '@shared/schema';
import { GoogleSheetsService } from './services/googleSheets';
import { eq, and } from 'drizzle-orm';
import { calculateServerPricing, type ServerPricingRequest } from './serverPricing';

export interface PricingVerification {
  request: ServerPricingRequest;
  calculatedPricing: any;
  googleSheetsPrice?: number;
  productTablePrice?: number;
  discrepancies: string[];
  isCorrect: boolean;
  recommendations: string[];
}

/**
 * Verify pricing against Google Sheets in real-time
 * This ensures pricing is always accurate and matches the source of truth
 */
export async function verifyPricingRealtime(request: ServerPricingRequest): Promise<PricingVerification> {
  const discrepancies: string[] = [];
  const recommendations: string[] = [];
  let googleSheetsPrice: number | undefined;
  let productTablePrice: number | undefined;
  
  try {
    // 1. Calculate pricing using current system
    const calculatedPricing = await calculateServerPricing(request);
    
    // 2. Get pricing from products table
    const dayType = getDayTypeForQuery(request.eventDate);
    const productQuery = await db.select().from(products)
      .where(
        and(
          eq(products.productType, request.cruiseType === 'disco' ? 'disco_cruise' : 'private_cruise'),
          eq(products.dayType, dayType),
          eq(products.active, true)
        )
      )
      .limit(1);
    
    if (productQuery.length > 0) {
      productTablePrice = productQuery[0].unitPrice / 100; // Convert cents to dollars
    }
    
    // 3. Query Google Sheets for current pricing
    const sheetsService = new GoogleSheetsService();
    const sheetsResult = await sheetsService.getAllSheetsData();
    
    if (sheetsResult && sheetsResult.success && sheetsResult.allSheetsData) {
      const weeklyPricing = sheetsResult.allSheetsData['Weekly Pricing'];
      
      if (weeklyPricing && weeklyPricing.data) {
        // Find matching pricing in Google Sheets
        for (const row of weeklyPricing.data) {
          const boatName = row['Boat'] || '';
          const sheetDayType = row['Day Type'] || '';
          const groupSizeStr = row['Group Size'] || '';
          const hourlyRate = parseFloat(row['Hourly Rate'] || '0');
          
          // Check if this row matches our request
          if (matchesRequest(boatName, sheetDayType, groupSizeStr, request)) {
            googleSheetsPrice = hourlyRate;
            break;
          }
        }
      }
    }
    
    // 4. Compare pricing and identify discrepancies
    const calculatedRate = calculatedPricing.baseRate;
    
    if (googleSheetsPrice && Math.abs(calculatedRate - googleSheetsPrice) > 0.01) {
      discrepancies.push(`Calculated rate ($${calculatedRate}) differs from Google Sheets ($${googleSheetsPrice})`);
      recommendations.push(`Update products table with Google Sheets rate: $${googleSheetsPrice}`);
    }
    
    if (productTablePrice && Math.abs(calculatedRate - productTablePrice) > 0.01) {
      discrepancies.push(`Calculated rate ($${calculatedRate}) differs from products table ($${productTablePrice})`);
      recommendations.push('Re-sync products table from Google Sheets');
    }
    
    // 5. Check crew fees
    const expectedCrewFee = getExpectedCrewFee(request.groupSize, calculatedPricing.boatId);
    const actualCrewFee = calculatedPricing.crewFeeHourlyCents / 100;
    
    if (Math.abs(expectedCrewFee - actualCrewFee) > 0.01) {
      discrepancies.push(`Crew fee mismatch: Expected $${expectedCrewFee}/hr, got $${actualCrewFee}/hr`);
      recommendations.push(`Update crew fee for ${calculatedPricing.boatName} to $${expectedCrewFee}/hr`);
    }
    
    // 6. Verify capacity ranges
    if (request.groupSize >= 31 && request.groupSize <= 49) {
      if (calculatedPricing.boatId !== 'boat_clever_girl') {
        discrepancies.push(`Group size ${request.groupSize} should use Clever Girl, but got ${calculatedPricing.boatName}`);
        recommendations.push('Fix capacity range mapping for 31-49 people');
      }
    }
    
    // 7. Log verification results
    const isCorrect = discrepancies.length === 0;
    
    console.log(`
    📊 PRICING VERIFICATION REPORT
    ================================
    Request: ${request.eventDate}, ${request.groupSize} people, ${request.cruiseType}
    
    Calculated: $${calculatedRate}/hr
    Google Sheets: ${googleSheetsPrice ? `$${googleSheetsPrice}/hr` : 'N/A'}
    Products Table: ${productTablePrice ? `$${productTablePrice}/hr` : 'N/A'}
    
    Crew Fee: $${actualCrewFee}/hr (Expected: $${expectedCrewFee}/hr)
    Boat: ${calculatedPricing.boatName}
    
    Status: ${isCorrect ? '✅ CORRECT' : '❌ DISCREPANCIES FOUND'}
    ${discrepancies.length > 0 ? '\nIssues:\n' + discrepancies.map(d => `  - ${d}`).join('\n') : ''}
    ${recommendations.length > 0 ? '\nRecommendations:\n' + recommendations.map(r => `  - ${r}`).join('\n') : ''}
    ================================
    `);
    
    return {
      request,
      calculatedPricing,
      googleSheetsPrice,
      productTablePrice,
      discrepancies,
      isCorrect,
      recommendations
    };
    
  } catch (error) {
    console.error('❌ Pricing verification failed:', error);
    discrepancies.push(`Verification error: ${(error as Error).message}`);
    recommendations.push('Check Google Sheets connection and products table');
    
    return {
      request,
      calculatedPricing: null,
      googleSheetsPrice,
      productTablePrice,
      discrepancies,
      isCorrect: false,
      recommendations
    };
  }
}

// Helper function to match Google Sheets row with request
function matchesRequest(boatName: string, dayType: string, groupSizeStr: string, request: ServerPricingRequest): boolean {
  // Parse group size range
  let minSize = 0, maxSize = 100;
  if (groupSizeStr.includes('-')) {
    const parts = groupSizeStr.split('-');
    minSize = parseInt(parts[0]);
    maxSize = parseInt(parts[1]);
  }
  
  // Check if group size matches
  const groupSizeMatches = request.groupSize >= minSize && request.groupSize <= maxSize;
  
  // Check if day type matches
  const requestDayType = getDayTypeForQuery(request.eventDate);
  const dayTypeMatches = dayType.toLowerCase().includes(requestDayType) ||
                         (requestDayType === 'weekday' && dayType.toLowerCase().includes('weekday'));
  
  return groupSizeMatches && dayTypeMatches;
}

// Helper function to get expected crew fee
function getExpectedCrewFee(groupSize: number, boatId: string): number {
  if ((boatId === 'boat_me_seek' || boatId === 'boat_the_irony') && groupSize >= 26 && groupSize <= 30) {
    return 50; // $50/hour
  } else if (boatId === 'boat_clever_girl' && groupSize >= 51 && groupSize <= 75) {
    return 100; // $100/hour
  }
  return 0;
}

// Helper function to get day type for query
function getDayTypeForQuery(eventDate: string): string {
  const date = new Date(eventDate);
  const dayOfWeek = date.getDay();
  
  if (dayOfWeek === 5) return 'friday';
  if (dayOfWeek === 6) return 'saturday';
  if (dayOfWeek === 0) return 'sunday';
  return 'weekday';
}

/**
 * Test all critical pricing scenarios
 */
export async function testPricingScenarios(): Promise<void> {
  console.log('\n🧪 TESTING CRITICAL PRICING SCENARIOS\n');
  
  const scenarios: ServerPricingRequest[] = [
    // Test case 1: Group of 20 on weekday (should NOT be $3,998)
    {
      eventDate: '2025-10-15', // Wednesday
      groupSize: 20,
      cruiseType: 'private',
      duration: 4
    },
    // Test case 2: Group of 27 on Me Seek (should have crew fees)
    {
      eventDate: '2025-10-15', // Wednesday
      groupSize: 27,
      cruiseType: 'private',
      duration: 4
    },
    // Test case 3: Friday pricing
    {
      eventDate: '2025-10-17', // Friday
      groupSize: 20,
      cruiseType: 'private',
      duration: 4
    },
    // Test case 4: Disco Basic package
    {
      eventDate: '2025-10-17', // Friday
      groupSize: 30,
      cruiseType: 'disco',
      duration: 4
    },
    // Test case 5: Group of 35 (31-49 range test)
    {
      eventDate: '2025-10-15', // Wednesday
      groupSize: 35,
      cruiseType: 'private',
      duration: 4
    },
    // Test case 6: Large group (60 people)
    {
      eventDate: '2025-10-15', // Wednesday
      groupSize: 60,
      cruiseType: 'private',
      duration: 4
    }
  ];
  
  for (const scenario of scenarios) {
    console.log(`\nTest: ${scenario.groupSize} people on ${scenario.eventDate} (${scenario.cruiseType})`);
    console.log('---------------------------------------------------');
    
    const verification = await verifyPricingRealtime(scenario);
    
    if (verification.isCorrect) {
      console.log('✅ Pricing is correct');
    } else {
      console.log('❌ Pricing issues detected');
      verification.discrepancies.forEach(d => console.log(`  - ${d}`));
    }
    
    if (verification.calculatedPricing) {
      console.log(`  Total: $${verification.calculatedPricing.totalAmount}`);
      console.log(`  Base Rate: $${verification.calculatedPricing.baseRate}/hr`);
      console.log(`  Crew Fee: $${verification.calculatedPricing.crewFeeHourlyCents / 100}/hr`);
    }
  }
  
  console.log('\n========================================\n');
}
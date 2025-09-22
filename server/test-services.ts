import { mailgunService } from './services/mailgun';
import { goHighLevelService } from './services/gohighlevel';
import { googleSheetsService } from './services/googleSheets';
import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('STRIPE_SECRET_KEY not configured. Payment functionality will be mocked.');
}

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',
}) : null;

async function testAllServices() {
  console.log('🧪 Testing all API service connections...\n');
  
  // Test 1: Stripe
  console.log('1️⃣ Testing Stripe API...');
  try {
    if (stripe) {
      const account = await stripe.accounts.retrieve();
      console.log('   ✅ Stripe: Connected successfully');
      console.log(`   Account ID: ${account.id}, Country: ${account.country}`);
      console.log(`   Charges enabled: ${account.charges_enabled}`);
    } else {
      console.log('   ⚠️ Stripe: Not configured (STRIPE_SECRET_KEY missing)');
    }
  } catch (error: any) {
    console.log(`   ❌ Stripe: Failed - ${error.message}`);
  }

  // Test 2: Mailgun
  console.log('\n2️⃣ Testing Mailgun email service...');
  try {
    const testResult = await mailgunService.send({
      to: 'test@example.com',
      subject: 'API Test - Ignore',
      text: 'This is a test email to verify Mailgun connectivity.',
    });
    console.log(`   ✅ Mailgun: ${mailgunService.isConfigured() ? 'Email sent successfully' : 'Simulation mode (no real email sent)'}`);
    console.log(`   Configured: ${mailgunService.isConfigured()}`);
  } catch (error: any) {
    console.log(`   ❌ Mailgun: Failed - ${error.message}`);
  }

  // Test 3: GoHighLevel
  console.log('\n3️⃣ Testing GoHighLevel SMS service...');
  try {
    const testResult = await goHighLevelService.send({
      to: '+15125551234',
      body: 'API Test - This is a test SMS to verify GoHighLevel connectivity.'
    });
    console.log(`   ✅ GoHighLevel: ${goHighLevelService.isConfigured() ? 'SMS sent successfully' : 'Simulation mode (no real SMS sent)'}`);
    console.log(`   Configured: ${goHighLevelService.isConfigured()}`);
  } catch (error: any) {
    console.log(`   ❌ GoHighLevel: Failed - ${error.message}`);
  }

  // Test 4: Google Sheets
  console.log('\n4️⃣ Testing Google Sheets API...');
  try {
    const testStartDate = new Date();
    const testEndDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const availabilityData = await googleSheetsService.getAvailability(testStartDate, testEndDate);
    
    if (availabilityData && Array.isArray(availabilityData)) {
      console.log(`   ✅ Google Sheets: API working, found ${availabilityData.length} records`);
      if (availabilityData.length > 0) {
        console.log(`   Sample record: ${JSON.stringify(availabilityData[0], null, 2)}`);
      }
    } else {
      console.log('   ⚠️ Google Sheets: API connected but no data returned');
    }
  } catch (error: any) {
    console.log(`   ❌ Google Sheets: Failed - ${error.message}`);
  }

  // Test 5: Environment Variables Check
  console.log('\n5️⃣ Checking environment variables...');
  const requiredEnvVars = [
    'STRIPE_SECRET_KEY',
    'VITE_STRIPE_PUBLIC_KEY', 
    'MAILGUN_API_KEY',
    'MAILGUN_DOMAIN',
    'GOHIGHLEVEL_API_KEY',
    'GOHIGHLEVEL_LOCATION_ID',
    'GOHIGHLEVEL_PRIVATE_INTEGRATION_TOKEN',
    'GOOGLE_SHEETS_CREDENTIALS',
    'SHEET_ID'
  ];

  const optionalEnvVars = [
    'OPENAI_API_KEY',
    'SENDGRID_API_KEY',
    'ADMIN_PHONE_NUMBER'
  ];

  console.log('   Required environment variables:');
  requiredEnvVars.forEach(varName => {
    const isSet = !!process.env[varName];
    console.log(`   ${isSet ? '✅' : '❌'} ${varName}: ${isSet ? 'Set' : 'Missing'}`);
  });

  console.log('   Optional environment variables:');
  optionalEnvVars.forEach(varName => {
    const isSet = !!process.env[varName];
    console.log(`   ${isSet ? '✅' : '⚠️'} ${varName}: ${isSet ? 'Set' : 'Not set (will use fallback/mock)'}`);
  });

  console.log('\n🏁 Service testing completed!');
}

// Run the tests
testAllServices().catch(console.error);
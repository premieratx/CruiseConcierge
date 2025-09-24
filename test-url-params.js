// Test script to verify URL parameters are being processed correctly

const puppeteer = require('puppeteer');

async function testUrlParams() {
  const browser = await puppeteer.launch({ 
    headless: false, // Set to true for CI/CD
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Enable console logging
  page.on('console', msg => {
    console.log('Browser console:', msg.text());
  });
  
  // Test URL with all parameters
  const testUrl = 'http://localhost:5000/chat?date=2025-10-15&party=bachelor&people=30&contact=done';
  console.log('🧪 Testing URL:', testUrl);
  
  await page.goto(testUrl, { waitUntil: 'networkidle0' });
  
  // Wait for React to render
  await page.waitForTimeout(2000);
  
  // Check if the comparison view is displayed
  const isComparisonVisible = await page.evaluate(() => {
    // Look for elements that indicate we're in the comparison view
    const privateCard = document.querySelector('[data-testid="card-private-cruise"]');
    const discoCard = document.querySelector('[data-testid="card-disco-cruise"]');
    const comparisonSection = document.querySelector('#comparison-section');
    
    // Check for any pricing elements
    const pricingElements = document.querySelectorAll('[data-testid*="pricing"], [data-testid*="price"]');
    
    // Look for the calendar (should NOT be visible if we jumped to comparison)
    const calendar = document.querySelector('.react-calendar');
    
    return {
      hasPrivateCard: !!privateCard,
      hasDiscoCard: !!discoCard,
      hasComparisonSection: !!comparisonSection,
      hasPricingElements: pricingElements.length > 0,
      hasCalendar: !!calendar,
      currentUrl: window.location.href,
      // Get any visible text that indicates the step
      visibleText: document.body.innerText.substring(0, 500)
    };
  });
  
  console.log('✅ Test Results:');
  console.log('  - Has Private Cruise Card:', isComparisonVisible.hasPrivateCard);
  console.log('  - Has Disco Cruise Card:', isComparisonVisible.hasDiscoCard);
  console.log('  - Has Comparison Section:', isComparisonVisible.hasComparisonSection);
  console.log('  - Has Pricing Elements:', isComparisonVisible.hasPricingElements);
  console.log('  - Has Calendar (should be false):', isComparisonVisible.hasCalendar);
  console.log('  - Current URL:', isComparisonVisible.currentUrl);
  
  // Check for specific elements that confirm we're in the right view
  const hasQuoteElements = await page.evaluate(() => {
    const bodyText = document.body.innerText.toLowerCase();
    return {
      hasBachelorText: bodyText.includes('bachelor'),
      has30People: bodyText.includes('30'),
      hasOctober15: bodyText.includes('october 15') || bodyText.includes('oct 15'),
      hasPricing: bodyText.includes('$') && (bodyText.includes('total') || bodyText.includes('price'))
    };
  });
  
  console.log('\n📋 Content Verification:');
  console.log('  - Shows Bachelor Party:', hasQuoteElements.hasBachelorText);
  console.log('  - Shows 30 People:', hasQuoteElements.has30People);
  console.log('  - Shows October 15:', hasQuoteElements.hasOctober15);
  console.log('  - Shows Pricing:', hasQuoteElements.hasPricing);
  
  // Take a screenshot for visual verification
  await page.screenshot({ path: 'test-url-params-result.png', fullPage: true });
  console.log('\n📸 Screenshot saved to test-url-params-result.png');
  
  // Success criteria
  const testPassed = 
    (isComparisonVisible.hasPrivateCard || isComparisonVisible.hasDiscoCard || isComparisonVisible.hasComparisonSection) &&
    !isComparisonVisible.hasCalendar &&
    hasQuoteElements.hasBachelorText &&
    hasQuoteElements.has30People;
  
  console.log('\n' + (testPassed ? '✅ TEST PASSED!' : '❌ TEST FAILED!'));
  
  await browser.close();
  
  process.exit(testPassed ? 0 : 1);
}

// Run the test
testUrlParams().catch(console.error);
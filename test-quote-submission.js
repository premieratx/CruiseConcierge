// Test script to verify quote submission flow
const testQuoteSubmission = async () => {
  console.log('🧪 Testing quote submission API...\n');
  
  // Test data for quote submission
  const testData = {
    // Contact information
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    phone: '555-123-4567',
    
    // Event details
    eventType: 'birthday',
    eventTypeLabel: 'Birthday Party',
    eventEmoji: '🎂',
    eventDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    groupSize: 20,
    specialRequests: 'Test quote from API test',
    budget: '5000',
    
    // Selection details
    cruiseType: 'private',
    selectedSlot: {
      id: 'test-slot-1',
      dateISO: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      startTime: '14:00',
      endTime: '18:00',
      duration: 4,
      label: 'Test Boat • 2:00 PM - 6:00 PM • $500/hr',
      cruiseType: 'private',
      capacity: 25,
      availableCount: 1,
      bookable: true,
      held: false,
      boatCandidates: ['boat_test'],
      boatName: 'Test Boat',
      price: 200000, // $2000 in cents
      totalPrice: 250000 // $2500 with taxes
    },
    selectedPackages: [],
    discoPackage: null,
    ticketQuantity: null,
    selectedDuration: 4,
    selectedBoat: 'boat_test',
    preferredTimeLabel: '2:00 PM - 6:00 PM',
    groupSizeLabel: '20 people',
    
    // Pricing details
    subtotal: 2000,
    tax: 160,
    gratuity: 400,
    total: 2560,
    depositAmount: 640,
    discountCode: ''
  };
  
  try {
    console.log('📤 Sending POST request to /api/quotes/from-chat...');
    console.log('📝 Request data:', JSON.stringify(testData, null, 2));
    
    const response = await fetch('http://localhost:5000/api/quotes/from-chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
      credentials: 'include'
    });
    
    console.log('📥 Response status:', response.status);
    console.log('📥 Response headers:', response.headers.get('content-type'));
    
    // Check if response is OK
    if (!response.ok) {
      const text = await response.text();
      console.error('❌ Error response:', text);
      
      // Check if response is HTML (error page)
      if (text.includes('<!DOCTYPE') || text.includes('<html')) {
        console.error('⚠️ Server returned HTML instead of JSON!');
        console.error('This usually means the endpoint is not found (404) or there\'s a server error.');
      }
      
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Try to parse JSON
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const result = await response.json();
      console.log('✅ Response JSON:', JSON.stringify(result, null, 2));
      
      if (result.success && result.accessToken) {
        const quoteUrl = `http://localhost:5000/q/${result.accessToken}`;
        console.log('\n🎉 SUCCESS! Quote created successfully');
        console.log('📎 Quote URL:', quoteUrl);
        console.log('🆔 Quote ID:', result.quoteId);
        console.log('📧 Quote sent to:', testData.email);
        return true;
      } else {
        console.error('❌ Quote creation failed:', result.error || 'Unknown error');
        return false;
      }
    } else {
      const text = await response.text();
      console.error('❌ Response is not JSON. Content type:', contentType);
      console.error('Response text:', text);
      
      if (text.includes('<!DOCTYPE') || text.includes('<html')) {
        console.error('⚠️ Server returned HTML instead of JSON!');
      }
      
      return false;
    }
    
  } catch (error) {
    console.error('❌ Error during test:', error);
    return false;
  }
};

// Run the test
testQuoteSubmission()
  .then(success => {
    if (success) {
      console.log('\n✅ Test passed! Quote submission API is working correctly.');
      process.exit(0);
    } else {
      console.log('\n❌ Test failed! Please check the implementation.');
      process.exit(1);
    }
  })
  .catch(error => {
    console.error('\n❌ Test failed with error:', error);
    process.exit(1);
  });
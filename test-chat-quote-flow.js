// Test script for Chat -> ContactInfo -> Quote flow
// This script tests that event details are properly saved and displayed

import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

async function testChatQuoteFlow() {
  console.log('🧪 Testing Chat -> Quote Flow with Event Details\n');
  console.log('='.repeat(50));
  
  try {
    // Step 1: Test creating a quote from chat with all event details
    console.log('\n1️⃣ Creating quote from chat with event details...');
    
    const quotePayload = {
      // Contact information
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      phone: '5551234567',
      
      // Event details (THESE MUST BE SAVED)
      eventType: 'bachelorette',
      eventTypeLabel: 'Bachelorette Party',
      eventEmoji: '👰',
      eventDate: new Date('2025-02-14').toISOString(),
      groupSize: 25,
      specialRequests: 'Need decorations and music',
      budget: '$2000-3000',
      
      // Selection details (cruise choices)
      cruiseType: 'private',
      selectedSlot: {
        id: 'slot-123',
        date: '2025-02-14',
        startTime: '14:00',
        endTime: '18:00',
        boat: 'boat_meeseeks',
        available: true
      },
      selectedPackages: ['essentials'],
      ticketQuantity: 25,
      selectedBoat: 'boat_meeseeks',
      preferredTimeLabel: '2:00 PM - 6:00 PM',
      groupSizeLabel: '25-30 people',
      
      // Pricing details
      subtotal: 200000, // $2000 in cents
      tax: 16500,
      gratuity: 40000,
      total: 256500,
      depositAmount: 64125,
      discountCode: ''
    };
    
    const createResponse = await axios.post(`${BASE_URL}/api/quotes/from-chat`, quotePayload);
    
    if (createResponse.data.success) {
      console.log('✅ Quote created successfully!');
      console.log('   Quote ID:', createResponse.data.quoteId);
      console.log('   Access Token:', createResponse.data.accessToken);
      console.log('   Public URL:', createResponse.data.publicUrl);
      
      const accessToken = createResponse.data.accessToken;
      
      // Step 2: Retrieve the quote using the public endpoint
      console.log('\n2️⃣ Retrieving quote via public endpoint...');
      
      const getResponse = await axios.get(`${BASE_URL}/api/quotes/public/${accessToken}`);
      
      if (getResponse.data.success) {
        const quote = getResponse.data.quote;
        console.log('✅ Quote retrieved successfully!');
        
        // Step 3: Verify event details are present
        console.log('\n3️⃣ Verifying event details are saved...');
        
        let allDetailsPresent = true;
        
        // Check eventDetails
        if (quote.eventDetails) {
          console.log('✅ eventDetails found:');
          console.log('   - Event Type:', quote.eventDetails.eventType);
          console.log('   - Event Label:', quote.eventDetails.eventTypeLabel);
          console.log('   - Event Date:', quote.eventDetails.eventDate);
          console.log('   - Group Size:', quote.eventDetails.groupSize);
          console.log('   - Special Requests:', quote.eventDetails.specialRequests);
          console.log('   - Budget:', quote.eventDetails.budget);
          
          // Verify specific values
          if (quote.eventDetails.eventType !== 'bachelorette') {
            console.log('❌ Event type mismatch!');
            allDetailsPresent = false;
          }
          if (quote.eventDetails.groupSize !== 25) {
            console.log('❌ Group size mismatch!');
            allDetailsPresent = false;
          }
        } else {
          console.log('❌ eventDetails NOT found in quote!');
          allDetailsPresent = false;
        }
        
        // Check selectionDetails
        if (quote.selectionDetails) {
          console.log('\n✅ selectionDetails found:');
          console.log('   - Cruise Type:', quote.selectionDetails.cruiseType);
          console.log('   - Selected Boat:', quote.selectionDetails.selectedBoat);
          console.log('   - Ticket Quantity:', quote.selectionDetails.ticketQuantity);
          console.log('   - Selected Packages:', quote.selectionDetails.selectedPackages);
          
          if (quote.selectionDetails.selectedSlot) {
            console.log('   - Time Slot:', 
              `${quote.selectionDetails.selectedSlot.startTime} - ${quote.selectionDetails.selectedSlot.endTime}`
            );
          }
        } else {
          console.log('❌ selectionDetails NOT found in quote!');
          allDetailsPresent = false;
        }
        
        // Final verdict
        console.log('\n' + '='.repeat(50));
        if (allDetailsPresent) {
          console.log('🎉 SUCCESS! All event details are properly saved and retrieved!');
          console.log('✅ The quote viewer should now show:');
          console.log('   - Pre-selected date: Feb 14, 2025');
          console.log('   - Pre-selected event type: Bachelorette Party');
          console.log('   - Pre-selected group size: 25 people');
          console.log('   - Pre-selected cruise type: Private');
          console.log('   - Pre-selected time slot: 2:00 PM - 6:00 PM');
        } else {
          console.log('❌ FAIL: Some event details are missing from the quote!');
        }
        
      } else {
        console.log('❌ Failed to retrieve quote');
      }
      
    } else {
      console.log('❌ Failed to create quote:', createResponse.data.error);
    }
    
  } catch (error) {
    console.log('❌ Error during test:', error.response?.data || error.message);
  }
  
  console.log('\n' + '='.repeat(50));
  console.log('Test completed!');
}

// Run the test
testChatQuoteFlow();
import { db } from './server/db.ts';
import { bookings, blackoutDates, holidayExceptions } from './shared/schema.ts';
import { sql } from 'drizzle-orm';

async function testBookings() {
  console.log('🔍 Testing imported booking data...\n');
  
  // Count total bookings
  const bookingCount = await db.select({ count: sql`count(*)` }).from(bookings);
  console.log(`✅ Total bookings in database: ${bookingCount[0].count}`);
  
  // Get sample bookings
  const sampleBookings = await db.select().from(bookings).limit(5);
  console.log('\n📚 Sample bookings:');
  sampleBookings.forEach(b => {
    console.log(`  - ${b.clientName || 'Unknown'} on ${b.cruiseDate} at ${b.timeSlot} (${b.groupSize} people)`);
  });
  
  // Count blackout dates
  const blackoutCount = await db.select({ count: sql`count(*)` }).from(blackoutDates);
  console.log(`\n✅ Total blackout dates: ${blackoutCount[0].count}`);
  
  // Count holiday exceptions
  const holidayCount = await db.select({ count: sql`count(*)` }).from(holidayExceptions);
  console.log(`✅ Total holiday exceptions: ${holidayCount[0].count}`);
  
  process.exit(0);
}

testBookings();

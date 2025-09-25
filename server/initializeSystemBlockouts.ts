// Initialize Clever Girl October Saturday blockouts
import { storage } from './storage';
import type { InsertSystemBlockout, InsertAvailabilitySlot } from '@shared/schema';

/**
 * Create system-level blockouts for Clever Girl October Saturdays
 * Blocks: 11:00-15:00 and 15:30-19:30 on all October Saturdays
 */
export async function initializeCleverGirlOctoberBlockouts() {
  console.log('🚫 Initializing Clever Girl October Saturday blockouts...');
  
  const cleverGirlBoatId = 'boat_clever_girl';
  
  // Create system blockout pattern for Clever Girl October Saturdays
  const blockoutData: InsertSystemBlockout = {
    name: 'Clever Girl October Saturday Blockouts',
    description: 'System-level blockouts for Clever Girl on October Saturdays: 11:00-15:00 and 15:30-19:30',
    boatId: cleverGirlBoatId,
    blockType: 'special_event',
    recurringPattern: {
      frequency: 'yearly',
      daysOfWeek: [6], // Saturday = 6
      months: [10], // October = 10
      times: [
        {
          startTime: '11:00',
          endTime: '15:00'
        },
        {
          startTime: '15:30', 
          endTime: '19:30'
        }
      ]
    },
    active: true,
    createdBy: 'system'
  };
  
  try {
    // Create the system blockout pattern
    const systemBlockout = await storage.createSystemBlockout(blockoutData);
    console.log('✅ Created system blockout pattern:', systemBlockout.id);
    
    // Generate specific availability slot blocks for current year October Saturdays
    const currentYear = new Date().getFullYear();
    const octoberSaturdays = getOctoberSaturdays(currentYear);
    
    for (const saturday of octoberSaturdays) {
      // Create blocks for both time slots
      for (const timeSlot of blockoutData.recurringPattern.times) {
        const startDateTime = new Date(`${saturday}T${timeSlot.startTime}:00`);
        const endDateTime = new Date(`${saturday}T${timeSlot.endTime}:00`);
        
        const slotBlockData: InsertAvailabilitySlot = {
          boatId: cleverGirlBoatId,
          startTime: startDateTime.toISOString(),
          endTime: endDateTime.toISOString(),
          status: 'BLOCKED',
          blockReason: 'Clever Girl October Saturday - System Block',
          blockedBy: 'system',
          blockedAt: new Date().toISOString(),
          isSystemBlock: true,
          systemBlockType: 'clever_girl_october',
          notes: `System blockout: ${timeSlot.startTime}-${timeSlot.endTime} on ${saturday}`
        };
        
        try {
          const slot = await storage.createAvailabilitySlot(slotBlockData);
          console.log(`✅ Created availability slot block: ${saturday} ${timeSlot.startTime}-${timeSlot.endTime}`);
        } catch (error) {
          // Skip if slot already exists
          if (!error.message.includes('unique')) {
            console.error(`❌ Error creating slot block for ${saturday}:`, error);
          }
        }
      }
    }
    
    console.log('🎉 Clever Girl October Saturday blockouts initialized successfully!');
    return { success: true, blockoutId: systemBlockout.id, slotsCreated: octoberSaturdays.length * 2 };
    
  } catch (error) {
    console.error('❌ Error initializing Clever Girl blockouts:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Get all Saturdays in October for a given year
 */
function getOctoberSaturdays(year: number): string[] {
  const saturdays: string[] = [];
  const october = new Date(year, 9, 1); // October is month 9 (0-indexed)
  
  // Find first Saturday of October
  let date = new Date(october);
  while (date.getDay() !== 6) { // 6 = Saturday
    date.setDate(date.getDate() + 1);
  }
  
  // Collect all Saturdays in October
  while (date.getMonth() === 9) { // Still in October
    saturdays.push(date.toISOString().split('T')[0]); // YYYY-MM-DD format
    date.setDate(date.getDate() + 7); // Next Saturday
  }
  
  return saturdays;
}

/**
 * Remove Clever Girl October blockouts (for testing/cleanup)
 */
export async function removeCleverGirlOctoberBlockouts() {
  console.log('🗑️  Removing Clever Girl October Saturday blockouts...');
  
  try {
    // Remove system blockout
    const systemBlockouts = await storage.getSystemBlockouts();
    const cleverGirlBlockout = systemBlockouts.find(b => 
      b.name === 'Clever Girl October Saturday Blockouts'
    );
    
    if (cleverGirlBlockout) {
      await storage.deleteSystemBlockout(cleverGirlBlockout.id);
      console.log('✅ Removed system blockout pattern');
    }
    
    // Remove availability slot blocks
    const slots = await storage.getAvailabilitySlots();
    const cleverGirlSlots = slots.filter(s => 
      s.systemBlockType === 'clever_girl_october'
    );
    
    for (const slot of cleverGirlSlots) {
      await storage.deleteAvailabilitySlot(slot.id);
    }
    
    console.log(`✅ Removed ${cleverGirlSlots.length} availability slot blocks`);
    return { success: true, slotsRemoved: cleverGirlSlots.length };
    
  } catch (error) {
    console.error('❌ Error removing Clever Girl blockouts:', error);
    return { success: false, error: error.message };
  }
}
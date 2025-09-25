// Admin Booking/Blocking Endpoints for Bidirectional Synchronization
import type { Express } from "express";
import { z } from "zod";
import { insertAvailabilitySlotSchema, insertSystemBlockoutSchema, insertBookingSchema } from "@shared/schema";

export function addAdminBookingEndpoints(app: Express, storage: any, requireAdminAuth: any, requirePermission: any, broadcastRealtimeEvent: any) {

  // ==========================================
  // SYSTEM BLOCKOUTS MANAGEMENT 
  // ==========================================

  // Get all system blockouts
  app.get("/api/admin/system-blockouts", requireAdminAuth, requirePermission('read'), async (req, res) => {
    try {
      const { active } = req.query;
      const blockouts = await storage.getSystemBlockouts(active === 'true' ? true : undefined);
      
      console.log(`📊 Retrieved ${blockouts.length} system blockouts`);
      res.json({ success: true, blockouts });
    } catch (error: any) {
      console.error("❌ Error fetching system blockouts:", error);
      res.status(500).json({ error: "Failed to fetch system blockouts", details: error.message });
    }
  });

  // Create system blockout
  app.post("/api/admin/system-blockouts", requireAdminAuth, requirePermission('edit'), async (req, res) => {
    try {
      const blockoutData = insertSystemBlockoutSchema.parse({
        ...req.body,
        createdBy: req.adminUser?.id || 'admin'
      });
      
      const blockout = await storage.createSystemBlockout(blockoutData);
      console.log(`✅ Created system blockout: ${blockout.name} (${blockout.id})`);
      
      // Broadcast availability change event
      broadcastRealtimeEvent({
        type: 'availability_changed',
        eventTitle: 'System blockout created',
        data: { blockoutId: blockout.id, name: blockout.name, boatId: blockout.boatId },
        timestamp: new Date().toISOString()
      });
      
      res.json({ success: true, blockout });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid blockout data", details: error.errors });
      }
      console.error("❌ Error creating system blockout:", error);
      res.status(500).json({ error: "Failed to create system blockout", details: error.message });
    }
  });

  // Delete system blockout
  app.delete("/api/admin/system-blockouts/:id", requireAdminAuth, requirePermission('edit'), async (req, res) => {
    try {
      const { id } = req.params;
      const blockout = await storage.getSystemBlockout(id);
      
      if (!blockout) {
        return res.status(404).json({ error: "System blockout not found" });
      }
      
      const deleted = await storage.deleteSystemBlockout(id);
      if (!deleted) {
        return res.status(404).json({ error: "System blockout not found or already deleted" });
      }
      
      console.log(`✅ Deleted system blockout: ${blockout.name} (${id})`);
      
      // Broadcast availability change event
      broadcastRealtimeEvent({
        type: 'availability_changed',
        eventTitle: 'System blockout removed',
        data: { blockoutId: id, name: blockout.name, boatId: blockout.boatId },
        timestamp: new Date().toISOString()
      });
      
      res.json({ success: true });
    } catch (error: any) {
      console.error("❌ Error deleting system blockout:", error);
      res.status(500).json({ error: "Failed to delete system blockout", details: error.message });
    }
  });

  // ==========================================
  // ADMIN BOOKING MANAGEMENT 
  // ==========================================

  // Admin book time slot (create manual booking)
  app.post("/api/admin/book-slot", requireAdminAuth, requirePermission('edit'), async (req, res) => {
    try {
      const bookSlotSchema = z.object({
        boatId: z.string().min(1, "Boat ID is required"),
        startTime: z.string().datetime("Invalid start time format"),
        endTime: z.string().datetime("Invalid end time format"),
        contactName: z.string().min(1, "Contact name is required"),
        contactEmail: z.string().email("Valid email is required").optional(),
        contactPhone: z.string().optional(),
        groupSize: z.number().min(1, "Group size must be at least 1"),
        eventType: z.string().default("admin_booking"),
        specialRequests: z.string().optional(),
        adminNotes: z.string().optional(),
        totalAmount: z.number().min(0).optional(),
        paymentStatus: z.enum(["pending", "deposit_paid", "fully_paid"]).default("pending")
      });

      const bookingData = bookSlotSchema.parse(req.body);
      const startTime = new Date(bookingData.startTime);
      const endTime = new Date(bookingData.endTime);

      console.log(`📅 Admin booking slot: ${bookingData.boatId} from ${startTime.toISOString()} to ${endTime.toISOString()}`);

      // Check for conflicts before booking
      const hasConflict = await storage.checkBookingConflict(bookingData.boatId, startTime, endTime);
      if (hasConflict) {
        return res.status(409).json({ 
          error: "Time slot conflict", 
          details: "The selected time slot is already booked" 
        });
      }

      // Create the booking using admin book method
      const result = await storage.adminBookTimeSlot(
        bookingData.boatId,
        startTime,
        endTime,
        {
          type: 'private',
          status: 'booked',
          groupSize: bookingData.groupSize,
          contactName: bookingData.contactName,
          contactEmail: bookingData.contactEmail,
          contactPhone: bookingData.contactPhone,
          partyType: bookingData.eventType,
          specialRequests: bookingData.specialRequests,
          adminNotes: bookingData.adminNotes,
          totalAmount: bookingData.totalAmount || 0,
          paymentStatus: bookingData.paymentStatus,
          lastModifiedBy: req.adminUser?.id || 'admin'
        }
      );

      console.log(`✅ Admin booking created: ${result.booking.id}`);

      // Broadcast booking creation event
      broadcastRealtimeEvent({
        type: 'admin_booking_created',
        boatId: bookingData.boatId,
        startTime: startTime.toTimeString().slice(0, 5), // HH:MM format
        endTime: endTime.toTimeString().slice(0, 5),
        eventDate: startTime.toISOString().split('T')[0], // YYYY-MM-DD
        customerName: bookingData.contactName,
        customerEmail: bookingData.contactEmail,
        eventTitle: `Admin booking created for ${bookingData.contactName}`,
        bookingId: result.booking.id,
        timestamp: new Date().toISOString()
      });

      res.json({ success: true, booking: result.booking, slot: result.slot });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid booking data", details: error.errors });
      }
      console.error("❌ Error creating admin booking:", error);
      res.status(500).json({ error: "Failed to create admin booking", details: error.message });
    }
  });

  // Admin cancel booking
  app.delete("/api/admin/cancel-booking/:id", requireAdminAuth, requirePermission('edit'), async (req, res) => {
    try {
      const { id } = req.params;
      const { reason } = req.body;

      const booking = await storage.getBooking(id);
      if (!booking) {
        return res.status(404).json({ error: "Booking not found" });
      }

      // Update booking status to canceled
      const canceledBooking = await storage.updateBooking(id, {
        status: 'canceled',
        adminNotes: `${booking.adminNotes || ''}\n\nCanceled by admin: ${reason || 'No reason provided'}`.trim(),
        lastModifiedBy: req.adminUser?.id || 'admin',
        lastModifiedAt: new Date()
      });

      console.log(`✅ Admin canceled booking: ${id} - Reason: ${reason}`);

      // Broadcast booking cancellation event
      broadcastRealtimeEvent({
        type: 'availability_changed',
        boatId: booking.boatId,
        startTime: booking.startTime?.toTimeString().slice(0, 5),
        endTime: booking.endTime?.toTimeString().slice(0, 5),
        eventDate: booking.startTime?.toISOString().split('T')[0],
        eventTitle: `Booking canceled: ${booking.contactName}`,
        bookingId: id,
        timestamp: new Date().toISOString()
      });

      res.json({ success: true, booking: canceledBooking });
    } catch (error: any) {
      console.error("❌ Error canceling admin booking:", error);
      res.status(500).json({ error: "Failed to cancel booking", details: error.message });
    }
  });

  // ==========================================
  // ADMIN SLOT BLOCKING MANAGEMENT 
  // ==========================================

  // Admin block time slot
  app.post("/api/admin/block-slot", requireAdminAuth, requirePermission('edit'), async (req, res) => {
    try {
      const blockSlotSchema = z.object({
        boatId: z.string().min(1, "Boat ID is required"),
        startTime: z.string().datetime("Invalid start time format"),
        endTime: z.string().datetime("Invalid end time format"),
        blockReason: z.string().min(1, "Block reason is required"),
        notes: z.string().optional()
      });

      const blockData = blockSlotSchema.parse(req.body);
      const startTime = new Date(blockData.startTime);
      const endTime = new Date(blockData.endTime);

      console.log(`🚫 Admin blocking slot: ${blockData.boatId} from ${startTime.toISOString()} to ${endTime.toISOString()}`);

      // Create availability slot block
      const slotData = {
        boatId: blockData.boatId,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        status: 'BLOCKED' as const,
        blockReason: blockData.blockReason,
        blockedBy: req.adminUser?.id || 'admin',
        blockedAt: new Date().toISOString(),
        notes: blockData.notes,
        isSystemBlock: false
      };

      const slot = await storage.createAvailabilitySlot(slotData);
      console.log(`✅ Admin slot blocked: ${slot.id}`);

      // Broadcast slot blocking event
      broadcastRealtimeEvent({
        type: 'availability_changed',
        boatId: blockData.boatId,
        startTime: startTime.toTimeString().slice(0, 5),
        endTime: endTime.toTimeString().slice(0, 5),
        eventDate: startTime.toISOString().split('T')[0],
        eventTitle: `Time slot blocked: ${blockData.blockReason}`,
        slotId: slot.id,
        timestamp: new Date().toISOString()
      });

      res.json({ success: true, slot });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid block data", details: error.errors });
      }
      console.error("❌ Error blocking slot:", error);
      res.status(500).json({ error: "Failed to block slot", details: error.message });
    }
  });

  // Admin unblock time slot
  app.delete("/api/admin/unblock-slot/:id", requireAdminAuth, requirePermission('edit'), async (req, res) => {
    try {
      const { id } = req.params;
      
      const slot = await storage.getAvailabilitySlot(id);
      if (!slot) {
        return res.status(404).json({ error: "Blocked slot not found" });
      }

      if (slot.status !== 'BLOCKED') {
        return res.status(400).json({ error: "Slot is not currently blocked" });
      }

      const deleted = await storage.deleteAvailabilitySlot(id);
      if (!deleted) {
        return res.status(404).json({ error: "Failed to unblock slot" });
      }

      console.log(`✅ Admin unblocked slot: ${id}`);

      // Broadcast slot unblocking event
      broadcastRealtimeEvent({
        type: 'availability_changed',
        boatId: slot.boatId,
        startTime: slot.startTime?.toTimeString().slice(0, 5),
        endTime: slot.endTime?.toTimeString().slice(0, 5),
        eventDate: slot.startTime?.toISOString().split('T')[0],
        eventTitle: `Time slot unblocked`,
        slotId: id,
        timestamp: new Date().toISOString()
      });

      res.json({ success: true });
    } catch (error: any) {
      console.error("❌ Error unblocking slot:", error);
      res.status(500).json({ error: "Failed to unblock slot", details: error.message });
    }
  });

  // ==========================================
  // CLEVER GIRL INITIALIZATION
  // ==========================================

  // Initialize Clever Girl October Saturday blockouts
  app.post("/api/admin/initialize-clever-girl-blockouts", requireAdminAuth, requirePermission('edit'), async (req, res) => {
    try {
      console.log("🚫 Initializing Clever Girl October Saturday blockouts...");
      
      // Import the initialization function
      const { initializeCleverGirlOctoberBlockouts } = await import('./initializeSystemBlockouts');
      const result = await initializeCleverGirlOctoberBlockouts();
      
      if (result.success) {
        console.log(`✅ Clever Girl blockouts initialized: ${result.slotsCreated} slots created`);
        
        // Broadcast system blockouts created event
        broadcastRealtimeEvent({
          type: 'availability_changed',
          boatId: 'boat_clever_girl',
          eventTitle: 'Clever Girl October Saturday blockouts initialized',
          data: { 
            blockoutId: result.blockoutId, 
            slotsCreated: result.slotsCreated,
            month: 'October',
            timeSlots: ['11:00-15:00', '15:30-19:30']
          },
          timestamp: new Date().toISOString()
        });
        
        res.json({ 
          success: true, 
          message: `Clever Girl October Saturday blockouts initialized successfully`,
          blockoutId: result.blockoutId,
          slotsCreated: result.slotsCreated
        });
      } else {
        res.status(500).json({ 
          success: false, 
          error: "Failed to initialize Clever Girl blockouts", 
          details: result.error 
        });
      }
    } catch (error: any) {
      console.error("❌ Error initializing Clever Girl blockouts:", error);
      res.status(500).json({ 
        error: "Failed to initialize Clever Girl blockouts", 
        details: error.message 
      });
    }
  });

  // Remove Clever Girl blockouts (for testing/cleanup)
  app.delete("/api/admin/remove-clever-girl-blockouts", requireAdminAuth, requirePermission('edit'), async (req, res) => {
    try {
      console.log("🗑️ Removing Clever Girl October Saturday blockouts...");
      
      const { removeCleverGirlOctoberBlockouts } = await import('./initializeSystemBlockouts');
      const result = await removeCleverGirlOctoberBlockouts();
      
      if (result.success) {
        console.log(`✅ Clever Girl blockouts removed: ${result.slotsRemoved} slots deleted`);
        
        // Broadcast system blockouts removed event
        broadcastRealtimeEvent({
          type: 'availability_changed',
          boatId: 'boat_clever_girl',
          eventTitle: 'Clever Girl October Saturday blockouts removed',
          data: { slotsRemoved: result.slotsRemoved },
          timestamp: new Date().toISOString()
        });
        
        res.json({ 
          success: true, 
          message: `Clever Girl October Saturday blockouts removed successfully`,
          slotsRemoved: result.slotsRemoved
        });
      } else {
        res.status(500).json({ 
          success: false, 
          error: "Failed to remove Clever Girl blockouts", 
          details: result.error 
        });
      }
    } catch (error: any) {
      console.error("❌ Error removing Clever Girl blockouts:", error);
      res.status(500).json({ 
        error: "Failed to remove Clever Girl blockouts", 
        details: error.message 
      });
    }
  });
}
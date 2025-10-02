import { db } from "./db";
import { users } from "@shared/schema";
import { PasswordService } from "./auth";
import { eq } from "drizzle-orm";

async function seedAdmin() {
  try {
    console.log("🌱 Seeding admin user...");

    const existingUser = await db.select().from(users)
      .where(eq(users.email, "ppcaustin@gmail.com"))
      .limit(1);

    if (existingUser.length > 0) {
      console.log("✅ Admin user already exists");
      return;
    }

    const hashedPassword = await PasswordService.hash("admin123");

    const [newUser] = await db.insert(users).values({
      email: "ppcaustin@gmail.com",
      username: "ppcaustin",
      password: hashedPassword,
      role: "admin",
      firstName: "PPC",
      lastName: "Austin",
      isActive: true,
    }).returning();

    console.log("✅ Admin user created successfully!");
    console.log("   Email: ppcaustin@gmail.com");
    console.log("   Username: ppcaustin");
    console.log("   Password: admin123");
    console.log("   Role: admin");
    
  } catch (error) {
    console.error("❌ Error seeding admin user:", error);
    throw error;
  } finally {
    process.exit(0);
  }
}

seedAdmin();

import Database from "@replit/database";

const db = new Database();

async function clear() {
  console.log("🗑️  Clearing existing blog data from Replit DB...");
  
  // Get the current index to know what posts exist
  const postsIndex = await db.get("index:posts");
  const slugs = Array.isArray(postsIndex) ? postsIndex : (postsIndex?.value || []);
  
  console.log(`Found ${slugs.length} posts to clear`);
  
  // Delete all post:* keys
  for (const slug of slugs) {
    await db.delete(`post:${slug}`);
    await db.delete(`date:${slug}`);
    await db.delete(`search:${slug}`);
  }
  
  // Clear main index
  await db.delete("index:posts");
  
  console.log("✓ Cleared all post data");
  console.log("✓ Ready for fresh import");
}

clear().catch(console.error);

import Database from "@replit/database";
const db = new Database();

async function check() {
  // Check index
  const postsIndex = await db.get("index:posts");
  console.log("index:posts:", Array.isArray(postsIndex) ? `Array with ${postsIndex.length} items` : typeof postsIndex);
  
  // List all keys
  const allKeys = await db.list();
  const postKeys = allKeys.filter(k => k.startsWith("post:"));
  const dateKeys = allKeys.filter(k => k.startsWith("date:"));
  
  console.log(`\nDatabase keys:`);
  console.log(`- post:* keys: ${postKeys.length}`);
  console.log(`- date:* keys: ${dateKeys.length}`);
  console.log(`- Total keys: ${allKeys.length}`);
  
  if (postKeys.length > 0) {
    console.log(`\nSample post keys:`, postKeys.slice(0, 5));
  }
}

check().catch(console.error);

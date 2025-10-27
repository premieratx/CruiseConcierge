import fs from 'fs';

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));

// Revert to ESM format and handle CommonJS deps by bundling them
packageJson.scripts.build = "NODE_ENV=production vite build --mode production && esbuild server/index.ts --platform=node --bundle --format=esm --outfile=dist/index.js --external:@neondatabase/serverless --external:drizzle-orm --external:express --external:express-session --external:connect-pg-simple --external:passport --external:multer --external:compression --external:@sendgrid/mail --external:stripe --external:googleapis --external:@google-cloud/storage --external:openai --external:@google/genai --external:ws --external:@replit/database --external:fast-xml-parser";
packageJson.scripts.start = "NODE_ENV=production node dist/index.js";

fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2) + '\n');
console.log('Fixed package.json scripts to use ESM format with proper externals');

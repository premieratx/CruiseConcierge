import fs from 'fs';

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
packageJson.scripts.build = "NODE_ENV=production vite build --mode production && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outfile=dist/index.js";
packageJson.scripts.start = "NODE_ENV=production node dist/index.js";
fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
console.log('Updated package.json to use ESM with --packages=external');

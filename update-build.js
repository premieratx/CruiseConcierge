import fs from 'fs';

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));

// Update the build and start scripts to use CommonJS format
packageJson.scripts.build = "NODE_ENV=production vite build --mode production && esbuild server/index.ts --platform=node --packages=external --bundle --format=cjs --outfile=dist/index.cjs";
packageJson.scripts.start = "NODE_ENV=production node dist/index.cjs";

fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2) + '\n');
console.log('Updated package.json scripts to use CommonJS format');

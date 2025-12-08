import fs from 'fs';

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
packageJson.scripts.build = "NODE_ENV=production vite build --mode production && esbuild server/index.ts --platform=node --format=esm --bundle --outfile=dist/index.js --target=node20 --packages=external --external:react --external:react-dom --external:react-helmet-async --external:@tanstack/react-query --external:wouter --external:*.tsx --external:*.jsx --loader:.ts=ts --loader:.js=js --conditions=node";
packageJson.scripts.start = "NODE_ENV=production node dist/index.js";
fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
console.log('Updated package.json with proper ESM build settings');

// Build script for server - using CommonJS format to handle dependencies
const { build } = require('esbuild');

build({
  entryPoints: ['server/index.ts'],
  platform: 'node',
  bundle: true,
  format: 'cjs',
  outfile: 'dist/index.cjs',
  external: [
    '@neondatabase/serverless',
    'drizzle-orm',
    'express',
    'express-session',
    'connect-pg-simple',
    'passport',
    'multer',
    'compression',
    '@sendgrid/mail',
    'stripe',
    'googleapis',
    '@google-cloud/storage',
    'openai',
    '@google/genai',
    'ws',
    '@replit/database',
    'fast-xml-parser'
  ],
  loader: {
    '.ts': 'ts',
    '.tsx': 'tsx'
  }
}).then(() => {
  console.log('Server build complete');
}).catch((error) => {
  console.error('Build failed:', error);
  process.exit(1);
});

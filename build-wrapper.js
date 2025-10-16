// Force production environment for builds
process.env.NODE_ENV = 'production';
process.env.VITE_ENV = 'production';

// Run the build
import { spawn } from 'child_process';

const build = spawn('npx', [
  'vite', 'build',
  '--config', 'vite.config.production.ts',
  '--mode', 'production'
], { stdio: 'inherit', env: { ...process.env, NODE_ENV: 'production' } });

build.on('close', (code) => {
  if (code === 0) {
    const server = spawn('npx', [
      'esbuild', 'server/index.ts',
      '--platform=node',
      '--packages=external',
      '--bundle',
      '--format=esm',
      '--outdir=dist'
    ], { stdio: 'inherit' });
    
    server.on('close', (serverCode) => {
      process.exit(serverCode);
    });
  } else {
    process.exit(code);
  }
});

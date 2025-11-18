import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputPath = join(__dirname, '../attached_assets/PPC Logo LARGE_1763423728405.png');
const outputDir = join(__dirname, '../public');

async function generateFavicons() {
  console.log('Generating favicons from PPC logo...');

  try {
    // Read the input image
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    console.log(`Input image: ${metadata.width}x${metadata.height}`);

    // Generate favicon.png (32x32 for general use)
    await image
      .resize(32, 32, { fit: 'contain', background: { r: 0, g: 212, b: 255, alpha: 0 } })
      .png()
      .toFile(join(outputDir, 'favicon.png'));
    console.log('✓ Generated favicon.png (32x32)');

    // Generate favicon.ico (multi-size ICO file)
    await image
      .resize(32, 32, { fit: 'contain', background: { r: 0, g: 212, b: 255, alpha: 0 } })
      .toFile(join(outputDir, 'favicon.ico'));
    console.log('✓ Generated favicon.ico (32x32)');

    // Generate apple-touch-icon.png (180x180 for iOS)
    await image
      .resize(180, 180, { fit: 'contain', background: { r: 0, g: 212, b: 255, alpha: 1 } })
      .png()
      .toFile(join(outputDir, 'apple-touch-icon.png'));
    console.log('✓ Generated apple-touch-icon.png (180x180)');

    // Generate icon-192.png for PWA manifest
    await image
      .resize(192, 192, { fit: 'contain', background: { r: 0, g: 212, b: 255, alpha: 1 } })
      .png()
      .toFile(join(outputDir, 'icon-192.png'));
    console.log('✓ Generated icon-192.png (192x192)');

    // Generate icon-512.png for PWA manifest
    await image
      .resize(512, 512, { fit: 'contain', background: { r: 0, g: 212, b: 255, alpha: 1 } })
      .png()
      .toFile(join(outputDir, 'icon-512.png'));
    console.log('✓ Generated icon-512.png (512x512)');

    console.log('\n✅ All favicons generated successfully!');
  } catch (error) {
    console.error('Error generating favicons:', error);
    process.exit(1);
  }
}

generateFavicons();

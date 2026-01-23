import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const SOURCE_DIR = 'public/gallery-imports/2024 Best Disco Photos';
const OUTPUT_DIR = 'public/gallery-optimized';

async function optimizePhotos() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const files = fs.readdirSync(SOURCE_DIR).filter(f => 
    f.match(/\.(jpg|jpeg|png|webp)$/i)
  );

  console.log(`Found ${files.length} photos to optimize\n`);

  let processed = 0;
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;

  for (const file of files) {
    const inputPath = path.join(SOURCE_DIR, file);
    const baseName = file.replace(/\.[^.]+$/, '').replace(/[^a-zA-Z0-9-]/g, '_');
    const outputPath = path.join(OUTPUT_DIR, `${baseName}.webp`);

    try {
      const originalSize = fs.statSync(inputPath).size;
      totalOriginalSize += originalSize;

      const optimized = await sharp(inputPath)
        .resize(1200, null, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 80 })
        .toBuffer();

      fs.writeFileSync(outputPath, optimized);
      totalOptimizedSize += optimized.length;

      processed++;
      const savings = ((originalSize - optimized.length) / originalSize * 100).toFixed(1);
      console.log(`✓ ${file} -> ${baseName}.webp (${(originalSize/1024/1024).toFixed(1)}MB -> ${(optimized.length/1024).toFixed(0)}KB, ${savings}% smaller)`);
    } catch (error: any) {
      console.log(`✗ ${file}: ${error.message}`);
    }
  }

  console.log(`\n========================================`);
  console.log(`Processed: ${processed}/${files.length} photos`);
  console.log(`Original total: ${(totalOriginalSize/1024/1024).toFixed(1)}MB`);
  console.log(`Optimized total: ${(totalOptimizedSize/1024/1024).toFixed(1)}MB`);
  console.log(`Space saved: ${((totalOriginalSize - totalOptimizedSize)/1024/1024).toFixed(1)}MB (${((totalOriginalSize - totalOptimizedSize)/totalOriginalSize*100).toFixed(1)}%)`);
  console.log(`Output: ${OUTPUT_DIR}`);
}

optimizePhotos().catch(console.error);

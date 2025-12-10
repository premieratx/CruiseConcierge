import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const WIDTHS = [320, 640, 960, 1200, 1920];
const FORMATS = ['webp', 'avif'] as const;
const INPUT_DIRS = ['attached_assets', 'public/attached_assets'];
const OUTPUT_DIR = 'public/optimized-images';

async function generateResponsiveImages() {
  // Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const manifest: Record<string, Record<string, string[]>> = {};
  
  // Find hero/banner images from all input directories
  for (const inputDir of INPUT_DIRS) {
    if (!fs.existsSync(inputDir)) {
      console.log(`Directory ${inputDir} does not exist, skipping...`);
      continue;
    }

    const files = fs.readdirSync(inputDir)
      .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));

    for (const file of files) {
      const inputPath = path.join(inputDir, file);
      const baseName = path.parse(file).name;
      
      // Skip if already processed (from another directory)
      if (manifest[file]) {
        console.log(`Skipping duplicate file: ${file}`);
        continue;
      }
      
      manifest[file] = {};

      for (const format of FORMATS) {
        manifest[file][format] = [];
        
        for (const width of WIDTHS) {
          const outputName = `${baseName}-${width}.${format}`;
          const outputPath = path.join(OUTPUT_DIR, outputName);
          
          await sharp(inputPath)
            .resize(width, null, { withoutEnlargement: true })
            .toFormat(format, { quality: 80 })
            .toFile(outputPath);
          
          manifest[file][format].push(`/optimized-images/${outputName}`);
        }
      }
    }
  }

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'manifest.json'),
    JSON.stringify(manifest, null, 2)
  );
  
  console.log('Generated responsive images:', manifest);
}

generateResponsiveImages().catch(console.error);

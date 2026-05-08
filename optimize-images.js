import imagemin from 'imagemin';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminPngquant from 'imagemin-pngquant';
import imageminGiflossy from 'imagemin-giflossy';
import imageminWebp from 'imagemin-webp';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.join(__dirname, 'src/assets');
const outputDir = path.join(__dirname, 'optimized_assets');

// Ensure output directory exists
fs.ensureDirSync(outputDir);

async function optimizeImages() {
  try {
    console.log('🚀 Starting image optimization...');
    console.log(`📁 Source: ${sourceDir}`);
    console.log(`📁 Output: ${outputDir}\n`);

    const files = await imagemin([`${sourceDir}/**/*.{jpg,jpeg,png,gif}`], {
      destination: outputDir,
      plugins: [
        imageminJpegtran({
          progressive: true,
          quality: 80,
        }),
        imageminPngquant({
          quality: [0.6, 0.8],
        }),
        imageminGiflossy({
          lossy: 80,
        }),
      ],
    });

    console.log('✅ Original format optimization complete!');
    console.log(`📊 Optimized ${files.length} images\n`);

    // Generate WebP versions
    console.log('🔄 Converting to WebP format...');
    const webpFiles = await imagemin([`${sourceDir}/**/*.{jpg,jpeg,png}`], {
      destination: outputDir,
      plugins: [
        imageminWebp({
          quality: 75,
        }),
      ],
    });

    console.log('✅ WebP conversion complete!');
    console.log(`📊 Created ${webpFiles.length} WebP versions\n`);

    // Calculate savings
    const originalSize = getDirectorySize(sourceDir);
    const optimizedSize = getDirectorySize(outputDir);
    const savings = originalSize - optimizedSize;
    const savingsPercent = ((savings / originalSize) * 100).toFixed(2);

    console.log('📈 Summary:');
    console.log(`   Original size: ${formatBytes(originalSize)}`);
    console.log(`   Optimized size: ${formatBytes(optimizedSize)}`);
    console.log(`   Space saved: ${formatBytes(savings)} (${savingsPercent}%)`);
    console.log('\n✨ Image optimization complete!');

  } catch (error) {
    console.error('❌ Error during optimization:', error);
    globalThis.process.exit(1);
  }
}

function getDirectorySize(dir) {
  let size = 0;
  const files = fs.readdirSync(dir, { withFileTypes: true, recursive: true });
  files.forEach(file => {
    if (file.isFile()) {
      size += fs.statSync(path.join(file.parentPath || dir, file.name)).size;
    }
  });
  return size;
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

optimizeImages();

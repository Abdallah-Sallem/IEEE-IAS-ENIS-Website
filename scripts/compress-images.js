import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const dirsToScan = [
  path.join(process.cwd(), 'src', 'assets'),
  path.join(process.cwd(), 'public', 'assets')
];

const backupDir = path.join(process.cwd(), 'image-backup-before-compression');
let totalOriginalSize = 0;
let totalCompressedSize = 0;
let compressedImagesCount = 0;
let skippedImagesCount = 0;

async function walkDir(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(await walkDir(fullPath));
    } else {
      results.push(fullPath);
    }
  }
  return results;
}

async function compress() {
  if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir);

  let allImages = [];
  for (const d of dirsToScan) {
    const files = await walkDir(d);
    allImages = allImages.concat(files.filter(f => /\.(png|jpe?g|webp)$/i.test(f)));
  }

  console.log(`Found ${allImages.length} images.`);

  for (const imgPath of allImages) {
    const stat = fs.statSync(imgPath);
    const originalSize = stat.size;
    totalOriginalSize += originalSize;

    // Backup
    const relPath = path.relative(process.cwd(), imgPath);
    const backupPath = path.join(backupDir, relPath);
    fs.mkdirSync(path.dirname(backupPath), { recursive: true });
    fs.copyFileSync(imgPath, backupPath);

    try {
      const ext = path.extname(imgPath).toLowerCase();
      const tempPath = imgPath + '.tmp' + ext;
      
      let sharpInstance = sharp(imgPath);

      if (ext === '.jpg' || ext === '.jpeg') {
        await sharpInstance.jpeg({ quality: 80, mozjpeg: true }).toFile(tempPath);
      } else if (ext === '.png') {
        await sharpInstance.png({ quality: 80, compressionLevel: 8 }).toFile(tempPath);
      } else if (ext === '.webp') {
        await sharpInstance.webp({ quality: 80 }).toFile(tempPath);
      } else {
        skippedImagesCount++;
        continue;
      }

      const newStat = fs.statSync(tempPath);
      if (newStat.size < originalSize) {
        fs.renameSync(tempPath, imgPath);
        totalCompressedSize += newStat.size;
        compressedImagesCount++;
        // console.log(`Compressed: ${relPath} (${originalSize} -> ${newStat.size})`);
      } else {
        fs.unlinkSync(tempPath);
        totalCompressedSize += originalSize;
        skippedImagesCount++;
      }
    } catch (e) {
      console.error(`Error compressing ${imgPath}:`, e);
      totalCompressedSize += originalSize;
      skippedImagesCount++;
    }
  }

  console.log("\n================ REPORT ================");
  console.log(`Total images scanned: ${allImages.length}`);
  console.log(`Successfully compressed: ${compressedImagesCount}`);
  console.log(`Skipped (no size reduction or error): ${skippedImagesCount}`);
  console.log(`Total Original Size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Total Compressed Size: ${(totalCompressedSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Size Reduced: ${((totalOriginalSize - totalCompressedSize) / 1024 / 1024).toFixed(2)} MB (${(100 - (totalCompressedSize / totalOriginalSize * 100)).toFixed(2)}%)`);
}

compress();

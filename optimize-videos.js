import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from 'ffmpeg-static';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
ffmpeg.setFfmpegPath(ffmpegPath);

const sourceDirs = [
  path.join(__dirname, 'src', 'assets'),
  path.join(__dirname, 'public', 'assets'),
];
const outputDir = path.join(__dirname, 'optimized_videos');
await fs.ensureDir(outputDir);

const videoExts = ['.mp4', '.mov', '.mkv', '.webm', '.avi'];

function listVideos(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const it of items) {
    const full = path.join(dir, it.name);
    if (it.isDirectory()) results.push(...listVideos(full));
    else if (videoExts.includes(path.extname(it.name).toLowerCase())) results.push(full);
  }
  return results;
}

function human(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

function transcodeToMp4(input, output) {
  return new Promise((resolve, reject) => {
    fs.ensureDirSync(path.dirname(output));
    ffmpeg(input)
      .videoCodec('libx264')
      .audioCodec('aac')
      .outputOptions(['-crf 28', '-preset veryfast', '-movflags +faststart'])
      .size('?x720')
      .on('end', () => resolve())
      .on('error', (err) => reject(err))
      .save(output);
  });
}

function transcodeToWebm(input, output) {
  return new Promise((resolve, reject) => {
    fs.ensureDirSync(path.dirname(output));
    ffmpeg(input)
      .videoCodec('libvpx-vp9')
      .audioCodec('libopus')
      .outputOptions(['-crf 30', '-b:v 0', '-row-mt 1', '-threads 4'])
      .size('?x720')
      .on('end', () => resolve())
      .on('error', (err) => reject(err))
      .save(output);
  });
}

async function main() {
  const allVideos = new Set();
  for (const sd of sourceDirs) {
    const list = listVideos(sd);
    list.forEach(p => allVideos.add(p));
  }
  const videos = Array.from(allVideos);
  if (videos.length === 0) {
    console.log('No videos found in source directories.');
    return;
  }

  console.log(`Found ${videos.length} videos to optimize.`);

  let originalTotal = 0;
  let optimizedTotal = 0;
  let processed = 0;

  for (const v of videos) {
    try {
      const stats = await fs.stat(v);
      originalTotal += stats.size;
      const base = path.parse(v).name;
      const mp4Out = path.join(outputDir, `${base}-optimized.mp4`);
      const webmOut = path.join(outputDir, `${base}-optimized.webm`);

      console.log(`Processing: ${v}`);
      await transcodeToMp4(v, mp4Out);
      await transcodeToWebm(v, webmOut);

      const mp4Size = (await fs.stat(mp4Out)).size;
      const webmSize = (await fs.stat(webmOut)).size;
      optimizedTotal += mp4Size + webmSize;
      processed++;
      console.log(` -> Created: ${mp4Out} (${human(mp4Size)}), ${webmOut} (${human(webmSize)})`);
    } catch (err) {
      console.error('Error processing', v, err.message || err);
    }
  }

  console.log('\nSummary:');
  console.log(`  Original total: ${human(originalTotal)}`);
  console.log(`  Optimized total: ${human(optimizedTotal)}`);
  console.log(`  Files processed: ${processed}/${videos.length}`);
  const savings = originalTotal - optimizedTotal;
  const pct = originalTotal > 0 ? ((savings / originalTotal) * 100).toFixed(2) : 0;
  console.log(`  Space saved: ${human(savings)} (${pct}%)`);
}

main().catch(err => {
  console.error(err);
  globalThis.process.exit(1);
});

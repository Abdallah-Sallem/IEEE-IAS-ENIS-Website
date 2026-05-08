import fs from 'fs-extra';
import path from 'path';

const root = globalThis.process.cwd();
const sources = [path.join(root, 'src', 'assets'), path.join(root, 'public', 'assets')];
const optimizedRoot = path.join(root, 'optimized_assets');

const exts = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

function listOriginalImages(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...listOriginalImages(full));
    else if (e.isFile() && exts.includes(path.extname(e.name).toLowerCase())) out.push(full);
  }
  return out;
}

function findOptimizedCandidate(basename, relPath) {
  // 1) check optimizedRoot/<basename>
  const byName = path.join(optimizedRoot, basename);
  if (fs.existsSync(byName)) return byName;
  // 2) check optimizedRoot/<relPath> (preserve structure)
  const byRel = path.join(optimizedRoot, relPath);
  if (fs.existsSync(byRel)) return byRel;
  // 3) try replacing extension with .webp at optimizedRoot
  const webpAtRoot = path.join(optimizedRoot, path.parse(basename).name + '.webp');
  if (fs.existsSync(webpAtRoot)) return webpAtRoot;
  // not found
  return null;
}

let copied = 0;
let skipped = 0;

for (const srcRoot of sources) {
  const originals = listOriginalImages(srcRoot);
  for (const orig of originals) {
    const rel = path.relative(srcRoot, orig); // e.g. gallery/gallery-1.webp
    const basename = path.basename(rel);
    const candidate = findOptimizedCandidate(basename, rel);
    if (!candidate) {
      skipped++;
      continue;
    }
    const targetDir = path.join(optimizedRoot, path.dirname(rel));
    fs.ensureDirSync(targetDir);
    const targetPath = path.join(targetDir, path.basename(candidate));
    // copy optimized candidate into mirrored folder
    try {
      fs.copyFileSync(candidate, targetPath);
      copied++;
    } catch (err) {
      console.error('Copy failed', candidate, '->', targetPath, err.message);
      skipped++;
    }
  }
}

console.log(`Mirroring complete. Copied: ${copied}, Skipped: ${skipped}`);

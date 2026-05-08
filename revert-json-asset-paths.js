import fs from 'fs-extra';
import path from 'path';

const root = globalThis.process.cwd();
const searchRoots = [path.join(root, 'src', 'assets'), path.join(root, 'public', 'assets')];
const jsonFiles = [];

function walk(dir, cb) {
  if (!fs.existsSync(dir)) return;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, cb);
    else cb(full);
  }
}

walk(root, (f) => { if (f.endsWith('.json')) jsonFiles.push(f); });

function findOriginalByBasename(basename) {
  // 1) exact basename match under src/assets preferred
  for (const rootDir of searchRoots) {
    const candidates = [];
    walk(rootDir, (file) => {
      if (path.basename(file) === basename) candidates.push(file);
    });
    if (candidates.length > 0) return candidates[0];
  }
  // 2) match by name without extension (any ext)
  const nameNoExt = path.parse(basename).name;
  for (const rootDir of searchRoots) {
    const candidates = [];
    walk(rootDir, (file) => {
      if (path.parse(file).name === nameNoExt) candidates.push(file);
    });
    if (candidates.length > 0) return candidates[0];
  }
  return null;
}

let total = 0;
let replaced = 0;

for (const jf of jsonFiles) {
  let text = fs.readFileSync(jf, 'utf8');
  const regex = /"(\/optimized_assets\/[^"]+?)"/gi;
  const matches = [...text.matchAll(regex)];
  if (matches.length === 0) continue;
  const changes = [];
  for (const m of matches) {
    total++;
    const optPath = m[1]; // e.g. /optimized_assets/filename.webp or /assets/gallery/gallery-1.webp
    const basename = path.basename(optPath);
    const original = findOriginalByBasename(basename);
    if (original) {
      // determine which assets root it belongs to, and build /assets/... path
      const which = searchRoots.find(r => original.startsWith(r));
      let rel = path.relative(which, original).split(path.sep).join('/');
      const newUrl = '/assets/' + rel;
      changes.push({ from: optPath, to: newUrl });
    }
  }
  if (changes.length > 0) {
    for (const c of changes) {
      const fromQ = '"' + c.from + '"';
      const toQ = '"' + c.to + '"';
      text = text.split(fromQ).join(toQ);
      replaced++;
    }
    fs.writeFileSync(jf, text, 'utf8');
    console.log(`Updated ${changes.length} entries in ${jf}`);
  }
}

console.log(`Done. Scanned: ${total}, Replaced: ${replaced}`);

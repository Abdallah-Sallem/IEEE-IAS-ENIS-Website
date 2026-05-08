import fs from 'fs-extra';
import path from 'path';

const root = globalThis.process.cwd();
const assetRoots = [path.join(root, 'src', 'assets'), path.join(root, 'public', 'assets')];

function walkFiles(dir, exts, cb) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walkFiles(full, exts, cb);
    else if (exts.includes(path.extname(full))) cb(full);
  }
}

function findAllAssetRefs() {
  const refs = [];
  const exts = ['.json', '.js', '.jsx', '.ts', '.tsx', '.html', '.css', '.md'];
  walkFiles(root, exts, (file) => {
    if (file.includes('node_modules')) return;
    const text = fs.readFileSync(file, 'utf8');
    const regex = /"(\/assets\/[^"]+?)"/g;
    let m;
    while ((m = regex.exec(text)) !== null) refs.push({file, ref: m[1]});
  });
  return refs;
}

function existsInAssetRoots(relPath) {
  for (const r of assetRoots) {
    const full = path.join(r, relPath.replace(/^assets[\\/]/, ''));
    if (fs.existsSync(full)) return '/' + path.posix.join('assets', path.relative(r, full).split(path.sep).join('/'));
  }
  return null;
}

function findByBasename(basename) {
  for (const r of assetRoots) {
    let found = null;
    (function walk(d){
      for (const e of fs.readdirSync(d, { withFileTypes: true })){
        const full = path.join(d, e.name);
        if (e.isDirectory()) walk(full);
        else if (path.basename(full).toLowerCase() === basename.toLowerCase()) { found = full; return; }
      }
    })(r);
    if (found) return '/' + path.posix.join('assets', path.relative(r, found).split(path.sep).join('/'));
  }
  return null;
}

const refs = findAllAssetRefs();
console.log(`Found ${refs.length} /assets references across files`);

let updated = 0;
let missing = 0;

for (const item of refs) {
  const rel = item.ref.replace(/^\//, ''); // assets/...
  const candidate = existsInAssetRoots(rel);
  if (candidate) continue; // exists as-is
  // missing -> try find by basename
  const basename = path.basename(rel);
  const found = findByBasename(basename);
  if (found) {
    // replace in file
    let txt = fs.readFileSync(item.file, 'utf8');
    const from = '"' + item.ref + '"';
    const to = '"' + found + '"';
    if (txt.includes(from)) {
      txt = txt.split(from).join(to);
      fs.writeFileSync(item.file, txt, 'utf8');
      updated++;
      console.log(`Updated ${item.file}: ${item.ref} -> ${found}`);
    }
  } else {
    missing++;
    console.log(`Missing file for reference ${item.ref} in ${item.file}`);
  }
}

console.log(`Done. Updated: ${updated}, Missing unresolved: ${missing}`);

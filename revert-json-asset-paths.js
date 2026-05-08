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

walk(root, (f) => {
  if (f.endsWith('.json')) jsonFiles.push(f);
});

function stripOptimizedPrefix(stem) {
  const firstDash = stem.indexOf('-');
  if (firstDash <= 0) return stem;

  const suffix = stem.slice(firstDash + 1);
  if (/^(?:\d+|img\d*|image\d*|photo\d*|pic\d*)$/i.test(suffix)) {
    return suffix;
  }

  return stem;
}

function findOriginalCandidates(relPath) {
  const relativeDir = path.dirname(relPath);
  const stem = path.parse(relPath).name;
  const stemVariants = [...new Set([stem, stripOptimizedPrefix(stem)])];
  const extensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
  const candidates = [];

  for (const rootDir of searchRoots) {
    const baseDirs = relativeDir === '.' ? [rootDir] : [path.join(rootDir, relativeDir), rootDir];
    for (const baseDir of baseDirs) {
      for (const stemVariant of stemVariants) {
        for (const extension of extensions) {
          candidates.push(path.join(baseDir, `${stemVariant}${extension}`));
        }
      }
    }
  }

  return candidates;
}

function findOriginalByBasename(basename) {
  const stem = path.parse(basename).name;
  const stemVariants = [...new Set([stem, stripOptimizedPrefix(stem)])];

  for (const rootDir of searchRoots) {
    let found = null;
    walk(rootDir, (file) => {
      if (found) return;
      const fileStem = path.parse(file).name;
      if (stemVariants.includes(fileStem)) found = file;
    });
    if (found) return found;
  }

  return null;
}

let total = 0;
let replaced = 0;

for (const jf of jsonFiles) {
  let text = fs.readFileSync(jf, 'utf8');
  const regex = /"(\/optimized_assets\/[^"\n]+?)"/gi;
  const matches = [...text.matchAll(regex)];
  if (matches.length === 0) continue;
  const changes = [];

  for (const m of matches) {
    total++;
    const optPath = m[1];
    const rel = optPath.replace(/^\/?optimized_assets\//, '');
    const original = findOriginalCandidates(rel).find(candidate => fs.existsSync(candidate)) || findOriginalByBasename(path.basename(optPath));

    if (original) {
      const which = searchRoots.find(r => original.startsWith(r));
      const relPath = path.relative(which, original).split(path.sep).join('/');
      changes.push({ from: optPath, to: '/assets/' + relPath });
    }
  }

  if (changes.length > 0) {
    for (const c of changes) {
      const fromQ = '"' + c.from + '"';
      const toQ = '"' + c.to + '"';
      text = text.split(fromQ).join(toQ);
      replaced++;
      const basename = path.basename(optPath);
      const original = findOriginalByBasename(basename);
    console.log(`Updated ${changes.length} entries in ${jf}`);
  }
}

console.log(`Done. Scanned: ${total}, Replaced: ${replaced}`);

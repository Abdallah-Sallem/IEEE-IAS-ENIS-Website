import fs from 'fs-extra';
import path from 'path';

const root = globalThis.process.cwd();
const searchRoots = [path.join(root, 'src', 'assets'), path.join(root, 'public', 'assets')];
const exts = ['.json', '.js', '.jsx', '.ts', '.tsx', '.html', '.css', '.md'];

function walk(dir, cb) {
  if (!fs.existsSync(dir)) return;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, cb);
    else cb(full);
  }
}

function findOriginalByBasename(basename) {
  // Try to find exact basename under searchRoots
  for (const rootDir of searchRoots) {
    let found = null;
    walk(rootDir, (file) => {
      if (!found && path.basename(file).toLowerCase() === basename.toLowerCase()) found = file;
    });
    if (found) return found;
  }
  // fallback: match by name without extension
  const nameNoExt = path.parse(basename).name.toLowerCase();
  for (const rootDir of searchRoots) {
    let found = null;
    walk(rootDir, (file) => {
      if (!found && path.parse(file).name.toLowerCase() === nameNoExt) found = file;
    });
    if (found) return found;
  }
  return null;
}

let totalFiles = 0;
let totalReplacements = 0;

walk(root, (file) => {
  const ext = path.extname(file).toLowerCase();
  if (!exts.includes(ext)) return;
  // skip node_modules
  if (file.split(path.sep).includes('node_modules')) return;
  let text = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Match /optimized_assets/...ext or optimized_assets/...ext (with or without leading slash)
  const regex = /(\/?optimized_assets\/(?:[^"'\s]+?\.(?:jpg|jpeg|png|webp|gif)))/gi;
  const matches = [...text.matchAll(regex)];
  for (const m of matches) {
    const matchPath = m[1];
    const basename = path.basename(matchPath);
    const original = findOriginalByBasename(basename);
    if (original) {
      const which = searchRoots.find(r => original.startsWith(r));
      const rel = path.relative(which, original).split(path.sep).join('/');
      const newUrl = '/assets/' + rel;
      // replace all occurrences of this match
      const matchEsc = matchPath.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
      const reAll = new RegExp(matchEsc, 'g');
      text = text.replace(reAll, newUrl);
      changed = true;
      totalReplacements++;
    }
  }

  // Also handle optimized_videos replacements to /assets (video files)
  const regexV = /(\/?optimized_videos\/(?:[^"'\s]+?\.(?:mp4|webm|mov|mkv|avi)))/gi;
  const matchesV = [...text.matchAll(regexV)];
  for (const m of matchesV) {
    const matchPath = m[1];
    const basename = path.basename(matchPath);
    const original = findOriginalByBasename(basename);
    if (original) {
      const which = searchRoots.find(r => original.startsWith(r));
      const rel = path.relative(which, original).split(path.sep).join('/');
      const newUrl = '/assets/' + rel;
      const matchEsc = matchPath.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
      const reAll = new RegExp(matchEsc, 'g');
      text = text.replace(reAll, newUrl);
      changed = true;
      totalReplacements++;
    }
  }

  if (changed) {
    fs.writeFileSync(file, text, 'utf8');
    console.log(`Updated ${file}`);
  }
  totalFiles++;
});

console.log(`Processed ${totalFiles} files. Replacements made: ${totalReplacements}`);

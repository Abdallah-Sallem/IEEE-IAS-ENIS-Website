import fs from 'fs-extra';
import path from 'path';

const root = globalThis.process.cwd();
const optimizedDir = path.join(root, 'optimized_assets');

function findJsonFiles(dir) {
  const out = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === 'node_modules' || e.name === '.git') continue;
      out.push(...findJsonFiles(full));
    } else if (e.isFile() && full.endsWith('.json')) {
      out.push(full);
    }
  }
  return out;
}

const jsonFiles = findJsonFiles(root);
let totalReplacements = 0;

for (const jf of jsonFiles) {
  let text = fs.readFileSync(jf, 'utf8');
  const regex = /"(\/assets\/[^"]+?\.(?:jpg|jpeg|png|webp|gif))"/gi;
  let m;
  const replacements = [];
  while ((m = regex.exec(text)) !== null) {
    const original = m[1]; // like /assets/team/acharf.webp
    const rel = original.replace(/^\//, ''); // assets/team/acharf.webp
    const basename = path.basename(rel);
    const optimizedPathByName = path.join(optimizedDir, basename);
    // Some optimized files are saved at optimized_assets root (basename-based). Prefer that.
    if (fs.existsSync(optimizedPathByName)) {
      const newPath = '/' + path.posix.join('optimized_assets', basename);
      replacements.push({ from: original, to: newPath });
      continue;
    }
    // Fallback: check relative path under optimized_assets (if structure preserved)
    const optimizedPath = path.join(optimizedDir, rel.replace(/^assets[\\/]/, ''));
    if (fs.existsSync(optimizedPath)) {
      const newPath = '/' + path.posix.join('optimized_assets', rel.replace(/^assets[\\/]/, '').split(path.sep).join('/'));
      replacements.push({ from: original, to: newPath });
    }
  }

  if (replacements.length > 0) {
    for (const r of replacements) {
      const fromQuoted = '"' + r.from + '"';
      const toQuoted = '"' + r.to + '"';
      text = text.split(fromQuoted).join(toQuoted);
      totalReplacements++;
    }
    fs.writeFileSync(jf, text, 'utf8');
    console.log(`Updated ${replacements.length} paths in ${jf}`);
  }
}

console.log(`Done. Total replacements: ${totalReplacements}`);

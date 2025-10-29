// backend/scripts/prepare-obf.js
const fs = require('fs');
const path = require('path');

const cwd = process.cwd(); // backend/
const srcPkgPath = path.join(cwd, 'package.json');
const outDir = path.join(cwd, 'backend-obf');
const outPkgPath = path.join(outDir, 'package.json');

function fileExists(p) {
  try { return fs.existsSync(p) && fs.statSync(p).isFile(); }
  catch { return false; }
}

if (!fs.existsSync(srcPkgPath)) {
  console.error('Error: package.json not found in', srcPkgPath);
  process.exit(1);
}

if (!fs.existsSync(outDir)) {
  console.error('Error: backend-obf folder not found. Run `npm run obf` first.');
  process.exit(1);
}

const srcPkg = JSON.parse(fs.readFileSync(srcPkgPath, 'utf8'));

// Candidate entry determination order:
// 1) package.json "main"
// 2) common file names in cwd
// 3) common file names in backend-obf
const candidates = [];

if (srcPkg.main) candidates.push(srcPkg.main);
candidates.push('server.js', 'index.js', 'app.js', 'dist/server.js', 'dist/index.js');

let chosen = null;
for (const c of candidates) {
  // Check relative to backend-obf (since obfuscated files will be there)
  const p = path.join(outDir, c);
  if (fileExists(p)) { chosen = c; break; }
  // Also check in source dir just in case
  if (fileExists(path.join(cwd, c))) { chosen = c; break; }
}

if (!chosen) {
  console.warn('Warning: could not auto-detect entry file. Defaulting to server.js (ensure backend-obf/server.js exists).');
  chosen = 'server.js';
}

const minimal = {
  name: srcPkg.name ? `${srcPkg.name}-obf` : 'backend-obf',
  version: srcPkg.version || '1.0.0',
  main: chosen,
  pkg: srcPkg.pkg || {}
};

if (srcPkg.bin) minimal.bin = srcPkg.bin;

// Write package.json into backend-obf
fs.writeFileSync(outPkgPath, JSON.stringify(minimal, null, 2), 'utf8');
console.log('Wrote', outPkgPath, 'with main =', chosen);

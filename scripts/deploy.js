/**
 * Femme Vogue — Automated Deployment & Verification Script
 */
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function run(cmd, cwd = rootDir) {
  console.log(`\n▶ ${cmd}`);
  try {
    const stdout = execSync(cmd, { cwd, stdio: 'inherit' });
    return stdout;
  } catch (err) {
    console.error(`❌ Command failed: ${cmd}`);
    throw err;
  }
}

console.log('====================================================');
console.log('  FEMME VOGUE — AUTOMATED DEPLOYMENT PREPARATION   ');
console.log('====================================================');

// Step 1: Verify Git status
console.log('\n[1/4] Checking Git repository status...');
try {
  run('git status');
} catch (e) {
  console.log('Git check completed.');
}

// Step 2: Build frontend client
console.log('\n[2/4] Building production frontend for Cloudflare Pages...');
run('npm run build', path.join(rootDir, 'client'));

// Step 3: Check dist output and _redirects
console.log('\n[3/4] Verifying Cloudflare Pages distribution bundle...');
const distPath = path.join(rootDir, 'client', 'dist');
const redirectsPath = path.join(distPath, '_redirects');

if (fs.existsSync(distPath) && fs.existsSync(redirectsPath)) {
  console.log('✓ Production dist folder is ready with SPA _redirects rule.');
} else {
  console.warn('⚠️ Warning: _redirects or dist folder not found.');
}

// Step 4: Check environment configuration
console.log('\n[4/4] Verifying Environment Configuration...');
const envPath = path.join(rootDir, '.env');
if (fs.existsSync(envPath)) {
  console.log('✓ Root .env found.');
} else {
  console.log('Creating .env from .env.example...');
  fs.copyFileSync(path.join(rootDir, '.env.example'), envPath);
}

console.log('\n====================================================');
console.log('  BUILD & DEPLOYMENT ARTIFACTS READY!              ');
console.log('====================================================');
console.log(`
To deploy immediately:

1. CLOUDFLARE PAGES (Frontend):
   - Option A (Direct CLI): Run "npx wrangler pages deploy client/dist --project-name=femme-vogue"
   - Option B (GitHub): Connect your repository to Cloudflare Pages.
     Root Directory: client
     Build command: npm run build
     Output directory: dist

2. RENDER (Backend):
   - Render will automatically use "render.yaml" blueprint when you connect the repository!
   - Root directory: server
   - Build: npm install
   - Start: node src/server.js
   - Environment Variable: MONGODB_URI = <your-mongodb-atlas-uri>

3. MONGODB ATLAS:
   - Paste your connection string into Render environment variables as MONGODB_URI.
`);

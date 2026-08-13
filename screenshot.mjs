// screenshot.mjs — capture a localhost URL to ./temporary screenshots/screenshot-N[-label].png
// Usage: node screenshot.mjs http://localhost:3000 [label] [--mobile]
import { chromium } from 'playwright';
import { mkdirSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const url = process.argv[2] || 'http://localhost:3000';
const rest = process.argv.slice(3);
const isMobile = rest.includes('--mobile');
const label = rest.filter((a) => !a.startsWith('--'))[0] || '';

const outDir = join(process.cwd(), 'temporary screenshots');
mkdirSync(outDir, { recursive: true });

// auto-increment N based on existing files
let n = 1;
try {
  const nums = readdirSync(outDir)
    .map((f) => f.match(/^screenshot-(\d+)/))
    .filter(Boolean)
    .map((m) => parseInt(m[1], 10));
  if (nums.length) n = Math.max(...nums) + 1;
} catch {}

const suffix = label ? `-${label}` : '';
const file = join(outDir, `screenshot-${n}${suffix}.png`);

const viewport = isMobile ? { width: 390, height: 844 } : { width: 1440, height: 900 };
const browser = await chromium.launch();
const page = await browser.newPage({ viewport, deviceScaleFactor: 2 });
await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
// scroll through the page so IntersectionObserver reveals fire, then return to top
await page.evaluate(async () => {
  const step = window.innerHeight * 0.8;
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 120));
  }
  window.scrollTo(0, 0);
});
await page.waitForTimeout(700); // let fonts/video settle
await page.screenshot({ path: file, fullPage: true });
await browser.close();
console.log(`Saved ${file} (${isMobile ? 'mobile 390' : 'desktop 1440'})`);

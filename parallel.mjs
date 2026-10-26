// Runs N isolated browser sessions at once, each with its own persistent profile.
// Usage: node parallel.mjs [--headed] [--browser chromium|opera|chrome] url1 url2 ...
import { chromium } from 'playwright';
import os from 'os'; import path from 'path';
const args = process.argv.slice(2);
const headed = args.includes('--headed');
const bi = args.indexOf('--browser');
const kind = bi >= 0 ? args[bi + 1] : 'chromium';
const urls = args.filter((a, i) => !a.startsWith('--') && args[i - 1] !== '--browser');
const exe = { opera: '/Applications/Opera.app/Contents/MacOS/Opera', chrome: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' }[kind];
await Promise.all(urls.map(async (url, i) => {
  const profile = path.join(os.homedir(), '.parallel-browsers', `session-${i + 1}`);
  const ctx = await chromium.launchPersistentContext(profile, { headless: !headed, ...(exe && { executablePath: exe }) });
  const page = ctx.pages()[0] ?? await ctx.newPage();
  await page.goto(url);
  console.log(`session-${i + 1} [${kind}]`, await page.title(), page.url());
  await ctx.close();
}));

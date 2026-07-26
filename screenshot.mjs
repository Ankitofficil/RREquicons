import puppeteer from 'puppeteer';

const pages = [
  { name: 'home', url: 'http://localhost:3000/' },
  { name: 'batching-plant', url: 'http://localhost:3000/services/batching-plant' },
  { name: 'about', url: 'http://localhost:3000/about' },
  { name: 'contact', url: 'http://localhost:3000/contact' },
  { name: 'careers', url: 'http://localhost:3000/careers' },
  { name: 'projects', url: 'http://localhost:3000/projects' },
];

const suffix = process.argv[2] || 'after';        // filename suffix
const mode = process.argv[3] || 'desktop';         // desktop | mobile
const theme = process.argv[4] || 'light';          // light | dark

const viewport = mode === 'mobile'
  ? { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true }
  : { width: 1440, height: 900, deviceScaleFactor: 1 };
const prefix = (mode === 'mobile' ? 'm-' : '') + (theme === 'dark' ? 'dk-' : '');

async function run() {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport(viewport);

  // Seed the theme choice before any page script runs.
  await page.evaluateOnNewDocument((t) => {
    try { localStorage.setItem('theme', t); } catch (e) {}
  }, theme);

  for (const p of pages) {
    process.stdout.write(`Capturing ${prefix}${p.name}... `);
    try {
      await page.goto(p.url, { waitUntil: 'domcontentloaded', timeout: 30000 });

      await page.evaluate(async () => {
        document.querySelectorAll('*').forEach((el) => {
          const s = getComputedStyle(el);
          if (s.opacity === '0' && el instanceof HTMLElement) {
            el.style.opacity = '1';
            el.style.transform = 'none';
          }
        });
        const style = document.createElement('style');
        style.textContent = '*,*::before,*::after{animation:none!important;transition:none!important}';
        document.head.appendChild(style);
        window.scrollTo(0, document.body.scrollHeight);
        await new Promise((r) => setTimeout(r, 400));
        window.scrollTo(0, 0);
        await new Promise((r) => setTimeout(r, 200));
      });

      const isDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
      const overflow = await page.evaluate(() => ({
        scrollW: document.documentElement.scrollWidth,
        clientW: document.documentElement.clientWidth,
      }));

      await page.screenshot({ path: `screenshots/${prefix}${p.name}-${suffix}.png`, fullPage: true });
      const warn = overflow.scrollW > overflow.clientW + 1 ? ` ⚠ H-OVERFLOW ${overflow.scrollW}>${overflow.clientW}` : '';
      console.log(`ok (dark=${isDark})${warn}`);
    } catch (e) {
      console.log(`FAILED: ${e.message}`);
    }
  }

  await browser.close();
  console.log('Done!');
}

run().catch((e) => { console.error(e); process.exit(1); });

import puppeteer from 'puppeteer';

const pages = [
  { name: 'home', url: 'http://localhost:3000/' },
  { name: 'about', url: 'http://localhost:3000/about' },
  { name: 'projects', url: 'http://localhost:3000/projects' },
  { name: 'contact', url: 'http://localhost:3000/contact' },
  { name: 'careers', url: 'http://localhost:3000/careers' },
  { name: 'case-studies', url: 'http://localhost:3000/projects/case-studies' },
];

const suffix = process.argv[2] || 'after';

async function run() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  for (const p of pages) {
    console.log(`Capturing ${p.name}...`);
    await page.goto(p.url, { waitUntil: 'networkidle0', timeout: 15000 });

    // Slowly scroll down to trigger all IntersectionObserver animations
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 300;
        const timer = setInterval(() => {
          window.scrollBy(0, distance);
          totalHeight += distance;
          if (totalHeight >= document.body.scrollHeight) {
            clearInterval(timer);
            resolve(undefined);
          }
        }, 100);
      });
    });

    // Wait for animations to finish
    await new Promise(r => setTimeout(r, 800));

    // Scroll back to top
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise(r => setTimeout(r, 300));

    await page.screenshot({
      path: `screenshots/${p.name}-${suffix}.png`,
      fullPage: true,
    });
  }

  await browser.close();
  console.log(`Done!`);
}

run().catch(console.error);

const puppeteer = require('puppeteer');

(async () => {
  const start = Date.now();
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://news.google.com', { waitUntil: 'networkidle2' }); // Espera a que la página cargue
  const titles = await page.$$eval('h3', els => els.map(el => el.textContent));
  const end = Date.now();
  const time = (end - start) / 1000; // Tiempo en segundos
  const pagesPerMin = titles.length > 0 ? (60 / time) * titles.length : 0; // Estimación aproximada
  console.log(`${titles.length} titles scraped in ${time} seconds`);
  console.log(`Estimated pages/min: ${pagesPerMin.toFixed(2)}`);
  console.log(titles);
  await browser.close();
})();
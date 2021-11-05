const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://coconala.com');

  const datas = await page.$$eval('a', list => list.map(item => item.href));

  console.log(datas);

  await browser.close();
})();
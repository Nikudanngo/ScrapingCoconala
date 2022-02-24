const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://coconala.com/search?keyword=web%20%E5%88%B6%E4%BD%9C&category_id=500');
  const test = '.c-searchPage_itemList a';
  const datas = await page.$$eval(test, list => list.map(item => item.href));

  console.log(datas);

  await browser.close();
})();
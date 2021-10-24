// const puppeteer = require('puppeteer');

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto('https://coconala.com/search?keyword=3d%20vtuber');
//   const tables = await page.$$("title")
//   console.log(tables);

//   await browser.close();
// })();

const { title } = require('process');
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  let n = 1;
  while (n<2) {
    await page.goto('https://coconala.com/search?keyword=3d%20vtuber'+'&business_flag=false&page='+n,{
      waitUntil: 'networkidle2'
    });
    const tables = await page.$$("a");
    const d = await Promise.all(tables.map(async table => {
        const t = (await (await table.getProperty("textContent")).jsonValue()).trim();
        const ts = t.split("\n");
        return {
            table: t,
        }
    }))
  
    console.log(d);
    n++;
  }
  
  

  await browser.close();
})();
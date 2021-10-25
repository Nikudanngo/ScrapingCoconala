// const puppeteer = require('puppeteer');

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto('https://coconala.com/search?keyword=3d%20vtuber');
//   const tables = await page.$$("title")
//   console.log(tables);

//   await browser.close();
// })();



// const { title } = require('process');
// const puppeteer = require('puppeteer');

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   let n = 1;
//   while (n<2) {
//     await page.goto('https://coconala.com/search?keyword=3d%20vtuber'+'&business_flag=false&page='+n,{
//       waitUntil: 'networkidle0'
//     });
//     const tables = await page.$$("p");
//     const d = await Promise.all(tables.map(async table => {
//         const t = (await (await table.getProperty("textContent")).jsonValue()).trim();
//         const ts = t.split("\n");
//         return {
//             table: t
//         }
//     }))
//     console.log(d);
//     n++;
//   }
//   await browser.close();
// })();


const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  const target = 'p'
  const prices = 'strong'
  let n = 1;
    while (n<=2) {
      await page.goto('https://coconala.com/search?keyword=3d%20vtuber'+'&business_flag=false&page='+n,{
        waitUntil: 'networkidle0'
      });
      const title = await page.$$eval(target, elements => {
        return elements.map(element => element.textContent.trim())
      });
      const price = await page.$$eval(prices, elements => {
        return elements.map(element => element.textContent.trim())    
      });      
      console.log(title);
      console.log(price);
      n++;
    }
  await browser.close();
})();
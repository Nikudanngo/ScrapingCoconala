const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  const target = 'p'
  const prices = 'strong'

  pageUrl = 'https://coconala.com/search?keyword=3d%20vtuber&layout=2&ref_c=1&y=0&sort_by=ranking&business_flag=false&page='
  
  let n = 1;
    while (n<=10) {
      await page.goto(pageUrl+n,{
        waitUntil: 'networkidle0'
      });
      const title = await page.$$eval(target, elements => {
        return elements.map(element => element.textContent.trim())
      });
      const price = await page.$$eval(prices, elements => {
        return elements.map(element => element.textContent.trim())    
      });      
      // console.log(title);
      for(let i=0;i<price.length;i++) {
        console.log(price[i]);
      }
      n++;
    }
  await browser.close();
})();
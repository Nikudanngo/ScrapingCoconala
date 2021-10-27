const puppeteer = require('puppeteer');
const Promise=require('promise');
let data=[];
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  const target = 'p'
  const prices = '.c-searchItemContentPrice_price'

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
      // // console.log(title);
      // for(let i=0;i<price.length;i++) {
      //   console.log(price[i]);
      // }
      const promise=()=>{
        return new Promise((resolve)=>{
        price.map((e)=>{
          data.push(e);
        })
      resolve();
      })
      
    }
    await promise();
    console.log(data);
      n++;
    }
  await browser.close();
  
})();
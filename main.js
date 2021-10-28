const puppeteer = require('puppeteer');
const Promise=require('promise');
let data=[];
let allData=[];
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  const target = 'p'
  const prices = '.c-searchItemContentPrice_price'

  pageUrl = 'https://coconala.com/search?keyword=3d%20vtuber&layout=2&ref_c=1&y=0&sort_by=ranking&business_flag=false&page='
  
  let n = 1;
  const promise=()=>{
    return new Promise(async(resolve)=>{
    while (n<=2) {
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
        price.map((e,index)=>{
          data.push(e);
        })

        if(data.length<=0) {
          break;
        }

        console.log(n+":OK");
        data.map((e,index)=>{

          allData.push({
            name:"title"+index,
            price:e
          });
        })
        n++;
        
      }
      resolve();
  })
}
    await promise();
    if(allData.length>0) {
      console.log(allData);
    }
  await browser.close();
  
})();
const puppeteer = require('puppeteer');
const Promise=require('promise');
let data=[];
let allData=[];
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  const keyWord = '3d%20vtuber'  //検索ワード
  const target = 'p'  //検索対象
  const ratings = '.c-searchItemContentPriceRating_count' //評価数
  const prices = '.c-searchItemContentPrice_price'  //価格
  pageUrl = 'https://coconala.com/search?keyword=' + keyWord + '&layout=2&ref_c=1&y=0&sort_by=ranking&business_flag=false&page='  //ページURL
  
  let n = 5;
  const promise=()=>{
    return new Promise(async(resolve)=>{  
    while (n<=6) {      
      await page.goto(pageUrl+n,{ 
        waitUntil: 'networkidle0'   //ページが読み込まれるまで待機
      });
      const title = await page.$$eval(target, elements => {   //タイトル
        return elements.map(element => element.textContent.trim())  //検索結果のタイトルを取得
      });
      const price = await page.$$eval(prices, elements => {
        return elements.map(element => element.textContent.trim())    
      }); 
      const rating = await page.$$eval(ratings, elements => {
        return elements.map(element => element.textContent.trim())    
      });    
      // // console.log(title);
      // for(let i=0;i<price.length;i++) {
      //   console.log(price[i]);
      // }
        price.map((e,index)=>{  //価格を数値に変換
          data.push(e);     //価格を配列に格納
        })

        if(data.length<=0) {  //価格が取得できなかった場合
          break;  //ループを抜ける
        }

        console.log(n+":OK");
        data.map((e,index)=>{   //価格を数値に変換

          allData.push({  //配列に格納
            title:title[index],  // Github Compilotの提案でなぜかタイトル取れたすげぇ
            rating:rating[index], //評価数
            price:price[index]  //価格
          });
        })
        n++;
        
      }
      resolve();  //resolveでPromiseを終了させる
  })
}
    await promise();
    if(allData.length>0) {
      console.log(allData);
    }
  await browser.close();
  
})();
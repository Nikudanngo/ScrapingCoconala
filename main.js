const puppeteer = require('puppeteer');
const Promise=require('promise');
const fs = require('fs');
const csv = require('csv');

const keyWord = 'スクレイピング' //検索ワード
let data=[]; 
let allData=[];
// let firstData=[keyWord,'price','rating'];


(async () => { 
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  const target = '.c-searchItemContent_overview'  //検索対象
  const prices = '.c-searchItemContentPrice_price'  //価格
  const starratings = '.c-searchItemContentPrice_rating' //星と評価数
  const ratings = '.c-searchItemContentPriceRating_count'
  pageUrl = 'https://coconala.com/search?keyword=' + keyWord + '&layout=2&ref_c=1&sort_by=ranking&business_flag=false&page='  //ページURL

  let n = 1;
  const promise=()=>{
    return new Promise(async(resolve)=>{
    while (n<=10) {  
      await page.goto(pageUrl+n,{ 
        waitUntil: 'networkidle0'   //ページが読み込まれるまで待機
      });
      const title = await page.$$eval(target, elements => {   //タイトル
        return elements.map(element => element.textContent.trim())  //検索結果のタイトルを取得
      });
      const price = await page.$$eval(prices, elements => {  //価格
        return elements.map(element => element.textContent.trim())  //検索結果の価格を取得
      }); 
      const rating = await page.$$eval(starratings, elements => { //評価数
        return elements.map(element => element.textContent.trim())  //検索結果の評価数を取得
      });    

        price.map((e,index)=>{  //価格を数値に変換
          data.push(e);     //価格を配列に格納
        })

        if(data.length<=0) {  //価格が取得できなかった場合
          break;  //ループを抜ける
        }
        
        console.log(n+":OK");
        price.map((e,index)=>{   //価格を数値に変換
      // console.log(rating[index]); //配列を出力

      const split_rating = rating[index].split(/\r\n|\n/);  //評価数を分割
          if(rating[index] == '-'){  //評価数がundefindedの場合
            allData.push({title:title[index],price:price[index].replace('円',''),rating:'0'});  //配列に格納&評価数を0にする&不要な文字を削除
          }else{
            rating[index] = split_rating[0];  //分割した評価数を格納
            // allData.push({title:title[index],price:price[index].replace('円',''),rating:split_rating[1].replace('(','').replace(')','').trim()});  //配列に格納&不要な文字を削除
            if(split_rating[1] == undefined){
              allData.push({title:title[index],price:price[index].replace('円',''),rating:'0'});  //配列に格納&不要な文字を削除
            }else{
            allData.push({title:title[index],price:price[index].replace('円',''),rating:split_rating[1].replace('(','').replace(')','').trim()});  //配列に格納&不要な文字を削除          }
          
          // allData.push({  //配列に格納
          //   title:title[index],  // Github Compilotの提案でなぜかタイトル取れたすげぇ
          //   rating:rating[index],
          //   price:price[index]  //価格
          // });
            }
        }
      })
        // console.log("================");
        n++;
        
      }
      resolve();  //resolveでPromiseを終了させる
  })
}
    await promise();  //promiseを実行
    if(allData.length>0) {  //配列が空でない場合
      console.log(allData); //配列を出力
      csv.stringify(allData,(error,output)=>{ //CSVに変換
        fs.writeFile(keyWord +'.csv',output,(error)=>{  //CSVファイルに書き込み
            console.log("csvファイルの書き出しに成功");
        })
    })
    }
  await browser.close();  //ブラウザを閉じる
  
})();
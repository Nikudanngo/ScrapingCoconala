const puppeteer = require('puppeteer');
const Promise = require('promise');
const fs = require('fs');
const csv = require('csv');

const keyWord = 'webサイト' //検索ワード
let data = [];
let allData = [];
// let firstData=[keyWord,'price','rating'];


(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const target = '.c-serviceBlockItemContent_name'  //サービスタイトル
  const prices = '.c-serviceBlockItemContentPrice_price'  //価格
  const starratings = '.c-serviceBlockItemContentPriceRating_count' //星と評価数
  const urls = '.c-searchPage_itemList a' //サービスリンク
  pageUrl = 'https://coconala.com/search?keyword=' + keyWord + '&layout=2&ref_c=1&sort_by=ranking&business_flag=false&page='  //ページURL


  let n = 1;
  const promise = () => {
    return new Promise(async (resolve) => {
      while (n <= 10) {
        await page.goto(pageUrl + n, {
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
        // const url = await page.$$eval(urls, elements => { //URL
        //   return elements.map(element => element.textContent.href) //サービスのURLを取得
        // });
        const url = await page.$$eval(urls, list => list.map(item => item.href)); //サービスのURLを取得

        price.map((e, index) => {  //価格を数値に変換
          data.push(e);     //価格を配列に格納
        })

        if (data.length <= 0) {  //価格が取得できなかった場合
          break;  //ループを抜ける
        }

        console.log(n + ":OK");
        price.map((e, index) => {   //価格を数値に変換
          // console.log(rating[index]); //配列を出力
          if (rating[index] === undefined) {
            rating[index] = "0";
          } else {
            rating[index] = rating[index].replace(/[^0-9]/g, ''); //数字以外を削除
          }
          allData.push({ title: title[index], url: url[index], price: price[index].replace('円', ''), rating: rating[index] });
        })

        // console.log("================");
        n++;

      }
      resolve();  //resolveでPromiseを終了させる
    })
  }
  await promise();  //promiseを実行
  if (allData.length > 0) {  //配列が空でない場合
    console.log(allData); //配列を出力
    csv.stringify(allData, (error, output) => { //CSVに変換
      fs.writeFile(keyWord + '.csv', output, (error) => {  //CSVファイルに書き込み
        console.log("csvファイルの書き出しに成功");
      })
    })
  }
  await browser.close();  //ブラウザを閉じる

})();
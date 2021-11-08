const puppeteer = require('puppeteer');
const Promise=require('promise');
const fs = require('fs');

let data=[{
    "スッキリ":0,
    "朝日":0,
    "au":0,
}];

(async () => { 
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // ページのURL
    const SukkiriUrl = 'https://www.ntv.co.jp/sukkiri/sukkirisu/index.html'  //ページURL
    const AsahiUrl = 'https://www.asahi.com/uranai/12seiza/'
    const AuUrl = 'https://fortune.auone.jp/'
    
    // 各ページのclass要素
    const sukkiri = '.month span'  //検索対象(スッキリの一位の誕生月)
    const asahi = '.rank_01 dl dt a'    //検索対象(朝日の一位の星座)
    const au = '.ft-mainbox__stars_img'    //auの星座


    await page.goto(SukkiriUrl,{
        waitUntil: 'networkidle0'
    });
    const Srank1 = await page.$$eval(sukkiri, els => els.map(el => el.innerText));    //検索対象の◯月かを取得
    console.log("ok");

    await page.goto(AsahiUrl,{
        waitUntil: 'networkidle0'
    });
    const Arank1 = await page.$$eval(asahi, els => els.map(el => el.innerText));    //検索対象の◯月かを取得
    console.log("ok");


    await page.goto(AuUrl,{
        waitUntil: 'networkidle0'
    });
    const AuRank1 = await page.$$eval(au, els => els.map(el => el.innerText));    //検索対象の◯月かを取得
    console.log("ok");

    
    data[0].スッキリ = Srank1[Srank1.length-1];   //スッキリでの1位をdataに格納
    data[0].朝日 = Arank1[Arank1.length-1];   //朝日での1位をdataに格納
    data[0].au = AuRank1[AuRank1.length-1];   //auでの1位をdataに格納
    console.log(JSON.stringify(data,null,2)); //最新のデータを表示
    await browser.close();  //ブラウザを閉じる
    
  })();
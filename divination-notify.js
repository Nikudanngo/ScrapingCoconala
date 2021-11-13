const puppeteer = require('puppeteer');
const Promise=require('promise');
const fs = require('fs');
const setting = require('./testTweet');
const os = require('os');

let data=[{
    "スッキリ":0,
    "朝日":0,
    "au":0,
    "めざまし":0,
    "占いなび":0,
    "ゴイスネット":0,
}];

(async () => { 
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // ページのURL
    const SukkiriUrl = 'https://www.ntv.co.jp/sukkiri/sukkirisu/index.html'  //ページURL
    const AsahiUrl = 'https://www.asahi.com/uranai/12seiza/'
    const AuUrl = 'https://fortune.auone.jp/'
    const MezamasiUrl = 'https://www.fujitv.co.jp/meza/uranai/index.html'
    const UranaiNabiUrl = 'https://p.dwdw.net/official/dailySignRanking/index.html'
    // const GoisuNetUrl = 'https://goisu.net/daily/'


    // 各ページのclass要素
    const sukkiri = '.month span'  //検索対象(スッキリの一位の誕生月)
    const asahi = '.rank_01 dl dt a'    //検索対象(朝日の一位の星座)
    const au = '.ft-mainbox__stars_img'    //auの星座
    const mezamasi = '.result1 p '    //目覚ましの星座占い
    const uranainabi = '.today_ranking a'    //うらないなびの星座
    // const goisu = 'h3'    //ゴイスネットの星座   あとでよいスクレイピング方法を考える

    await page.goto(SukkiriUrl,{
        waitUntil: 'networkidle0'
    });
    const SRank = await page.$$eval(sukkiri, els => els.map(el => el.innerText));    //一位の誕生月を取得
    console.log("ok");

    await page.goto(AsahiUrl,{
        waitUntil: 'networkidle0'
    });
    const ARank = await page.$$eval(asahi, els => els.map(el => el.innerText));    //一位の星座を取得
    console.log("ok");

    await page.goto(AuUrl,{
        waitUntil: 'networkidle0'
    });
    const AuRank = await page.$$eval(au, els => els.map(el => el.innerText));    //一位の星座を取得
    console.log("ok");

    await page.goto(MezamasiUrl,{
        waitUntil: 'networkidle0'
    });
    const MeRnak = await page.$$eval(mezamasi, els => els.map(el => el.innerText));    //一位の星座を取得
    console.log("ok");

    await page.goto(UranaiNabiUrl,{
        waitUntil: 'networkidle0'
    });
    const UranaiRank = await page.$$eval(uranainabi, els => els.map(el => el.innerText));    //検索対象の◯月かを取得
    console.log("ok");

    // await page.goto(GoisuNetUrl,{
    //     waitUntil: 'networkidle0'
    // });
    // const GoisuNetRank = await page.$$eval(goisu, els => els.map(el => el.innerText));    //検索対象の◯月かを取得
    // console.log("ok");
    
    data[0].スッキリ = SRank[SRank.length-1];   //スッキリでの1位をdataに格納
    data[0].朝日 = ARank[ARank.length-1];   //朝日での1位をdataに格納
    data[0].au = AuRank[AuRank.length-1].trim();   //auでの1位をdataに格納.トリミングして余分な空白を削除
    data[0].めざまし = MeRnak[MeRnak.length-3];   //めざましでの1位をdataに格納
    data[0].占いなび = UranaiRank[0];   //うらないなびでの1位をdataに格納
    // data[0].ゴイスネット = GoisuNetRank[0];   //ゴイスネットでの1位をdataに格納
    console.log(JSON.stringify(data,null,2)); //最新のデータを表示
    const sentense = '今日の占い一位の誕生月or星座' + os.EOL 
    +'スッキリ:'+ data[0].スッキリ+ '月生まれ' + os.EOL
    +'朝日:'+ data[0].朝日 + os.EOL
    +'au:'+ data[0].au + os.EOL
    +'めざまし:'+ data[0].めざまし + os.EOL
    +'占いなび:'+ data[0].占いなび + os.EOL
    // +'ゴイスネット:'+ data[0].ゴイスネット + os.EOL
    // console.log(sentense);
    setting.tweetPost(sentense); //ツイート
    await browser.close();  //ブラウザを閉じる
    
  })();
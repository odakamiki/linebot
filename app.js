// expressを読み込み
var express = require("express");
var request = require('sync-request');
var fs = require('fs');
var csvSync = require('csv-parse/lib/sync'); // requiring sync module
var app = express();
app.set('view engine', 'ejs'); //追加
// サーバーの設定
var server = app.listen(process.env.PORT || 5000);
app.get("/", function(req, res, next){ //追加
  res.render('index.ejs', {text: 'こんにちは'}); //追加
}); //追加

function getMessageText(text) {
  var message = '「' + text + '」といいましたか？';
  message = getMessageTextFromCSV(text);

//   if(text.indexOf('漢字') >= 0 ){
//     return'小高産業技術高校では毎週水曜日の国語の時間に漢字のテストがあります。'
//
//   }else if(text.indexOf('敬え') >= 0 ){
//     return'かしこまりました。'
//
//   }else if(text.indexOf('スマホゲー') >= 0 ){
//     return'金持ちが札束で殴るゲームですよね！'
//
//   }else if(text.indexOf('スマホゲーム') >= 0 ){
//     return'金持ちが札束で殴るゲームですよね！'
//
//   }else if(text.indexOf('スマートフォンゲーム') >= 0 ){
//     return'金持ちが札束で殴るゲームですよね！'
//
//   }else if(text.indexOf('何歳') >= 0 ){
//     return'なんと２ヶ月経ってないです'
//
//   }else if(text.indexOf('何才') >= 0 ){
//     return'なんと２ヶ月経ってないです'
//
//   }else if(text.indexOf('疲れた') >= 0 ){
//     return'頑張ってください…！'
//
//   }else if(text.indexOf('こんにちは') >= 0 ){
//     return'こんにちは！'
//
//   }else if(text.indexOf('さようなら') >= 0 ){
//     return'行かないで…'
//
//   }else if(text.indexOf('バイバイ') >= 0 ){
//     return'行かないで…'
//
//   }else if(text.indexOf('またね') >= 0 ){
//     return'また絶対来てね…'
//
//   }else if(text.indexOf('また絶対来てね…') >= 0 ){
//     return'そないなこと言わんといて…うちただのBOTやけん……'
//
//   }else if(text.indexOf('ハロー') >= 0 ){
//     return'あたいジャパニーズだからイングリッシュわからへんねん(´・ω・`)'
//
//   }else if(text.indexOf('未読無視') >= 0 ){
//     return'しないよ！返さないこともあるけど見てるよ！！'
//
//   }else if(text.indexOf('既読無視') >= 0 ){
//     return'したらごめんね♪'
//
//   }else if(text.indexOf('既読') >= 0 ){
//     return'読んでも返信しないときがあります…BOTも人間も同じなのです'
//
//   }else if(text.indexOf('未読') >= 0 ){
//     return'既読は必ずつけます！返信…？知らない子ですね……'
//
//   }else if(text.indexOf('スマートフォン') >= 0 ){
//     return'便利ですが使い方には気をつけなければなりませんね…'
//
//   }else if(text.indexOf('セリフ') >= 0 ){
//     return'アニメのセリフを言ってみると反応するかも…！何か思いついたら言ってみてくださいね！'
//
//   }else if(text.indexOf('あいさつ') >= 0 ){
//     return'挨拶は大事ですよね！'
//
//   }else if(text.indexOf('ゲーム') >= 0 ){
//     return'ドラクエシリーズが一番好きなBOTです。ﾎﾝﾄﾀﾞﾖ'
//
//   }else if(text.indexOf('ドラクエ') >= 0 ){
//     return'ナンバリングは全部、外伝やモンスターズもそこそこやってますよおおお！'
//
//   }else if(text.indexOf('竜王') >= 0 ){
//     return'２形態より１形態が好き///'
//
//   }else if(text.indexOf('りゅうおう') >= 0 ){
//     return'「りゅうおう」はどちらかというと１形態を指すことが多いですね。'
//   // }else if(text.indexOf('今の時間'||'今何時') >= 0 ){
//   //   // message =hour+'時'+minute+'分'
//   //
// }else if(text.indexOf('好き'&&'ドラクエ') >= 2 ){
//     return'7の暗さと10の賑やかさが特に好きです。'
//
//   }else if(text.indexOf('ドラゴンクエスト') >= 0 ){
//     return'個人的には「DQ」よりは「ドラクエ」と呼ぶのが好きです。'
//
//   }else if(text.indexOf('学校'&&'情報') >= 0 ){
//     return'小高産業技術高等学校の最新情報は学校HPを参照ください！URLはこちらhttp://www.odakasangyogijutsu-h.fks.ed.jp/'
//
//   }else if(text.indexOf('学校行事') >= 0 ){
//     return'11月3日金曜日に午前10時から午後2時まで、小高商工会ふれあい広場にて販売会を行いました！応援ありがとうございました！'
//
//   }else if(text.indexOf('行事') >= 0 ){
//     return'11月3日金曜日に午前10時から午後2時まで、小高商工会ふれあい広場にて販売会を行いました！応援ありがとうございました！'
//
//   }else if(text.indexOf('学校') >= 0 ){
//     return'11月3日金曜日に午前10時から午後2時まで、小高商工会ふれあい広場にて販売会を行いました！応援ありがとうございました！'
//
//   }else if(text.indexOf('イベント') >= 0 ){
//     return'11月3日金曜日に午前10時から午後2時まで、小高商工会ふれあい広場にて販売会を行いました！応援ありがとうございました！'
//
//   }else if(text.indexOf('小高') >= 0 ){
//     return'11月3日金曜日に午前10時から午後2時まで、小高商工会ふれあい広場にて販売会を行いました！応援ありがとうございました！'
//
//   }else if(text.indexOf('小高産業技術高校') >= 0 ){
//     return'小高産業技術高校では商業に関すること、工業に関することが学べます！私が所属している商業科は最近販売会を行いました！'
//
//   }else if(text.indexOf('販売会') >= 0 ){
//     return'11月3日金曜日に午前10時から午後2時まで、小高商工会ふれあい広場にて販売会を行いました！応援ありがとうございました！'
//
//   }else if(text.indexOf('高校') >= 0 ){
//     return'小高産業技術高校では商業に関すること、工業に関することが学べます！私が所属している商業科は最近販売会を行いました！'
//
//   }else if(text.indexOf('最新'&&'情報') >= 0 ){
//     return'小高産業技術高等学校の最新情報は学校HPを参照ください！URLはこちらhttp://www.odakasangyogijutsu-h.fks.ed.jp/'
//
//   }else if(text.indexOf('校歌') >= 0){
//     return'小高産業技術高校校歌の作曲は長渕剛さん、作詞が柳美里さんです。良い意味で校歌らしからぬ校歌で公開されたときは生徒も教師も驚いていました。'
//
// 　}else if(text.indexOf('更新日') >= 0 ){
//     return'最終更新日は11月8日です'
//
//   }else if(text.indexOf('作った人') >= 0 ){
//       return'新川とかいうやつが思いついたことを詰め込みました。'
//
//   }else if(text.indexOf('製作者') >= 0 ){
//     　return'新川とかいうやつが思いついたことを詰め込みました。'
//
//   }else if(text.indexOf('使い方') >= 0 ){
//     　return'思いついた言葉をそのまま入力してください！学校関連が多めだと思います・・・'
//
//   }else{
//     message = apiAccessSample(text);
//
//
//     return message;
//   }
}
app.get("/hello", function(req, res, next){
  var message = 'こんにちは。';
  // var hour = new Date().getHours();
  //
  // if(hour < 12) {
  //   message = 'おはようございます';
  // } else if(hour >= 16) {
  //   message = 'こんばんは';
  // }
  // if(req.query.text.indexOf("斉藤")>=0){
  // message ='斉藤さんだぞっ';
  // }else if(req.query.text.indexOf('齋藤')>=0||
  // 	 req.query.text.indexOf('斎藤')>=0||
  // 	 req.query.text.indexOf('齊藤')>=0){
  // message = '漢字が違うぞっ';
  // }else{
  // message = 'ぜんぜん違うぞっ';
  // }
  message = getMessageText(req.query.text);

  res.json(message); //'こんにちは'をmessageに書き換え

});

const line = require('@line/bot-sdk');
const config = {
  channelAccessToken: 'onhmrJ5GXZpJYnyluvZQNpKyUUN3k1O9sjRlUv7UZtGVjRIdHN2I7xaHHHx6QI1Xms1rMRXmuudiOrEnDggkyfexraXJ05ZwgVU8YaDejuvypgLaipARePf0uJrxyIS4sH0fTMZ556tLTXrI0UxVZwdB04t89/1O/w1cDnyilFU=',
  channelSecret: '06ac6abb7c27c71e79505fe637d89723'
};

app.post('/line', line.middleware(config), function(req, res) {
  Promise
  .all(req.body.events.map(handleEvent))
  .then(function(result) {
    res.json(result)
  });
});

const client = new line.Client(config);
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }
  var message = getMessageText(event.message.text);
  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: message
  });
}

// TIPS
//改行したい => \n を挿入

function randomSample() {
  //乱数を発生させ、0,1,2の3パターンをランダムに返すサンプル
  var min = 0;
  var max = 2 ;
  var r = Math.floor( Math.random() * (max + 1 - min) ) + min ;
  switch (r){
  case 0:
    return "夏目といえば夏目漱石ですよね";
  case 1:
    return "夏目といえば夏目三久ですよね";
  case 2:
    return "夏目といえば夏目友人帳ですよね";
  }
}

function timeSample() {
  //時間を取得するサンプルです。
  // こういうところで確認してみよう
  // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Date
  var date = new Date(); //現在の日付を取得
  var year = date.getFullYear(); //年を取得
  var hour = date.getHours(); // 0-23時
  return '年は' + year + '年, 時間は' + hour + '時です';
}

function replyImageSample() {
  //画像を送信するサンプルです
  return client.replyMessage(event.replyToken, {
    type: 'image',
    originalContentUrl: "http://www.odakasangyogijutsu-h.fks.ed.jp/?action=common_download_main&upload_id=23",
    previewImageUrl: "http://www.odakasangyogijutsu-h.fks.ed.jp/?action=common_download_main&upload_id=23"
  });
}

function apiAccessSample(text) {
  var phrase = text;
  var list = _getPhraseFromKotohaAPI(phrase);
  var message = '';
  list.forEach(function(l) {
    var tags = '';
    l.tag_list.forEach(function(t) {
        tags += '#' + t + '';
    });
    message += l.text + tags + '\n';
  });
  return message;
}
function _getPhraseFromKotohaAPI(phrase) {
  // 僕の友人がつくっているchrome拡張プラグイン「kotoha」のサーバーから、キーワードに応じて
  // 名言をレスポンスしてくれるサンプル
  var url = 'https://kotoha-server.herokuapp.com/api/phrases.json?text=' + encodeURIComponent(phrase);
    var response = request(
      'GET',
      url
    );
    console.log(JSON.parse(response.body)); //JSONというフォーマットを変換
    return JSON.parse(response.body) || [];
}

function getMessageTextFromCSV(text) {
  var file = 'input.csv';
  var data = fs.readFileSync(file);

  var res = csvSync(data);

  matchedList = res.filter(function(record) {
    if(text.indexOf(record[0]) >= 0) {
      if(record.length>2){
        for(var i = 2 ; i < record.length; i++){
          console.log("eval: " + record[i]);
          if(record[i].length == 0 || text.indexOf(record[i]) <0){
            console.log("keyword unmatched" + record[i])
            return false;
          } else {
            console.log("keyword matched: " + record[i] )
          }
        }
      }
      console.log('matched');
      return true;
    } else {
      return false;
    }
  })
  if(matchedList[0]) {
    return matchedList[0][1];
  } else {
    return '';
  }


}

// expressを読み込み
var express = require("express");
var app = express();
app.set('view engine', 'ejs'); //追加
// サーバーの設定
var server = app.listen(process.env.PORT || 5000);
app.get("/", function(req, res, next){ //追加
    res.render('index.ejs', {text: 'こんにちは'}); //追加
}); //追加

function getMessageText(text) {
  var message += ' \n「' + text + '」といいましたか？';
  return message;
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
  channelAccessToken: 'TNiyVqdOEV+Tt4SheNECr1+tQMuraIB/cecrXyJdU4m2/BWsI8q9mjbZVCB07Y6GnFvm4NGa/lOGGI4TZ8kx/ShG/TWdSJC5cM6NnurM6EwYPolW6KCcAQBp3/H/RUFGEkZoBBrCoKDHnhBst7f6TAdB04t89/1O/w1cDnyilFU=',
  channelSecret: '14a05618292ac080796aa15278ebcc1e'
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
  var message = getMessageText(req.query.text);
  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: message
  });
}

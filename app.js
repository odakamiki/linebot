// expressを読み込み
var express = require("express");
var app = express();
app.set('view engine', 'ejs'); //追加
// サーバーの設定
var server = app.listen(3000, function(){
    console.log("Node.js is listening to PORT:" + server.address().port);
});
app.get("/", function(req, res, next){ //追加
    res.render('index.ejs', {text: 'こんにちは'}); //追加
}); //追加


app.get("/hello", function(req, res, next){
  var message = 'こんにちは。';
  var hour = new Date().getHours();

  if(hour < 12) {
    message = 'おはようございます';
  } else if(hour >= 16) {
    message = 'こんばんは';
  }
	if(req.query.text.indexOf("斉藤")>=0){
	message ='斉藤さんだぞっ';
	}else if(req.query.text.indexOf('齋藤')>=0||
		 req.query.text.indexOf('斎藤')>=0||
		 req.query.text.indexOf('齊藤')>=0){
	message = '漢字が違うぞっ';
	}else{
	message = 'ぜんぜん違うぞっ';
	}


  message += ' \n「' + req.query.text + '」といいましたか？'
  res.json(message); //'こんにちは'をmessageに書き換え
});

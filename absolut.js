var bodyParser = require('body-parser');
var express = require('express');

var absolutApp = express();

var absolutEndPoint = 'https://addb.absolutdrinks.com//drinks/?apiKey=0f80b9b651e546ceb4fbe3ef9360c14a';
absolutApp.get(absolutEndPoint, function (req, res) {
  console.log(req.body);
  console.log(res);
  res.end("success");
});
app.listen(300);
//https://addb.absolutdrinks.com/drinks/?apiKey=0f80b9b651e546ceb4fbe3ef9360c14a
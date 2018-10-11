var port = 3001;

var express = require('express');
var path = require('path');

var app = express();

app.use(express.static(path.join(__dirname, '../client')));

app.get('/', function (req, res){
    res.sendFile(path.join(__dirname, "../client/index.html"));
});

app.get('*', function (req, res){
    res.redirect("/");
});

app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});

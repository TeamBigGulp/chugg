var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.text());

app.use(express.static(path.join(__dirname, './../')));

app.get('/', function(req,res) {
  res.sendFile('/index.html');
});

app.post('/gulp', function(req, res) {
  console.log(req.body);
  res.end();
})

app.listen(3000, function() {
  console.log('Server is listening on port 3000');
});

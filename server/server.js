<<<<<<< HEAD
const express = require('express');
const app = express();
const path = require('path');
const fileMakerController = require('./fileMakerController');
const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, './../')));
app.use(bodyParser.json());

//route to index on root path
//this might change depending on how React Router is setup
app.get('/', (req, res) => {
	res.send('index.html');
});

app.get('/gulp', fileMakerController.createFile);

app.listen(3000, () => {
	console.log('listening on 3000');
=======
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
>>>>>>> master
});

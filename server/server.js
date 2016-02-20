const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fileMakerController = require('./fileMakerController');
const responseController = require('./responseController');

app.use(express.static(path.join(__dirname, './../')));
// app.use(bodyParser.json());


//route to index on root path
//this might change depending on how React Router is setup
app.get('/', (req, res) => {
	res.send('index.html');
});

app.get('/gulp', fileMakerController.createFile, fileMakerController.zipFile);

app.listen(3000, function() {
  console.log('Server is listening on port 3000');

});

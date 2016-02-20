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
});

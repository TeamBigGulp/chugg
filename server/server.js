const express = require('express');
const app = express();
const path = require('path');
const controller = require('./controller');


app.use(express.static(path.join(__dirname, './../')));

//route to index on root path
//this might change depending on how React Router is setup
app.get('/', (req, res) => {
	res.send('index.html');
});

app.post('/gulp', controller.makeGulp);

app.listen(3000); 

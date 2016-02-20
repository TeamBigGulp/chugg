const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fileMakerController = require('./fileMakerController');

app.use(express.static(path.join(__dirname, './../')));
app.use(bodyParser.text());


//route to index on root path
app.get('/', (req, res) => {
	res.send('index.html');
});

// post request to get the zipped version of the documents that were created
app.post('/gulp', fileMakerController.createsFile, fileMakerController.zipsFile);

app.listen(3000, function() {
  console.log('Server is listening on port 3000');

});

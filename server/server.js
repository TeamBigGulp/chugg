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

// this get request happens after success on the initial post request to /gulp. It allows the zip file to be sent to the user after the post request is completed
app.get('/download', (req, res) => {
	res.sendFile(path.join(__dirname, './chuggFile.zip'));
});

// post request to get the zipped version of the documents that were created
app.post('/gulp', fileMakerController.createsFile, fileMakerController.zipsFile);

app.listen(3000, function() {
  console.log('Server is listening on port 3000');

});

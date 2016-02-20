'use strict';
const fs = require('fs');
const gulpStarter = require('./gulp-starter.js');

const fileMakerController = {
	createFile() {

	fs.createReadStream('./gulp-starter.js').pipe(fs.createWriteStream('./../newgulpfile.js'))

	//call next middleware to jsZIP or child process
	res.send('./../newgulpfile.js')
		//next();
	},


};

module.exports = fileMakerController
fileMakerController.createFile();

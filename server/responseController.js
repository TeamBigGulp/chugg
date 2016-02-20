'use strict';
const fs = require('fs');


const responseController = {
	sendFile() {

		//make a build directory
		fs.mkdir('./../build', () => {			
		});

		//call next middleware to jsZIP or child process
		//next()
	},

	createFile(req, res, next) {
		//make a package.json file
	}
};

module.exports = responseController

responseController.makeGulp()

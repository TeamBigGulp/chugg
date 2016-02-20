'use strict';
const fs = require('fs');
const EasyZip = require('easy-zip').EasyZip;


const fileMakerController = {
	createFile(req, res, next) {

	fs.createReadStream('gulp-starter.js').pipe(fs.createWriteStream('./../newgulpfile.js'))

	//call next middleware to easy-zip
	next();
},

	zipFile(req, res, next) {
		const zip = new EasyZip();

		zip.addFile('./../newgulpfile.js', () => {
			zip.writeToFile('chuggFile.zip');
		});
		next();
	}
};

module.exports = fileMakerController

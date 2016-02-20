'use strict';
const fs = require('fs');
const EasyZip = require('easy-zip').EasyZip;
const path = require('path');

const fileMakerController = {
	createFile(req, res, next) {

	fs.createReadStream(path.join(__dirname, 'gulp-starter.js')).pipe(fs.createWriteStream(path.join(__dirname,'./../newgulpfile.js')));

	//call next middleware to easy-zip
	console.log('test-1')
	next();
},

	zipFile(req, res, next) {
		console.log("are we here");
		const zip = new EasyZip();

		zip.addFile('newgulpfile.js','./../newgulpfile.js', () => {
			console.log('add');
			zip.writeToFile('chuggFile.zip', () =>{
				console.log('wrote');
				zip.writeToResponse(res,'chuggFile.zip');
				res.end();
			});

			// res.send('./chuggFile.zip');
		});
		// next();
	}
};

module.exports = fileMakerController;

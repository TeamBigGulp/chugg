'use strict';
const fs = require('fs');
const EasyZip = require('easy-zip').EasyZip;
const path = require('path');

const fileMakerController = {

	// creates a file matching the current state of the code on the homepage
	createsFile(req, res, next) {
		fs.writeFile(path.join(__dirname, 'gulp-starter.js'), req.body, (err) => {
			if (err) throw err;
			next();
		});
  },

  // zips the file that was just created and sends it back to the user
	zipsFile(req, res, next) {
		console.log("are we here");
		const zip = new EasyZip();

		zip.addFile('gulp-starter.js', path.join(__dirname, 'gulp-starter.js'), () => {
			console.log('add');
			zip.writeToFile('chuggFile.zip', () =>{
				console.log('wrote');
				zip.writeToResponse(res,'chuggFile.zip');
				res.end();
			});

			// res.send('./chuggFile.zip');
		});
		// next();
	},
};

module.exports = fileMakerController;

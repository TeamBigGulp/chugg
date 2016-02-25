'use strict';
const fs = require('fs');
const EasyZip = require('easy-zip').EasyZip;
const path = require('path');
const test = require('./../save-data/mongodb-orm');
const fileMakerController = {

	// creates a file matching the current state of the code on the homepage
	// writeFile(filePath,data,callback)
	// req.body is code included in Gulp File text editor
	savesFile(req, res, next) {
		  test.create({projectName: 'project1', gulpFile: req.body, packageJSON: 'something'}, function(err, dummy) {
		    if (err) console.log(err);
		    console.log(dummy.projectName + ' saved!');
		  });
	},

  updatesFile(req, res, next) {
		// test.update({packageJSON: 'something'}, {packageJSON: req.body}, function(err, dummy) {
		// 	if (err) console.log(err);
		// 	console.log(dummy.projectName + ' updated!')
		// });
		console.log(req.body);
	},

	createsGulpFile(req, res, next) {
		fs.writeFile(path.join(__dirname, 'gulp-starter.js'), req.body, (err) => {
			if (err) throw err;
			next();
		});
	},

	createsJsonFile(req, res, next) {
		fs.writeFile(path.join(__dirname, './../pkgjson/package.json'), req.body, (err) => {
			if (err) throw err;
			next();
		});
	},

	// zips the file that was just created and sends it back to the user
	// addFile(file, filePath, callback)
	// writeToFile(filePath, callback)
	zipsFile(req, res, next) {
		const zip = new EasyZip();
		zip.addFile('gulp-starter.js', path.join(__dirname, 'gulp-starter.js'), () => {
			zip.addFile('docs.md', path.join(__dirname, './../docs/docs.md'), () => {
				zip.addFile('package.json', path.join(__dirname, './../pkgjson/package.json'),() => {
					zip.writeToFile(path.join(__dirname, 'chuggFile.zip'), () => {
						res.end()
					});
				});
			});
		});
	},
};

module.exports = fileMakerController;

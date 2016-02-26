'use strict';
const fs = require('fs');
const EasyZip = require('easy-zip').EasyZip;
const path = require('path');
const test = require('./../save-data/mongodb-orm');
const fileMakerController = {

	// creates a file matching the current state of the code on the homepage
	// writeFile(filePath,data,callback)
	// req.body is code included in Gulp File text editor

  // need to set up test to check whether to create or update document

	savesFile(req, res, next) {
		test.Project.update({projectName: req.body.projectName}, {gulpFile: req.body.gulpFile, packageJSON: req.body.packageJSON}, function(err, project) {
		if (err) console.log(err);
		console.log(project.projectName + ' updated!');
	  });

			// test.Project.create({projectName: req.body.projectName, gulpFile: req.body.gulpFile, packageJSON: req.body.packageJSON}, function(err, project) {
		  //   if (err) console.log(err);
		  //   console.log(project.projectName + ' saved!');
		  // });
	},

	createsGulpFile(req, res, next) {
		fs.writeFile(path.join(__dirname, 'files/gulp-starter.js'), req.body, (err) => {
			if (err) throw err;
			next();
		});
	},

	createsJsonFile(req, res, next) {
		fs.writeFile(path.join(__dirname, 'files/package.json'), req.body, (err) => {
			if (err) throw err;
			next();
		});
	},

	// zips the file that was just created and sends it back to the user
	// addFile(file, filePath, callback)
	// writeToFile(filePath, callback)
	zipsFile(req, res, next) {
		const zip = new EasyZip();
		zip.addFile('gulp-starter.js', path.join(__dirname, 'files/gulp-starter.js'), () => {
			zip.addFile('docs.md', path.join(__dirname, 'files/readme.md'), () => {
				zip.addFile('package.json', path.join(__dirname, 'files/package.json'),() => {
					zip.writeToFile(path.join(__dirname, 'files/chuggFile.zip'), () => {
						res.end()
					});
				});
			});
		});
	},
};

module.exports = fileMakerController;

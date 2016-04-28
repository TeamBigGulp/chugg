'use strict';
const fs = require('fs');
const EasyZip = require('easy-zip').EasyZip;
const path = require('path');
const test = require('./../save-data/mongodb-orm');
const fileMakerController = {

  // creates a file matching the current state of the code on the homepage
  savesFile(req) {
    test.Project.update(
      { projectName: req.body.projectName },
      { gulpFile: req.body.gulpFile, packageJSON: req.body.packageJSON }
    );
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
  zipsFile(req, res) {
    const zip = new EasyZip();
    zip.addFile('gulp-starter.js', path.join(__dirname, 'files/gulp-starter.js'), () => {
      zip.addFile('docs.md', path.join(__dirname, 'files/readme.md'), () => {
        zip.addFile('package.json', path.join(__dirname, 'files/package.json'), () => {
          zip.writeToFile(path.join(__dirname, 'files/chuggFile.zip'), () => {
            res.end();
          });
        });
      });
    });
  },
};

module.exports = fileMakerController;

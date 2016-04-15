// var express = require('express');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
// var app = express(); // Isaac: I don't see any references to app or express elswhere in this file.
// mongoose.connect('mongodb://localhost/test');
// mongoose.connection.once('open', function() {
//   console.log('Connected with MongoDB ORM - localhost/test');
// }); Isaac: Moved the connection to the server page.


// Schemas
// Is 'mongoose.Schema' identical to 'new Schema'?
var userSchema = mongoose.Schema({
  username: {type: String, unique: true},
  password: String
});

var projectSchema = mongoose.Schema({
  projectName: {type: String, unique: true},
  gulpFile: String,
  packageJSON: String
});

userSchema.plugin(passportLocalMongoose);

// Create object to export
var dbController = {};
dbController.User = mongoose.model('users', userSchema);
dbController.Project = mongoose.model('projects', projectSchema);


module.exports = dbController;

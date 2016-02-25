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
  projectName: String,
  gulpFile: String,
  packageJSON: String
});

userSchema.plugin(passportLocalMongoose);

// Create object to export
var dbController = {};
dbController.User = mongoose.model('users', userSchema);
dbController.Project = mongoose.model('projects', projectSchema);

  // User.create({username: 'user1', password: 'user1'}, function(err, dummy) {
  //   if (err) console.log(err);
  //   console.log(dummy.username + ' saved!');
  // });

// Run this as needed to create dummy users.
// for (var i = 1; i < 11; i++) {
//   dbController.User.create({username: 'user' + i, password: 'user' + i}, function(err, dummy) {
//     if (err) console.log(err);
//     console.log(dummy.username + ' saved!');
//   });
// }

module.exports = dbController;

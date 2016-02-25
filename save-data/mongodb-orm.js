var express = require('express');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var app = express();
mongoose.connect('mongodb://localhost/test');
mongoose.connection.once('open', function() {
  console.log('Connected with MongoDB ORM - localhost/test');
});


// place Schemas here
var userSchema = mongoose.Schema({
  username: {type: String, unique: true},
  password: String
});

var projectSchema = mongoose.Schema({
  projectName: String,
  gulpFile: String,
  packageJSON: String
});

//place code here
var User = mongoose.model('users', userSchema);
var Project = mongoose.model('projects', projectSchema);

  // User.create({username: 'user1', password: 'user1'}, function(err, dummy) {
  //   if (err) console.log(err);
  //   console.log(dummy.username + ' saved!');
  // });

// for (var i = 1; i < 11; i++) {
//   User.create({username: 'user' + i, password: 'user' + i}, function(err, dummy) {
//     if (err) console.log(err);
//     console.log(dummy.username + ' saved!');
//   });
// }

module.exports = Project;

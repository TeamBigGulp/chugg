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
  projectName: {type: String, unique: true},
  gulpFile: String,
  packageJSON: String
});

//place code here

var Database = {
  user: mongoose.model('users', userSchema),
  project: mongoose.model('projects', projectSchema)
};


module.exports = Database;

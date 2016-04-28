/* eslint-disable new-cap */

const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

// Schemas
const userSchema = mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
});

const projectSchema = mongoose.Schema({
  projectName: { type: String, unique: true },
  gulpFile: String,
  packageJSON: String,
});

userSchema.plugin(passportLocalMongoose);

// Create object to export
const dbController = {};
dbController.User = mongoose.model('users', userSchema);
dbController.Project = mongoose.model('projects', projectSchema);

module.exports = dbController;

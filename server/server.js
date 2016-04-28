/* eslint-disable no-console */

const express = require('express');
const app = express();
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const fileMakerController = require('./fileMakerController');
const test = require('./../save-data/mongodb-orm');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(cookieParser());
app.use(session({
  secret: 'chugg',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, './../')));

// ROUTES
// Route to index on root path
app.get('/', (req, res) => {
  res.send('index.html');
});

// This get request happens after success on the initial post request to /gulp. It allows the zip
// file to be sent to the user after the post request is completed.
app.get('/download', (req, res) => {
  res.download(path.join(__dirname, 'files/chuggFile.zip'));
});

// Post request to get the zipped version of the documents that were created
app.post('/gulp', fileMakerController.createsGulpFile, fileMakerController.zipsFile);
app.post('/json', fileMakerController.createsJsonFile, fileMakerController.zipsFile);
app.post('/save', fileMakerController.savesFile);

app.post('/register', (req, res) => {
  test.User.register(new test.User({ username: req.body.username }), req.body.password, err => {
    // Handle errors, like attempts to register with a username that's already in the database
    if (err) res.status(400).end();
    passport.authenticate('local')(req, res, res.end);
  });
});

app.post('/login', passport.authenticate('local'), (req, res) => res.end());

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

// Configure Passport
passport.use(new LocalStrategy(test.User.authenticate()));
passport.serializeUser(test.User.serializeUser());
passport.deserializeUser(test.User.deserializeUser());

// Mongoose
mongoose.connect('mongodb://localhost/passport_local_mongoose_express4');

module.exports = app;

// Useful resources:
// http://mherman.org/blog/2015/01/31/local-authentication-with-passport-and-express-4/#.Vs5DW5MrKgS
// http://mongoosejs.com/docs/index.html
// http://mongoosejs.com/docs/guide.html
// https://github.com/saintedlama/passport-local-mongoose/blob/master/examples/login/routes.js

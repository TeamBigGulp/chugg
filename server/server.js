// I'm modeling my code on http://mherman.org/blog/2015/01/31/local-authentication-with-passport-and-express-4/#.Vs5DW5MrKgS.
// I also found http://mongoosejs.com/docs/index.html and http://mongoosejs.com/docs/guide.html helpful.

// Dependencies
const express = require('express');
const app = express();
const path = require('path');
// const favicon = require('serve-favicon'); // I don't think we need this.
const logger = require('morgan'); // Is this what's causing everything to be logged in the terminal?
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const fileMakerController = require('./fileMakerController');
const test = require('./../save-data/mongodb-orm');
// const request = require('superagent'); // We were using this for resting, but I don't think we need it anymore. We're not using 'request' anywhere in this file.


// We don't need to save variables called 'routes' or 'users'.

// We're not using a view enginge.

// This is where we'd use favicon.
app.use(logger('dev')); // This is logging our GET and POST requests in the terminal.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text()); // Do I need all of these bodyParsers? I definitely need JSON to parse data sent as JSON.
app.use(cookieParser());
app.use(session({
	secret: 'chugg',
	resave: false,
	saveUninitialized: false
})); // I'm not sure what this is doing. See https://github.com/expressjs/session
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, './../')));

// ROUTES
//route to index on root path
app.get('/', (req, res) => {
	res.send('index.html');
});

// this get request happens after success on the initial post request to /gulp. It allows the zip file to be sent to the user after the post request is completed
app.get('/download', (req, res) => {
	res.download(path.join(__dirname, 'files/chuggFile.zip'));
});

// post request to get the zipped version of the documents that were created
app.post('/gulp', fileMakerController.createsGulpFile, fileMakerController.zipsFile);
app.post('/json', fileMakerController.createsJsonFile, fileMakerController.zipsFile);
app.post('/save', fileMakerController.savesFile);

// adapted from mherman and https://github.com/saintedlama/passport-local-mongoose/blob/master/examples/login/routes.js
app.post('/register', function(req, res) {
	test.User.register(new test.User({ username: req.body.username }), req.body.password, function(err, account) {
		if (err) { // For example, if the user tries to register with a username that's already in the database.
			console.log('error:', err); // This shows up in the terminal.
			return;
		}
		res.end(); // I'm not sure exactly what should happen here.
	});
});

app.post('/login', passport.authenticate('local'), function(req, res) {
	res.end(); // I'm not sure exactly what should happen here.
});

// Need to test this
/*
app.get('/logout', function(req, res) {
	req.logout();
	console.log('Successful logout');
	res.end(); // I'm not sure exactly what should happen here.
})
*/

app.listen(3000, function() {
	console.log('Server is listening on port 3000');
});

// Configure Passport (For details, see https://github.com/saintedlama/passport-local-mongoose)
// var Account = require('./../models/account'); // Isaac: We're now using test instead of Account.
passport.use(new LocalStrategy(test.User.authenticate()));
passport.serializeUser(test.User.serializeUser());
passport.deserializeUser(test.User.deserializeUser());

// Mongoose
mongoose.connect('mongodb://localhost/passport_local_mongoose_express4'); // We could change the URI if desired.

// Need catch 404 / error handlers

module.exports = app;

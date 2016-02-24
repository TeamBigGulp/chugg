const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fileMakerController = require('./fileMakerController');
var request = require('superagent');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;

// See http://mongoosejs.com/docs/index.html. This 'getting started' page is useful, but the API docs aren't. Use this guide instead: http://mongoosejs.com/docs/guide.html
// I'd like some clarification on exactly what these two lines of code are doing
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test'); // Open a connection to the 'test' database

// Here's what I'm doing to save users to the database:
 
var db = mongoose.connection; // Grab onto the connection we just opened. (Think of the connection as the database.)
// Handle errors?

db.once('open', function() { // Where does the .once method come from?
	
	var userSchema = mongoose.Schema({
		username: String,
		password: String
	});

	var User = mongoose.model('User', userSchema);

	// Save a new user in two steps
	// var isaac = new User({
	// 	name: 'Isaac',
	// 	password: 'test'
	// });
	// console.log('The name of the user we just created is', isaac.name);
	// isaac.save(function(err) {
	// 	if (err) console.log(err); // return before cl?
	// })

	// Save a new user in one step
	// User.create({username: 'test', password: 'test'});

	User.find(function(err, users) {
		console.log('All our users:', users);
	})
})

// Following code adapted from https://github.com/passport/express-4.x-local-example/blob/master/server.js

// Configure local strategy
passport.use(new Strategy(
	
	function(username, password, cb) {
		db.users.findByUsername(username, 

			function(err, user) {
			if (err) return cb(err);
			if (!user) return cb(null, false);
			if (!user.password != password) return cb(null, false);
			return cb(null, user);
		});
	
	})

);

// Configure authenticated session persistence
/*
passport.serializeUser(function(user, cb) {
	cb(null, user._id);
});

passport.deserializeUser(function(_id, cb) {
	db.users.findById(_id, function (err, user) { // findById is a custom function
		if (err) return cb(err);
		cb(null, user);
	})
})
*/

// I think I should replace all occurrences of id with _id

app.use(express.static(path.join(__dirname, './../')));
app.use(bodyParser.text()); // Should this be .text()?
// Do I need any of the middleware from the example I'm copying?


app.use(passport.initialize());
app.use(passport.session());

//route to index on root path
app.get('/', (req, res) => {
	res.send('index.html');
});

app.post('/login',
	// This seems to kind of work in Postman if I have a failureRedirect, but I can't make any console logs happen.
	// OK, now I'm being redirected to /download regardless of whether I use valid login credentials.
	passport.authenticate('local', {failureRedirect: '/download'}),
	function(req, res) {
		// console.log('Post request received');
		// console.log('Successful login!');
		// res.redirect('/');
		res.send('successful login');
		// res.redirect('/download');
	}
)

// this get request happens after success on the initial post request to /gulp. It allows the zip file to be sent to the user after the post request is completed
app.get('/download', (req, res) => {
	res.download(path.join(__dirname, './chuggFile.zip'));
});

// post request to get the zipped version of the documents that were created
app.post('/gulp', fileMakerController.createsFile, fileMakerController.zipsFile);

app.listen(3000, function() {
  console.log('Server is listening on port 3000');
});

module.exports = app;
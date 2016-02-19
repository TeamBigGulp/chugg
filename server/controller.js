'use strict';
const fs = require('fs');


const controller = {
	makeGulp(req, res) {
		let postBody = JSON.stringify(req.body.postValues);

		//make a gulpfile based on params passed in from POST request. This will be refactored based off of how the POST values are set client side
		fs.appendFile('gulpfile.js', postBody, (err) => {
			if (err) throw new Error ('err: ', err);
		});

		//call next middleware to jsZIP
		res.send('Made a gulpfile just for you!'); 
	}
};

module.exports = controller

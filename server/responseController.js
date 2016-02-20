'use strict';
const fs = require('fs');
const EasyZip = require('easy-zip').EasyZip

const responseController = {
	sendDownloadableZipFile(req, res, next) {
		const zip = new EasyZip ();
		zip.writeToResponse(res, './../chuggFile.zip');
		next();
	}
}

module.exports = responseController

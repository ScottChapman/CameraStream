var fs = require('fs-extra');
var path = require('path');
var vision = require('@google-cloud/vision')({
	keyFilename: './key.json',
	projectId: 'MyCamera'
});

var imageFile = "./stream/image.jpg";

function AnalyzeImage(imageFile,callback) {
	return new Promise(function(resolve,reject) {
		vision.detect(imageFile, [
			"crops",
			"document",
			"faces",
			"landmarks",
			"labels",
			"logos",
			"properties",
			"safeSearch",
			"similar",
			"text"
		],
		function(err, info, resp) {
			if (err) reject(err);
			resolve(info);
		});
	})
}

/*
console.log("Checking with google machine...");
AnalyzeImage('./kittens.jpg').then(info => {
	console.log("Got something back!");
	console.log(JSON.stringify(info,null,2));
}).catch(err => {
	console.dir(err);
})
*/

module.exports.AnalyzeImage = AnalyzeImage;

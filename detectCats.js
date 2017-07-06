var fs = require('fs');
var _ = require('lodash');
var imageFile = "./stream/image.jpg";

var cats = ['cat','cats','kitten','kittens','feline'];
function ContainsCats(info) {
	return new Promise(function(resolve,reject) {
		resolve(_.intersection(_.words(info.labels.join(' ')),cats).length > 0);
	}
}

/*
console.log("Checking with google machine...");
if (ContainsCats(JSON.parse(fs.readFileSync('./kittens.json')))) {
	console.log("Found Cats!");
}
else {
	console.log("No cats found...");
}

if (ContainsCats(JSON.parse(fs.readFileSync('./faces.json')))) {
	console.log("Found Cats!");
}
else {
	console.log("No cats found...");
}
*/

module.exports.detect = ContainsCats;

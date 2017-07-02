var fs = require('fs-extra');
var PImage = require('pureimage');
var fs = require('fs');

function drawFaceBoxes(info,imageIn,imageOut) {
	return new Promise(function(resolve,reject) {
		var img = PImage.decodeJPEG(fs.readFileSync(imageIn));
		info.faces.forEach(face => {
			var rect = {
				x: face.bounds.head[0].x,
				y: face.bounds.head[0].y,
				w: face.bounds.head[2].x - face.bounds.head[0].x,
				h: face.bounds.head[2].y - face.bounds.head[0].y,
			}
		   var c = img.getContext('2d');
		   c.strokeStyle = "white";
		   c.strokeRect(rect.x, rect.y, rect.w, rect.h);
		})
		PImage.encodeJPEG(img, fs.createWriteStream(imageOut), function(err) {
			console.log("wrote out the image");
			resolve(info.faces.length);
		});
	})
}

drawFaceBoxes(JSON.parse(fs.readFileSync('./faces.json')), './faces.jpg', './facesBoxed.jpg').then(function(count) {
	console.log("Found: " + count + " faces!");
});

drawFaceBoxes(JSON.parse(fs.readFileSync('./kittens.json')), './kittens.jpg', './kittensBoxed.jpg').then(function(err,count) {
	console.log("Found: " + count + " faces!");
});

var fs = require('fs-extra');
var path = require('path');
var vision = require('@google-cloud/vision')({
	keyFilename: './key.json',
	projectId: 'MyCamera'
});
var flite = require('flite');
var Humanize = require('humanize-plus');

var imageFile = "./image.jpg";

/*
console.log("Checking with Google...");
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
	console.log("Got something back!");
	// console.log(JSON.stringify(info,null,2));
	console.log(JSON.stringify(info.faces,null,2));
	var faces = info.faces.length;
	var msg = "I Found " + faces + " " + Humanize.pluralize(faces,"face");

	/*
	flite(function (err, speech) {
	  if (err) { return console.error(err) }
	  speech.say(msg, function (err) {
	    if (err) { return console.error(err) }
	    /// make sure to have your sound on :)
	  });
	});
	*/
	/*
});
*/

	var face = [
        {
          "x": 161,
          "y": 170
        },
        {
          "x": 226,
          "y": 170
        },
        {
          "x": 226,
          "y": 245
        },
        {
          "x": 161,
          "y": 245
        }
      ];
	var rect = {
		x: face[0].x,
		y: face[0].y,
		w: face[2].x - face[0].x,
		h: face[2].y - face[0].y,
	}
	var fs = require('fs');
	/*
var jpeg = require('jpeg-js');
var jpegData = fs.readFileSync('image.jpg');
var rawImageData = jpeg.decode(jpegData);
*/
  var PImage = require('pureimage');
	var img = PImage.decodeJPEG(fs.readFileSync('./image.jpg'));
		console.dir(img);
   var c = img.getContext('2d');
	 console.dir(c);
   c.strokeStyle = "black";
   c.strokeRect(rect.x, rect.y, rect.w, rect.h);
   PImage.encodeJPEG(img, fs.createWriteStream('./image2.jpg'), function(err) {
     console.log("wrote out the image");
  });

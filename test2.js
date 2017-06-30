var fs = require('fs');
var jpeg = require('jpeg-js');
var jpegData = fs.readFileSync('image.jpg');
var rawImageData = jpeg.decode(jpegData);
console.log(rawImageData);

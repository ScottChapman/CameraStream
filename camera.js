var Gpio = require('pigpio').Gpio;
var spawn = require('child_process').spawn;
var exec = require('child_process').exec;
var _ = require('lodash');
var analyze = require('./analyze.js');
var emotion = require('./emotion.js');
var speaker = require('./speaker.js');
var faceBoxes = require('./drawBox.js');
var catDetector = require('./detectCats.js');
var preview;
var photoDisplay;
var streamFile = "./images/stream_image.jpg";
var imageFile = "./images/image.jpg";

var button1 = new Gpio(20, {
    mode: Gpio.INPUT,
    pullUpDown: Gpio.PUD_UP,
    edge: Gpio.FALLING_EDGE
  });

button1.on('interrupt', _.debounce(function (level) {
	if (level === 0) {
		console.log("GPIO20 Pressed!");
		startStreaming();
	}
}, 1000, { leading: true }));

var button2 = new Gpio(12, {
    mode: Gpio.INPUT,
    pullUpDown: Gpio.PUD_UP,
    edge: Gpio.FALLING_EDGE
  });

button2.on('interrupt', _.debounce(function (level) {
	if (level === 0) {
		console.log("GPIO12 Pressed!");
		checkForFaces();
	}
},1000, { leading: true }));

var button3 = new Gpio(16, {
    mode: Gpio.INPUT,
    pullUpDown: Gpio.PUD_UP,
    edge: Gpio.FALLING_EDGE
  });

button3.on('interrupt', _.debounce(function (level) {
	if (level === 0) {
		console.log("GPIO16 Pressed!");
		checkForCats();
	}
},1000, { leading: true }));

var button4 = new Gpio(21, {
    mode: Gpio.INPUT,
    pullUpDown: Gpio.PUD_UP,
    edge: Gpio.FALLING_EDGE
  });

button4.on('interrupt', _.debounce(function (level) {
	if (level === 0) {
		console.log("GPIO21 Pressed!");
		stopStreaming();
	}
},1000, { leading: true }));

function startStreaming() {
	stopPhotoDisplay();
	if (!preview || preview.killed) {
	  var args = ["-w", "1024", "-h", "600", "-o", streamFile, "-t", "999999999", "-tl", "0"];
	  console.log("Starting preview");
	  preview = spawn('raspistill', args);
	}
}

function startPhotoDisplay() {
	if (!photoDisplay || photoDisplay.killed) {
	  var args = ["-T", "1", "-a", streamFile];
	  console.log("Starting photoDisplay");
	  photoDisplay = spawn('fbi', args);
	}
}

function stopPhotoDisplay() {
  console.log("Stopping PhotoDisplay...");
  if (photoDisplay && !photoDisplay.killed) {
  	console.log("Killing photoDisplay");
  	// photoDisplay.stdin.pause();
  	// photoDisplay.kill('SIGKILL');
	exec('killall fbi');
	photoDisplay = null;
	console.dir(photoDisplay);
  }
}

function checkForFaces() {
	stopStreaming();
  speaker.speak("Hmmm... Let me see what the Google Machine thinks...").then(function() {
  	analyze.AnalyzeImage(streamFile).then(info => {
      faceBoxes.drawFaceBoxes(info,streamFile,streamFile).then(function(count) {
    		startPhotoDisplay();
    		console.dir(info);
    		emotion.detect(info).then(emotions => {
    			speaker.speak(emotions.text);
    			console.dir(emotions);
    		});
      })
    })
  })
}

function checkForCats() {
	stopStreaming();
  speaker.speak("Hmmm... Let me see if the Google Machine can find any cats...").then(function() {
  	analyze.AnalyzeImage(streamFile).then(info => {
  		startPhotoDisplay();
  		console.dir(info);
  		catDetector.detect(info).then(cats => {
        if (cats)
    			speaker.speak("Hey! Google sees cats!");
        else
    			speaker.speak("Well, Google didn't find any cats...");
  		});
    })
  })
}

function stopStreaming() {
  console.log("Stopping preview...");
  if (preview && !preview.killed) {
  	console.log("Killing preview");
	preview.stdin.pause();
  	preview.kill();
  }
}

process.stdin.resume();//so the program will not close instantly

function exitHandler(options, err) {
    if (options.cleanup) console.log('clean');
    if (err) console.log(err.stack);
    stopStreaming();
    stopPhotoDisplay();
    if (options.exit) process.exit();
}

//do something when app is closing
process.on('exit', exitHandler.bind(null,{cleanup:true}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));

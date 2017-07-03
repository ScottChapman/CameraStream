var Gpio = require('pigpio').Gpio;
var spawn = require('child_process').spawn;
var exec = require('child_process').exec;
var stream;
var _ = require('lodash');
var image = "./images/raw_image.jpg";

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
		takePhoto();
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
	if (!stream || stream.killed) {
	  var args = ["-w", "1024", "-h", "600", "-vs", "-t", "999999999", "-tl", "100"];
	  console.log("Starting streaming");
	  stream = spawn('raspistill', args);
	}
}

function takePhoto() {
	stopStreaming();
	if (!stream || stream.killed) {
	  var args = ["-w", "1024", "-h", "600", "-vs", "-o", image, "-f"];
	  console.log("Starting streaming");
	  exec('raspistill -w 1024 -h 600 -vs -f -o ' + image, (error,stdout,stderr) => {
			console.log("Photo taken");
		});
	}
}

function stopStreaming() {
  console.log("Stopping streaming...");
  if (!stream.killed) {
	console.log("Killing stream");
	stream.kill();
  }
}


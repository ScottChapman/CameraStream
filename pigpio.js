var Gpio = require('pigpio').Gpio;
var button1 = new Gpio(12, {
    mode: Gpio.INPUT,
    pullUpDown: Gpio.PUD_UP,
    edge: Gpio.EITHER_EDGE
  });

button1.on('interrupt', function (level) {
	if (level === 0) {
		console.log("Button1 Pressed!");
	}
});

/*
var button2 = new Gpio(16, {
    mode: Gpio.INPUT,
    pullUpDown: Gpio.PUD_UP,
    edge: Gpio.FALLING_EDGE
  });

button2.on('interrupt', function (level) {
	if (level === 0) {
		console.log("Button2 Pressed!");
	}
});

var button3 = new Gpio(20, {
    mode: Gpio.INPUT,
    pullUpDown: Gpio.PUD_UP,
    edge: Gpio.FALLING_EDGE
  });

button3.on('interrupt', function (level) {
	if (level === 0) {
		console.log("Button3 Pressed!");
	}
});

var button4 = new Gpio(21, {
    mode: Gpio.INPUT,
    pullUpDown: Gpio.PUD_UP,
    edge: Gpio.FALLING_EDGE
  });

button4.on('interrupt', function (level) {
	if (level === 0) {
		console.dir(level);
		console.log("Button4 Pressed!");
	}
});

*/

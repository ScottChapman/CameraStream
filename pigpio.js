var Gpio = require('pigpio').Gpio;
var _ = require('lodash');

var button1 = new Gpio(12, {
    mode: Gpio.INPUT,
    pullUpDown: Gpio.PUD_UP,
    edge: Gpio.FALLING_EDGE
  });

button1.on('interrupt', _.debounce(function (level) {
	if (level === 0) {
		console.log("GPIO12 Pressed!");
	}
}, 1000);

var button2 = new Gpio(16, {
    mode: Gpio.INPUT,
    pullUpDown: Gpio.PUD_UP,
    edge: Gpio.FALLING_EDGE
  });

button2.on('interrupt', _.debounce(function (level) {
	if (level === 0) {
	if (level === 0) {
		console.log("GPIO16 Pressed!");
	}
},1000);

var button3 = new Gpio(20, {
    mode: Gpio.INPUT,
    pullUpDown: Gpio.PUD_UP,
    edge: Gpio.FALLING_EDGE
  });

button3.on('interrupt', _.debounce(function (level) {
	if (level === 0) {
		console.log("GPIO20 Pressed!");
	}
},1000);

var button4 = new Gpio(21, {
    mode: Gpio.INPUT,
    pullUpDown: Gpio.PUD_UP,
    edge: Gpio.FALLING_EDGE
  });

button4.on('interrupt', _.debounce(function (level) {
	if (level === 0) {
		console.dir(level);
		console.log("GPIO21 Pressed!");
	}
},1000);

*/

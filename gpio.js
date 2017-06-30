var Gpio = require('onoff').Gpio;
var button1 = new Gpio(12, 'in', 'both');
var button2 = new Gpio(16, 'in', 'both');
var button3 = new Gpio(20, 'in', 'both');
var button4 = new Gpio(21, 'in', 'both');

button1.watch(function(err, value) {
  console.log("Button 1 pressed");
});

button2.watch(function(err, value) {
  console.log("Button 2 pressed");
});

button3.watch(function(err, value) {
  console.log("Button 3 pressed");
});

button4.watch(function(err, value) {
  console.log("Button 4 pressed");
});

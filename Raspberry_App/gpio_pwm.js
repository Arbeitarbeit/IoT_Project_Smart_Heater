const raspi = require('raspi');
const pwm = require('raspi-pwm');

var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var Heater = new Gpio(17, 'out'); //use GPIO pin 17, and specify that it is output
var Fan = new Gpio(4, 'out'); //use GPIO pin 4, and specify that it is output

#
#
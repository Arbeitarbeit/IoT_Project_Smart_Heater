// const raspi = require('raspi');
// const pwm = require('raspi-pwm');

// var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
// var Heater = new Gpio(17, 'out'); //use GPIO pin 17, and specify that it is output
// var Fan = new Gpio(4, 'out'); //use GPIO pin 4, and specify that it is output

// Hardware PWM available on GPIO12(Pin32), GPIO13, GPIO18, GPIO19

// Use PWM to pulse the Fan connected to GPIO12(Pin32) from fully off to fully on continuously.

const Gpio = require('pigpio').Gpio;

const fan = new Gpio(12, {mode: Gpio.OUTPUT});

let dutyCycle = 0;

setInterval(() => {
  fan.pwmWrite(dutyCycle);

  dutyCycle += 5;
  if (dutyCycle > 255) {
    dutyCycle = 0;
  }
}, 20);

#
#
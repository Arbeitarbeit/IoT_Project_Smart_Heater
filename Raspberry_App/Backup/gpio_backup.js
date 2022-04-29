//export {setupGPIO, openFan0, openFan1, openHeater0, openHeater1, updateFan0, updateFan1, updateHeater0, updateHeater1};
const Gpio = require('pigpio').Gpio;

// const fan = new Gpio(17, {mode: Gpio.OUTPUT});
// let dutyCycle = 10;
// while(true){
//   fan.pwmWrite(dutyCycle);
// }

function setupGPIO(){
  const fan0 = new Gpio(17, {mode: Gpio.OUTPUT}); //GPIO17 at Pin11
  const fan1 = new Gpio(27, {mode: Gpio.OUTPUT}); //GPIO27 at Pin13
  const heater0 = new Gpio(23, {mode: Gpio.OUTPUT}); //GPIO23 at Pin16
  const heater1 = new Gpio(24, {mode: Gpio.OUTPUT}); //GPIO24 at Pin18
  fan0.pwmWrite(0);
  fan1.pwmWrite(0);
  heater0.pwmWrite(0);
  heater1.pwmWrite(0);
}

function openFan0(){
  let dutyCycle = 255;
  fan0.pwmWrite(dutyCycle);
}

function openFan1(){
  let dutyCycle = 255;
  fan1.pwmWrite(dutyCycle);
}

function openHeater0(){
  let dutyCycle = 255;
  heater0.pwmWrite(dutyCycle);
}

function openHeater1(){
  let dutyCycle = 255;
  heater1.pwmWrite(dutyCycle);
}

// open decision strategy

//tempdiff = database['temperature'] - data.temperature
// if(tempdiff < -1)
// if(tempdiff < -1)
// if(tempdiff > 1)
// if(tempdiff > 1)


// dutyCycle update depending the temperature difference
function updateFan0(){
  let dutyCycle = 150;
  fan0.pwmWrite(dutyCycle);
}

function updateFan1(){
  let dutyCycle = 150;
  fan1.pwmWrite(dutyCycle);
}

function updateHeater0(){
  let dutyCycle = 150;
  heater0.pwmWrite(dutyCycle);
}

function updateHeater1(){
  let dutyCycle = 150;
  heater1.pwmWrite(dutyCycle);
}

// update decision strategy
// if(tempdiff > -1||tempdiff < 0)
// if(tempdiff > -1||tempdiff < 0)
// if(tempdiff < 1||tempdiff > 0)
// if(tempdiff < 1||tempdiff > 0)


// export funtion to app.js





// test by firebase input:

// const raspi = require('raspi');
// const pwm = require('raspi-pwm');

// var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
// var Heater = new Gpio(17, 'out'); //use GPIO pin 17, and specify that it is output
// var Fan = new Gpio(4, 'out'); //use GPIO pin 4, and specify that it is output

// Hardware PWM available on GPIO12(Pin32), GPIO13, GPIO18, GPIO19

// Use PWM to pulse the Fan connected to GPIO12(Pin32) from fully off to fully on continuously.

// const Gpio = require('pigpio').Gpio;

// const fan = new Gpio(12, {mode: Gpio.OUTPUT});

// let dutyCycle = 0;

// setInterval(() => {
//   fan.pwmWrite(dutyCycle);

//   dutyCycle += 5;
//   if (dutyCycle > 255) {
//     dutyCycle = 0;
//   }
// }, 20);

// setInterval(() => {
//   fan.pwmWrite(dutyCycle);

// //   dutyCycle += 250;
// // // dutyCycle = prompt("duty cycle:");
// //   if (dutyCycle > 255) {
// //     dutyCycle = 0;
// //   }
//   //     dutyCycle = 100;
//   //   }
//   //   else {
//   //     dutyCycle = 255;
//   //   }
   
//   // });

// }, 10000);



// fan.pwmWrite(dutyCycle);

// await new Promise(resolve => setTimeout(resolve, 1000));

// fan.pwmWrite(100);



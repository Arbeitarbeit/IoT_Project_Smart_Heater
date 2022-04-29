const Gpio = require('pigpio').Gpio;


function setupGPIO(){
    const fan0 = new Gpio(17, {mode: Gpio.OUTPUT}); //GPIO17 at Pin11
    const heater0 = new Gpio(5, {mode: Gpio.OUTPUT}); //GPIO5 at Pin29
    fan0.pwmWrite(0);
    heater0.pwmWrite(0);
 
    const port = [fan0, heater0];
    return port;
  }

function openFan0(port){
    let dutyCycle = 255;
    port[0].pwmWrite(dutyCycle);
}

function closeFan0(port){
    let dutyCycle = 0;
    port[0].pwmWrite(dutyCycle);
}

function openHeater0(port){
    
    let dutyCycle = 255;
    port[1].pwmWrite(dutyCycle);
}

function closeHeater0(port){
   
    let dutyCycle = 0;
    port[1].pwmWrite(dutyCycle);
}

// export {setupGPIO, openFan0, openFan1, openHeater0, openHeater1, updateFan0, updateFan1, updateHeater0, updateHeater1};
module.exports = {setupGPIO, openFan0, openHeater0, closeFan0, closeHeater0};
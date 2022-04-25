var firebase = require( 'firebase/app' );
const { getDatabase, ref, onValue, set, update, push, child, get } = require('firebase/database');

// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUOj-jWraOJ7Y9zpem7vrkDWMrTuK_5C8",
  authDomain: "iotsmartheater.firebaseapp.com",
  databaseURL: "https://iotsmartheater-default-rtdb.firebaseio.com",
  projectId: "iotsmartheater",
  storageBucket: "iotsmartheater.appspot.com",
  messagingSenderId: "137832041131",
  appId: "1:137832041131:web:8882e8045e1225c8a805ee",
  measurementId: "G-BRTJGT85QF"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const database = getDatabase(app);





const Gpio = require('pigpio').Gpio;

const fan = new Gpio(17, {mode: Gpio.OUTPUT});

let dutyCycle = 255;

setInterval(() => {
  fan.pwmWrite(dutyCycle);

//   dutyCycle += 250;
// // dutyCycle = prompt("duty cycle:");
//   if (dutyCycle > 255) {
//     dutyCycle = 0;
//   }
  const starCountRef = ref(database, 'update_temp');
  onValue(starCountRef, (snapshot) => {
    const temp_update = snapshot.val();
    if (temp_update){
      dutyCycle = 100;
    }
    else {
      dutyCycle = 255;
    }
   
  });

}, 4000);



// fan.pwmWrite(dutyCycle);

// await new Promise(resolve => setTimeout(resolve, 1000));

// fan.pwmWrite(100);



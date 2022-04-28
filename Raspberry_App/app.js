// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
const {setupGPIO, openFan0, openFan1, openHeater0, openHeater1, updateFan0, updateFan1, updateHeater0, updateHeater1} = require('./gpio_pwm_total.js');


var firebase = require( 'firebase/app' );
var nodeimu = require( '@trbll/nodeimu' );
var IMU = new nodeimu.IMU( );
var sense = require( '@trbll/sense-hat-led' );
var util = require('util');
const { getDatabase, ref, onValue, set, update, push, child, get } = require('firebase/database');
//var temp_read = 0;

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
const app =  firebase.initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const database = getDatabase(app);

function dispAccel() {
  var tic = new Date();
  var data = IMU.getValueSync();
  var toc = new Date();

  var str2 = "";
  if (data.temperature) {
    str2 = util.format(' %s %s', data.temperature.toFixed(4));  
  }
  update(ref(database), {
    "actual_temp": data.temperature
  });

  writeNewPost(data);
  run_heater_fan();


  setTimeout(dispAccel, 1000 - (toc - tic));


}

function writeNewPost(data) {
  const database = getDatabase(app);
  const now = new Date();

  // update(ref(database), {
  //     "temperature": data.temperature
  // });

  console.log("Current Temperature: " + data.temperature + "\nHour: " + now.getHours() + ", Minute:" + now.getMinutes());
}



function run_heater_fan(){
  var temperature_read;
  var time_read;
  var data = IMU.getValueSync();

  // if (temp_read == data.temperature)
  // {
  //   update(ref(database), {
  //     "update_notif": true
  //   });
  // }

  const starCountRef0 = ref(database, 'stop');
    onValue(starCountRef0, (snapshot) => {
        const temp_stop = snapshot.val();
        if (temp_stop)
        {
          console.log("turn off");
          update(ref(database), {
            "stop": false
          });
        }

      });




  const starCountRef = ref(database, 'update_temp');
    onValue(starCountRef, (snapshot) => {
        const temp_update = snapshot.val();
        
        // if temp_updatet is True
        if (temp_update){
          get(child(ref(database), `temperature`)).then((snapshot) => {
            if (snapshot.exists()) 
            {
              const temparature = snapshot.val();
              temperature_read = temparature;
              // temp_read = temperature_read;
              // var db = app.database();
              // var time_ref = db.ref("time_Goal");
              // //var time_ref = firebase.database().ref("time_Goal");
              // time_ref.once('value',(snap)=>
              // {
              //   const time_Goal = snapshot.val();
              //   "use strict";
              //   console.log("Desired Hour: " + time_Goal["hour"] + "\nDesired Minute: " + time_Goal["minute"]);
              //   if ((time_Goal["hour"] < now.getHours()) || (time_Goal["hour"] == now.getHours() && time_Goal["minute"] < now.getMinutes()) || database['temperature'] == data.temperature)
              //   {
              //     temp_update = false;
              //     console.log("Invalid Time or Temperature");
              //   } else
              //   {
              //     if (((time_Goal["hour"] == now.getHours() + 1) && (time_Goal["minute"] == now.getMinutes() - 54)) || (time_Goal["hour"] == now.getHours() && (time_Goal["minute"] == now.getMinutes() + 5)))
              //     {
              //       if (database['temperature'] > data.temperature)
              //       {
              //         //Activate Heater 
              //       }else
              //       {
              //         openFan0();
              //       }
              //       temp_update = false;
              //     }
              //   }
              // });
            }      
          });

          get(child(ref(database), `time_Goal`)).then((snapshot) => {
            if (snapshot.exists()) {
              const time_Goal = snapshot.val();
              time_read = time_Goal;
            }
          });

          update(ref(database), {
            "update_temp": false
          });
          
          setTimeout(()=>{ make_action(temperature_read, time_read); }, 80);
            

        }
    });
}

function make_action(temperature_read, time_read){
  const now = new Date();
  var data = IMU.getValueSync();
  console.log(data.temperature);
  if ((time_read["hour"] > now.getHours()) && (time_read["hour"] == now.getHours() && time_read["minute"] > now.getMinutes()) || temperature_read != data.temperature)
  {
    if (((time_read["hour"] == now.getHours() + 1) && (time_read["minute"] == now.getMinutes() - 54)) || (time_read["hour"] == now.getHours() && (now.getMinutes() - time_read["minute"] <= 5)))
    {
      if (temperature_read > data.temperature)
      {
        console.log("heater")
        if (temperature_read <= data.temperature)
        {
          update(ref(database), {
            "update_notif": true
          });
        }
      }else
      {
        console.log("cooler");
        if (temperature_read >= data.temperature)
        {
          update(ref(database), {
            "update_notif": true
          });
        }
        // openFan0();
      }
      temp_update = false;
    }
  }
  else
  {
    temp_update = false;
    console.log("Invalid Time or Temperature");
  }
    
}




//TODO: Implement function to detect when the temp/time values change and read them. Control heater based on temp/time vlaues

dispAccel();

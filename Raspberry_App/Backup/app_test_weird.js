const {setupGPIO, openFan0, openHeater0, closeFan0, closeHeater0} = require('./pwm_export_test.js');
//setupGPIO;
var firebase = require( 'firebase/app' );
var nodeimu = require( '@trbll/nodeimu' );
var IMU = new nodeimu.IMU( );
var sense = require( '@trbll/sense-hat-led' );
var util = require('util');
const { getDatabase, ref, onValue, set, update, push, child, get } = require('firebase/database');


var desired_Tempread;
var actual_Tempread;
var heat_or_cool = -1;
var print_counter = 0;


// Firebase configuration
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
const database = getDatabase(app);

//setup GPIO at the beginning
const port = setupGPIO();

function dispAccel() {
  var tic = new Date();
  var data = IMU.getValueSync();
  var toc = new Date();

  update(ref(database), {
    "actual_temp": data.temperature
  });
  actual_Tempread = data.temperature;



  // check temperature diff and make action
  if (heat_or_cool == 1)
  { //open fan
    console.log("cooler");
    openFan0(port);
    if (desired_Tempread > actual_Tempread)
    {
      console.log("cooled");
      update(ref(database), {
        "update_notif": true
      });
      heat_or_cool = -2;
    }
  } else if (heat_or_cool == 0)
  { //open heater
    console.log("heater");
    openHeater0(port);

    if (desired_Tempread <= actual_Tempread){
      console.log("heated");
      update(ref(database), {
        "update_notif": true
      });
      heat_or_cool = -2;
    }
  } else if (heat_or_cool == -2){   // keep temp at desired temp
    // var cancelled = false;
    if (desired_Tempread <= actual_Tempread){
        openFan0(port);
        // heater off
        closeHeater0(port);

      
    } else if (desired_Tempread > actual_Tempread){
      // heater on, fan off
        openHeater0(port);
        closeFan0(port);

    }
  }

  print_counter++;
  if (print_counter == 5){
    writeNewPost(data);
    print_counter = 0;
  }
  
  run_heater_fan(data);


  setTimeout(dispAccel, 200 - (toc - tic));


}


function writeNewPost(data) {
  const database = getDatabase(app);
  const now = new Date();
  console.log("Current Temperature: " + data.temperature);
}



function run_heater_fan(data){
  var temperature_read;
  var time_read;

  const starCountRef0 = ref(database, 'stop');
    onValue(starCountRef0, (snapshot) => {
        const temp_stop = snapshot.val();
        if (temp_stop)
        {
          console.log("turn off");
          update(ref(database), {
            "stop": false
          });
          heat_or_cool = -1;  // standby 
          closeFan0(port);
          closeHeater0(port);
        }
      });




  const starCountRef = ref(database, 'update_temp');
    onValue(starCountRef, (snapshot) => {
        const temp_update = snapshot.val();
        
        // if temp_update is True
        if (temp_update){
          get(child(ref(database), `temperature`)).then((snapshot) => {
            if (snapshot.exists()) 
            {
              const temparature = snapshot.val();
              temperature_read = temparature;
              desired_Tempread = temperature_read;
            }      
          });

          get(child(ref(database), `time_Goal`)).then((snapshot) => {
            if (snapshot.exists()) {
              const time_Goal = snapshot.val();
              time_read = time_Goal;
            }
          });
          
          setTimeout(()=>{ make_action(temperature_read, time_read, data); }, 2000);
            

        }
    });
}

function make_action(temperature_read, time_read, data){
  var time_Needed = (data.temperature - temperature_read) + 3;
  const now = new Date();
  if (((time_read["hour"] > now.getHours() && time_read["minute"] < now.getMinutes()) || (time_read["hour"] == now.getHours() && time_read["minute"] > now.getMinutes())) && temperature_read != data.temperature)
  {
    if (((time_read["hour"] == now.getHours() + 1) && (now.getMinutes() - time_read["minute"] >= (59 - time_Needed))) || (time_read["hour"] == now.getHours() && (time_read["minute"] - now.getMinutes() <= time_Needed)))
    {
      if (temperature_read > data.temperature)
      {
        console.log("heater");
        openHeater0(port);
        heat_or_cool = 0;
        update(ref(database), {
          "update_temp": false
        });
      }else
      {
        heat_or_cool = 1;
        openFan0(port);
        update(ref(database), {
          "update_temp": false
        });
        console.log("cooler");
        
      }

    }
  }
  else
  {
    update(ref(database), {
      "update_temp": false
    });
    temp_update = false;
    console.log("Invalid Time or Temperature");
  }
    
}


dispAccel();

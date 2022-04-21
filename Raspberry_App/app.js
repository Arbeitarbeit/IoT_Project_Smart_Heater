// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

function dispAccel() {
  var tic = new Date();
  var data = IMU.getValueSync();
  var toc = new Date();

  var str2 = "";
  if (data.temperature) {
    str2 = util.format(' %s %s', data.temperature.toFixed(4));  
  }

  writeNewPost(data);

}

function writeNewPost(data) {
  const database = getDatabase(app);
  const now = new Date();

  update(ref(database), {
      "temperature": data.temperature,
      "hour": now.getHours(),
      "minute": now.getMinutes() 

  });

  console.log("Current Temperature: " + data.temperature + "\nHour: " + now.getHours() + ", Minute:" + now.getMinutes());
}




const starCountRef = ref(database, 'update_temp');
    onValue(starCountRef, (snapshot) => {
        const temp_update = snapshot.val();

        // if update_light is True
        if (temp_update){

         

        // read in the rest of light data and process
            get(child(ref(database), `temperature`)).then((snapshot) => {
                if (snapshot.exists()) {
                  firebase.database().ref('time_Goal').once('value',(snap)=>{
                    const time_Goal = snapshot.val();
                    console.log("Desired Hour: " + time_Goal["hour"] + "\nDesired Minute: " + time_Goal["minute"]);
                    {
                      if ((time_Goal["hour"] < now.getHours()) || (time_Goal["hour"] == now.getHours() && time_Goal["minute"] < now.getMinutes()) || database['temperature'] == data.temperature)
                      {
                        temp_update = false;
                        console.log("Invalid Time or Temperature");
                      }else
                      {
                        if (((time_Goal["hour"] == now.getHours() + 1) && (time_Goal["minute"] == now.getMinutes() - 54)) || (time_Goal["hour"] == now.getHours() && (time_Goal["minute"] == now.getMinutes() + 5)))
                        {
                          while (database['temperature'] != data.temperature)
                          {
                          if (database['temperature'] > data.temperature)
                          {
                            //Activate Heater 
                          }else{
                            //Activate Cooler
                          }
                          temp_update = false;
                        }
                      }
                    }
                  }
                });

                  
                  // clear LED before every update_light
                  //sense.clear();

                  //const RGB = snapshot.val();
                  "use strict";
                  //sense.setPixel(RGB["col"], RGB["row"], [RGB["r"], RGB["g"], RGB["b"]]);
                  //console.log("Pixel on Column " + RGB["col"] + " Row " + RGB["row"] + " changed to color [" + [RGB["r"], RGB["g"], RGB["b"]] + "]" + "\n\n");
                } else {
                console.log("No data available");
                }
                update(ref(database), {
                  "update_light": false,
                });
            }).catch((error) => {
                console.error(error);
            });
          };

    });





//TODO: Implement function to detect when the temp/time values change and read them. Control heater based on temp/time vlaues

dispAccel();
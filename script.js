/*
This is your site JavaScript code - you can add interactivity and carry out processing
- Initially the JS writes a message to the console, and moves a button you can add from the README
*/

// Print a message in the browser's dev tools console each time the page loads
// Use your menus or right-click / control-click and choose "Inspect" > "Console"
console.log("Hello 🌎");


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const { getDatabase, ref, onValue, set, update, push, child, get } = require('firebase/database');

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


const btn_confirm = document.getElementById("button"); // Get the button from the page
const time_input = document.getElementById("time_input");
const temp_input = document.getElementById("temp_input");
const notification = document.getElementById("notification");


const notifRef = ref(database, 'notif');
onValue(notifRef, (snapshot) => {
  const notif = snapshot.val();
  notification.innerHTML = notif;
});


// Detect clicks on the button
// if (btn) {
//   btn.onclick = function() {
//     // The JS works in conjunction with the 'dipped' code in style.css
//     btn.classList.toggle("dipped");
//   };
// }

// This is a single line JS comment
/*
This is a comment that can span multiple lines 
- use comments to make your own notes!
*/


btn_confirm.addEventListener("click", function(){    
  var time_confirmed = time_input.value;
  var temp_confirmed = temp_input.value;
  var time_array = time_confirmed.split(':');
  update(ref(database, 'time_Goal'), {
    "hour": time_array[0],
    "minute": time_array[1]
  });
  
  update(ref(database), {
    "temperature": temp_confirmed
  });
  
  //test
  temp_input.value = "222";
  
});
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
    var str2 = util.format(' %s %s', data.temperature.toFixed(4));  
  }

  writeNewPost(data);

}

function writeNewPost(data) {
  const database = getDatabase(app);

  update(ref(database), {
      "temperature": data.temperature,
  });

  console.log("Current Temperature: " + data.temperature);
}
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-analytics.js";
import { getDatabase, ref, set, get, child, update,remove } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";
const firebaseConfig = {
  apiKey: "AIzaSyDb4Iq3mlbWpmQ4R2d7v9X7iXdrFUU2a1c",
  authDomain: "class-8a08b.firebaseapp.com",
  projectId: "class-8a08b",
  storageBucket: "class-8a08b.firebasestorage.app",
  messagingSenderId: "934149070736",
  appId: "1:934149070736:web:c251d0c53cc5e267d01d15",
  measurementId: "G-HD0F9YVLCL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
var name  = document.getElementById("name");
var email = document.getElementById("email");
var password = document.getElementById("password");

var insertbtn = document.getElementById("insertbtn");
var deletebtn = document.getElementById("deletebtn");
var updatebtn = document.getElementById("updatebtn");
var selectbtn = document.getElementById("selectbtn");

function insertData() {
    alert("Data Inserted Successfully")
    set(ref(database, 'users/' + name.value), {
name: name.value,
email: email.value,
password: password.value

    }).then(() => {
        console.log("Data Inserted Successfully");
alert("Data Inserted Successfully")
    }).catch((error) => {
alert("Data Inserted Failed")
console.log("Data Inserted Failed");


    });
}
function selectdata() {
    const dbRef = ref(database);
    get(child(dbRef, "users/" + name.value)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
            alert("Data Selected Successfully")
            name.value = snapshot.val().name;
            email.value = snapshot.val().email;
            password.value = snapshot.val().password;
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}




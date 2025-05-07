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
insertbtn.addEventListener("click", insertData);
function deleteData() {
    remove(ref(database, 'users/' + name.value)).then(() => {
        console.log("Data Deleted Successfully");
        alert("Data Deleted Successfully")
    }).catch((error) => {
        console.log("Data Deleted Failed");
        alert("Data Deleted Failed")
    });
}
deletebtn.addEventListener("click", deleteData);



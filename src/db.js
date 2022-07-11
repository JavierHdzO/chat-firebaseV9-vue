// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyBa5CmOzilfV5Lsl3xZZkYaEC5khgOFvYE",
  authDomain: "chat-firebase-vue-aa095.firebaseapp.com",
  databaseURL: "https://chat-firebase-vue-aa095-default-rtdb.firebaseio.com",
  projectId: "chat-firebase-vue-aa095",
  storageBucket: "chat-firebase-vue-aa095.appspot.com",
  messagingSenderId: "776638502952",
  appId: "1:776638502952:web:618d6709c1f4ca43d8fd1d",
  databaseURL: "https://chat-firebase-vue-aa095-default-rtdb.firebaseio.com/",
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


export default database
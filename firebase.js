// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMCPbpms9TJCYiFGVkvZMEAGOOMAgcucg",
  authDomain: "talktolisten-3f5db.firebaseapp.com",
  projectId: "talktolisten-3f5db",
  storageBucket: "talktolisten-3f5db.appspot.com",
  messagingSenderId: "39131602680",
  appId: "1:39131602680:web:09f76b882f81d9f8b2a50d",
  measurementId: "G-8DXN41XVVN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

export default auth;

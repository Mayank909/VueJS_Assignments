// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZ40NyppNdCQzJb0ruPKTW1o0CjMac2SI",
  authDomain: "upload-image-file-7d384.firebaseapp.com",
  projectId: "upload-image-file-7d384",
  storageBucket: "upload-image-file-7d384.appspot.com",
  messagingSenderId: "1024722483509",
  appId: "1:1024722483509:web:2f9ff10057f55265eef47c",
  measurementId: "G-NSK1P611L3"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db};
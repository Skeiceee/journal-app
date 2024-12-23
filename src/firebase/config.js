// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbhwvlCi_6QqjeKUmU9KnleEYGIlA98Oo",
  authDomain: "react-courses-d2361.firebaseapp.com",
  projectId: "react-courses-d2361",
  storageBucket: "react-courses-d2361.firebasestorage.app",
  messagingSenderId: "927261273529",
  appId: "1:927261273529:web:a6fb7760b38f0f5613da68"
};

// Initialize Firebase
const FirebaseApp = initializeApp( firebaseConfig );

export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );
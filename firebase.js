// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCHdFIcG9M_PC0WV9yi2XlmiuS3AQWLziQ",
    authDomain: "instagram-2-92b9c.firebaseapp.com",
    projectId: "instagram-2-92b9c",
    storageBucket: "instagram-2-92b9c.appspot.com",
    messagingSenderId: "962292631447",
    appId: "1:962292631447:web:5fc83f5b0de52d4f9666d2"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
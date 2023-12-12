import { getApps, getApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDB5XYoTFDXVsY4lZFdtCduYuuS4srGMuA",
    authDomain: "giphygifer.firebaseapp.com",
    projectId: "giphygifer",
    storageBucket: "giphygifer.appspot.com",
    messagingSenderId: "951040302535",
    appId: "1:951040302535:web:d2c8fea9219fc30ba70de2"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth();

export { app, auth }
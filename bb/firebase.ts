import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAXHa89wxHeKslgYNFoL_q9E297cUwPSh8",
    authDomain: "pdfchat-9e963.firebaseapp.com",
    projectId: "pdfchat-9e963",
    storageBucket: "pdfchat-9e963.appspot.com",
    messagingSenderId: "251165605066",
    appId: "1:251165605066:web:e0b1b7287b42e614d3c833",
    measurementId: "G-4Y86E6GHC1"
};

// Initialize the app if no apps are initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
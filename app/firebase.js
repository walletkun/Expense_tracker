// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:"AIzaSyDoVx8-huZDE6cs-cJH8XkNSkhHT5QRrWQ",//process.env.NEXT_FIREBASE_API_KEY,
  authDomain: "inventory-st.firebaseapp.com",//process.env.NEXT_FIREBASE_AUTH_DOMAIN,
  projectId: "inventory-st",//process.env.NEXT_FIREBASE_PROJECT_ID,
  storageBucket:"inventory-st.appspot.com",//process.env.NEXT_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: "947299333338",//process.env.NEXT_FIREBASE_MESSAGING_SENDER_ID,
  appId: "1:947299333338:web:bb42c3500e53911bd8a1e3",//process.env.NEXT_FIREBASE_APP_ID,
  measurementId: "G-X62308XHSH"//process.env.NEXT_FIREBASE_MEASUREMENT_ID
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db , auth};

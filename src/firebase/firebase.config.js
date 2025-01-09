// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHePI77M6rJLb8BM5ldCeMWIhWS4CMkQc",
  authDomain: "battemplates-13966.firebaseapp.com",
  projectId: "battemplates-13966",
  storageBucket: "battemplates-13966.firebasestorage.app",
  messagingSenderId: "129627838289",
  appId: "1:129627838289:web:4f8a8ea2eadfd27b94e570",
  measurementId: "G-4XLCX7N3V4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyBllAJtSl-AH1dUPRxziBWfOCbcqAeo_lo",
   authDomain: "meal-mate-6b1a7.firebaseapp.com",
   projectId: "meal-mate-6b1a7",
   storageBucket: "meal-mate-6b1a7.appspot.com",
   messagingSenderId: "1078143116372",
   appId: "1:1078143116372:web:8fd43e3b6a587b3a62b9c1",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

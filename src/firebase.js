// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBi0jrzNJJ9sxGjCmFalZzS2muwMfg_xos",
  authDomain: "todo-nub.firebaseapp.com",
  projectId: "todo-nub",
  storageBucket: "todo-nub.appspot.com",
  messagingSenderId: "236642026449",
  appId: "1:236642026449:web:5c10af283bda5ee00356f0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

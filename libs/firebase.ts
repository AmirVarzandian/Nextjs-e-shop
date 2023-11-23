// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVb90NZE3rWArDLVFBn5aDMr9oagJugzk",
  authDomain: "e-shop-vid-cd833.firebaseapp.com",
  projectId: "e-shop-vid-cd833",
  storageBucket: "e-shop-vid-cd833.appspot.com",
  messagingSenderId: "599906474629",
  appId: "1:599906474629:web:469e7c0391dae3e537a7ec"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLOMPU0eDrYDsOX-Yo3grx_8EBdtGatIw",
  authDomain: "ost-q-bix.firebaseapp.com",
  projectId: "ost-q-bix",
  storageBucket: "ost-q-bix.appspot.com",
  messagingSenderId: "966370908496",
  appId: "1:966370908496:web:092f597254009d01687455",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;

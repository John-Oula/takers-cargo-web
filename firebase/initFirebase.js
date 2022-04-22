// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getFirestore} from  'firebase/firestore'
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const clientCredentials = {
  apiKey: "AIzaSyABWGhE9MFRwT3b0ZuY25BArWd_KqvTbAI",
  authDomain: "takers-cargo.firebaseapp.com",
  projectId: "takers-cargo",
  storageBucket: "takers-cargo.appspot.com",
  messagingSenderId: "495360546641",
  appId: "1:495360546641:web:671ec7306f7b4281c5a570",
  measurementId: "G-FPZPC725L6"
};

const app = initializeApp(clientCredentials)
const db = getFirestore(app)
const storage =  getStorage(app)

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
export {db,auth,app,storage}
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAVKW15oSTY4PgQR-wTZ6eWgrqSXD-kWvI",
  authDomain: "react-firebase-ff004.firebaseapp.com",
  projectId: "react-firebase-ff004",
  storageBucket: "react-firebase-ff004.appspot.com",
  messagingSenderId: "986874089988",
  appId: "1:986874089988:web:7da11342ca913f61e05b51"
};


const app = initializeApp(firebaseConfig);

export const auth=getAuth(app)
export const db = getFirestore(app);
export const storage=getStorage(app);
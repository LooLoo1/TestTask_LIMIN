import { initializeApp } from "firebase/app";
import {getAuth, signOut} from "firebase/auth"
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAbNVJve_gpXxA2vy-iLvlV2jSIroYopJ4",
  authDomain: "testtask-362ed.firebaseapp.com",
  projectId: "testtask-362ed",
  storageBucket: "testtask-362ed.appspot.com",
  messagingSenderId: "815473191467",
  appId: "1:815473191467:web:94972b43f3871b1e93986e"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth(app)

export const logout = () => {
	localStorage.removeItem('user')
	signOut(auth)
 }
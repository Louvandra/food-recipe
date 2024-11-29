// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"

import { getDatabase } from "firebase/database"
import { getStorage } from "firebase/storage"
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  signOut,
} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyBnmauRGU0f741D0B6ogZKWGWVq3w-xpxA",
  authDomain: "fb-crud-93039.firebaseapp.com",
  databaseURL: "https://fb-crud-93039-default-rtdb.firebaseio.com",
  projectId: "fb-crud-93039",
  storageBucket: "fb-crud-93039.appspot.com",
  messagingSenderId: "892925279811",
  appId: "1:892925279811:web:7528431bf56f83146c5ef6",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getDatabase(app)
const storage = getStorage(app)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()
export {
  db,
  auth,
  storage,
  googleProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  signOut,
}

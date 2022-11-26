import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDzPmPf5FocGqIZAHjd4Rzd1BQt5EzkB-0",
  authDomain: "se3316-lab4-db.firebaseapp.com",
  projectId: "se3316-lab4-db",
  storageBucket: "se3316-lab4-db.appspot.com",
  messagingSenderId: "1005909444403",
  appId: "1:1005909444403:web:31672e2b404e5b5cca6046",
};

const firebaseApp = initializeApp(firebaseConfig);

export const fireDb = getFirestore();

export const auth = getAuth();

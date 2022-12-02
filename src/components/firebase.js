import { initializeApp } from "firebase/app";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfpkC1oknEVR51YhLDoDswIvRxsgt5B30",
  authDomain: "se3316-lab4-e979f.firebaseapp.com",
  projectId: "se3316-lab4-e979f",
  storageBucket: "se3316-lab4-e979f.appspot.com",
  messagingSenderId: "161946395327",
  appId: "1:161946395327:web:94cb7824ff35e02924dc0a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const fireDb = getFirestore();

export const auth = getAuth();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(fireDb, "users", userAuth.uid);
  //console.log(userDocRef);

  //taking the snapshot of user to compare later (like a data)
  const userSnapshot = await getDoc(userDocRef);
  //console.log(userSnapshot);
  //console.log(userSnapshot.exists());

  //adding the user to the firebase so we can track who is signing up
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user in the databse", error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const passwordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link has been sent");
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};

export const signOutUser = async () => {
  await signOut(auth);
  alert("Successfully signed out");
};

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

export default fireDb;

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';


const config = {
  apiKey: "AIzaSyBvCOYFzpfccqJdYQAuerlT3AhqYfxOEYg",
  authDomain: "react-shopping-f6be3.firebaseapp.com",
  projectId: "react-shopping-f6be3",
  storageBucket: "react-shopping-f6be3.appspot.com",
  messagingSenderId: "489257229893",
  appId: "1:489257229893:web:31cda60f74fd487d85cd2c",
  measurementId: "G-3KE622YRRZ"
};

firebase.initializeApp(config);

export const auth = firebase.auth(); // To use anything related to 'auth()'
export const firestore = firebase.firestore();

// Give access to the new 'GoogleAuthProvider' class from the 'auth' lib
const provider = new firebase.auth.GoogleAuthProvider(); 

// Trigger the google popup whenever we use this GoogleAuthProvider for 'authentication' and 'sign in'
provider.setCustomParameters({ prompt: 'select_account'});

// signInWithPopup takes 'provider' we made, but it takes for many types of popup (Google, or Twitter...)
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
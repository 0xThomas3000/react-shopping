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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) 
    return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get(); // To figure out whether there's authenticated data obj there?
 
  // If 'snapShot' doesn't exist, create new actual data obj and document by 'DocumentReference' in that place
  if (!snapShot.exists) { 
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch(error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
}

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
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAeNuVfrD2oLjeBjcCM-i28OZ7ourIjB_U",
  authDomain: "ecommerce-reactjs-fireba-be24e.firebaseapp.com",
  projectId: "ecommerce-reactjs-fireba-be24e",
  storageBucket: "ecommerce-reactjs-fireba-be24e.appspot.com",
  messagingSenderId: "441025649690",
  appId: "1:441025649690:web:071636dbd16d0cecd905a3",
  measurementId: "G-RMNMR7NXE7",
  databaseURL:"https://ecommerce-reactjs-fireba-be24e-default-rtdb.firebaseio.com"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {

  if(!userAuth) return

  const userRef = firestore.doc(`users/${userAuth.uid}`)
  const snapShot = await userRef.get()
  
  if(snapShot.exists === false){
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try{
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error){
      console.log('error creating user', error.message)
    }
  }
  return userRef;

}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
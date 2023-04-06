import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCDTxCrgB0cdp_XXEMoXQ4XALThj_Ly0RU",
    authDomain: "collegeapp-6ca8e.firebaseapp.com",
    projectId: "collegeapp-6ca8e",
    storageBucket: "collegeapp-6ca8e.appspot.com",
    messagingSenderId: "364076085682",
    appId: "1:364076085682:web:1e25d63da2ffee726bb4ab"
  };

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
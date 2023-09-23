import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCN9utZEiH6dLxvIF3rDp4LXGglW-DU3no",
  authDomain: "movies-app-2caec.firebaseapp.com",
  projectId: "movies-app-2caec",
  storageBucket: "movies-app-2caec.appspot.com",
  messagingSenderId: "580163859818",
  appId: "1:580163859818:web:8154117b805f6533446113",
  measurementId: "G-Q0R6YN1WC6"
};

// Initialize Firebase
const firebaseApp=firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };
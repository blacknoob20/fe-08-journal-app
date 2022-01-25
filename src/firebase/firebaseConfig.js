// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAJ9h5xJJ1NY8vMpaO_XrA11OYMNC9HC6U',
  authDomain: 'react-apps-cursos-e57bc.firebaseapp.com',
  projectId: 'react-apps-cursos-e57bc',
  storageBucket: 'react-apps-cursos-e57bc.appspot.com',
  messagingSenderId: '239300112296',
  appId: '1:239300112296:web:cca9cd20e352ece91a379d'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const googleAuthProvider = new GoogleAuthProvider();

export{
    db,
    googleAuthProvider,
    app
}
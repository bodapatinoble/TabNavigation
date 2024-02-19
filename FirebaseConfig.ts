// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import {getAuth} from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBcmoSwOjZih9Yds2yOo1phEvFnSTsD3So',
  authDomain: 'rnapp-55bc7.firebaseapp.com',
  projectId: 'rnapp-55bc7',
  storageBucket: 'rnapp-55bc7.appspot.com',
  messagingSenderId: '637385565597',
  appId: '1:637385565597:web:7c98b2a284b5feb4a1fb74',
  measurementId: 'G-E5BDHE16KV',
};

// Initialize Firebase
export const Firebase_App = initializeApp(firebaseConfig);
export const Firebase_Auth = getAuth(Firebase_App);
export const Firebase_DB = getFirestore(Firebase_App);
export {collection, addDoc, getDocs, doc, getDoc};

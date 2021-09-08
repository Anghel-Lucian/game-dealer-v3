// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBj53lWcC1ISxb9-WDggm9VwqLmb8CsLdY',
  authDomain: 'game-dealer-ef509.firebaseapp.com',
  databaseURL:
    'https://game-dealer-ef509-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'game-dealer-ef509',
  storageBucket: 'game-dealer-ef509.appspot.com',
  messagingSenderId: '786463362565',
  appId: '1:786463362565:web:e4210cdd5ed897270d966c',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

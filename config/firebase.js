// Import the functions you need from the SDKs you need
import * as firebase from 'firebase';
import { firebaseKeys } from '../firebaseConfig.js';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: firebaseKeys.API_KEY,
  authDomain: firebaseKeys.AUTH_DOMAIN,
  projectId: firebaseKeys.PROJECT_ID,
  storageBucket: firebaseKeys.STORAGE_BUCKET,
  messagingSenderId: firebaseKeys.MESSAGING_SENDER_ID,
  appId: firebaseKeys.APP_ID,
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app;
}
const auth = firebase.auth();
export { auth };

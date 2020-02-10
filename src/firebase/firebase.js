import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAO3f-YAKCeZUKsEGrzIrTp5mu67tICYNE',
  authDomain: 'social-dev-dcf2d.firebaseapp.com',
  databaseURL: 'https://social-dev-dcf2d.firebaseio.com',
  projectId: 'social-dev-dcf2d',
  storageBucket: 'social-dev-dcf2d.appspot.com',
  messagingSenderId: '820404008894',
  appId: '1:820404008894:web:0e0de6d5f3f87c214cabef',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export default firebase;

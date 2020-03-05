import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
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
export const storage = firebase.storage();
/* eslint-disable */
export const getUserDoc = async uid => {
  if (!uid) return null;
  try {
    const userDoc = await firestore
      .collection('users')
      .doc(uid)
      .get();
    return { uid, ...userDoc.data() };
  } catch (error) {
    console.log('Error with firebase getUserDoc :OOOO!!!!', error);
  }
};

export const createUserDoc = async (user, userName) => {
  const userRef = await firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  window.snapshot = snapshot.exists;
  if (!snapshot.exists) {
    console.log(user);
    const { displayName, email, photoURL } = user;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        uid,
        email,
        photoURL,
        createdAt,
        userName,
      });
    } catch (error) {
      alert('Error with firebase oh no :O!!!!!', error);
    }
  }
  return getUserDoc(user.uid);
};
window.firebase = firebase;

export default firebase;

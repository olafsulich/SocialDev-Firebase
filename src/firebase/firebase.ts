import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import defaultPic from '../assets/default-pic.png';

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
export const getUserDoc = async (uid: string | undefined) => {
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

export const createUserDoc = async (user: any, userName?: string) => {
  const userRef = await firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { uid, email } = user;
    const createdAt = new Date();
    try {
      await userRef.set({
        uid,
        email,
        photoURL: defaultPic,
        createdAt,
        userName: userName,
      });
    } catch (error) {
      console.log(error);
    }
  }
  return getUserDoc(user.uid);
};

export default firebase;

window.firebase = firebase;

import { firestore } from './firebase';

export const notificationsRef = firestore.collection('notifications');
export const postsRef = firestore.collection('posts');
export const roomsRef = firestore.collection('rooms');
export const usersRef = firestore.collection('users');

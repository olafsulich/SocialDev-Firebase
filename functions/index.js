const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const firestore = admin.firestore();
const notificationTime = admin.firestore.FieldValue.serverTimestamp();

// prettier-ignore
const createNotification = (notification => {
  return admin
    .firestore()
    .collection('notifications')
    .add(notification)
});

exports.postCreated = functions.firestore.document('posts/{postId}').onCreate(doc => {
  const id = doc.id;
  const {
    user: { name, photoURL },
  } = doc.data();
  const notification = {
    content: 'Added new post',
    userName: `${name}`,
    photoURL: `${photoURL}`,
    createdAt: notificationTime,
    id,
    type: 'post',
  };

  return createNotification(notification);
});

exports.newUserJoined = functions.auth.user().onCreate(user => {
  return admin
    .firestore()
    .collection('users')
    .doc(user.uid)
    .get()
    .then(doc => {
      const { userName, photoURL } = doc.data();

      const notification = {
        content: 'Joined to Social Dev community',
        userName: `${userName}`,
        photoURL: `${photoURL}`,
        createdAt: notificationTime,
        type: 'user',
      };
      return createNotification(notification);
    });
});

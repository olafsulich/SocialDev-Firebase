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
    .then(doc => console.log('create notific', doc));
});

exports.postCreated = functions.firestore.document('posts/{postId}').onCreate(doc => {
  const post = doc.data();
  const notification = {
    content: 'Added new post',
    userName: `${post.user.name}`,
    createdAt: notificationTime,
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
      const { userName } = doc.data();

      const notification = {
        content: 'Joined to Social Dev community',
        userName,
        createdAt: notificationTime,
      };
      return createNotification(notification);
    });
});

const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

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
    time: admin.firestore.FieldValue.serverTimestamp(),
  };

  return createNotification(notification);
});

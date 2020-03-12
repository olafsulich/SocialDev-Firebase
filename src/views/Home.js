import React, { useState, lazy, Suspense } from 'react';
import AddPost from '../components/molecules/AddPost';
import useUser from '../hooks/useUser';
import useSubscription from '../hooks/useSubscription';
import { postsRef } from '../firebase/firestoreRefs';
import PageTemplate from '../templates/PageTemplate';
import { firestore } from '../firebase/firebase';
import Loader from '../components/atoms/Loader/Loader';

const PostsList = lazy(() => import('../components/molecules/PostsList'));

const Home = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState([]);

  const postRef = firestore.collection('posts');

  useUser(setCurrentUser);
  useSubscription(postRef, setPosts, 'desc');

  const handleCreate = postToAdd => {
    postsRef.add(postToAdd);
    setPosts([postToAdd, ...posts]);
  };

  return (
    <PageTemplate>
      <AddPost user={currentUser} handleCreate={handleCreate} />
      <Suspense fallback={<Loader />}>
        <PostsList posts={posts} />
      </Suspense>
    </PageTemplate>
  );
};

export default Home;

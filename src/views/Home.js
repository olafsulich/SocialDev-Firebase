import React, { useState, useEffect } from 'react';
import AddPost from '../components/molecules/AddPost';
import useUser from '../hooks/useUser';
import useSubscription from '../hooks/useSubscription';
import { postsRef } from '../firebase/firestoreRefs';
import PostsList from '../components/molecules/PostsList';
import toggleState from '../utils/toggleState';
import PageTemplate from '../templates/PageTemplate';

const Home = () => {
  const [SidebarOpen, setSidebarOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useUser(setCurrentUser, currentUser);
  useSubscription(postsRef, setPosts, 'desc');

  const handleCreate = postToAdd => {
    postsRef.add(postToAdd);
    setPosts([postToAdd, ...posts]);
  };

  return (
    <PageTemplate>
      <AddPost
        user={currentUser}
        handleAddPost={() => toggleState(setSidebarOpen)}
        handleCreate={handleCreate}
      />
      <PostsList posts={posts} />
    </PageTemplate>
  );
};

export default Home;

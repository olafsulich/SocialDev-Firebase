import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { firestore } from '../firebase/firebase';
import Navigation from '../components/organisms/Navigation';
import Button from '../components/atoms/Button/Button';
import PlusIcon from '../assets/plus.svg';
import Post from '../components/molecules/Post';
import AddPost from '../components/molecules/AddPost';
import GridTemplate from '../templates/GridTemplate';
import useUser from '../hooks/useUser';

const StyledWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  @media (min-width: 650px) {
    display: grid;
    grid-template-columns: 0.5fr 3fr;
    grid-column-gap: 3rem;
  }
`;

const Home = () => {
  const [SidebarOpen, setSidebarOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState([]);
  window.posts = posts;
  useUser(setCurrentUser);

  const handleSidebarOpen = () => setSidebarOpen(prevState => !prevState);

  const handleCreate = postToAdd => {
    firestore.collection('posts').add(postToAdd);
    setPosts([postToAdd, ...posts]);
  };
  const handleRemove = id => {
    firestore
      .collection('posts')
      .doc(id)
      .delete();
  };
  useEffect(() => {
    const unsubscribe = firestore
      .collection('posts')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const newPosts = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(newPosts);
      });
    return () => unsubscribe();
  }, []);

  return (
    <StyledWrapper>
      <Navigation />
      <GridTemplate>
        {posts.map(({ user, title, content, likes, comments, id }) => (
          <Post
            key={title}
            user={user}
            title={title}
            content={content}
            likes={likes}
            comments={comments}
            onRemove={handleRemove}
            id={id}
          />
        ))}
      </GridTemplate>
      <Button icon={PlusIcon} add onClick={handleSidebarOpen} />
      <AddPost
        isVisible={SidebarOpen}
        handleAddPost={handleSidebarOpen}
        handleCreate={handleCreate}
        user={currentUser}
      />
    </StyledWrapper>
  );
};

export default Home;

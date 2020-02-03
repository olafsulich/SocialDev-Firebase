import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { firestore } from '../firebase/firebase';
import Navigation from '../components/organisms/Navigation';
import Button from '../components/atoms/Button/Button';
import PlusIcon from '../assets/plus.svg';
import Comment from '../components/molecules/Comment';
import Sidebar from '../components/molecules/Sidebar';
import data from '../data';

const StyledWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  @media (min-width: 650px) {
    display: grid;
    grid-template-columns: 0.5fr 3fr;
    grid-column-gap: 3rem;
  }
`;

const StyledGrid = styled.div`
  width: 100%;
  height: 85%;
  grid-column: 2/3;
  margin-top: 3rem;
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 5rem;
  align-items: center;
  justify-content: flex-start;
  padding: 1rem 2rem 0 2rem;
  margin-bottom: 10vh;
`;
const Home = () => {
  const [SidebarOpen, setSidebarOpen] = useState(false);
  const [posts, setPosts] = useState(data);
  const handleSidebarOpen = () => setSidebarOpen(prevState => !prevState);
  const handleCreate = post => setPosts([post, ...posts]);

  return (
    <StyledWrapper>
      <Navigation />
      <StyledGrid>
        {posts.map(({ author, title, url, content, likes, comments, id }) => (
          <Comment
            author={author}
            title={title}
            url={url}
            content={content}
            likes={likes}
            comments={comments}
            key={id}
          />
        ))}
      </StyledGrid>
      <Button icon={PlusIcon} add onClick={handleSidebarOpen} />
      <Sidebar
        isVisible={SidebarOpen}
        handleSidebar={handleSidebarOpen}
        handleCreate={handleCreate}
      />
    </StyledWrapper>
  );
};
export default Home;

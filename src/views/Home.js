import React, { useState } from 'react';
import styled from 'styled-components';
import Navigation from '../components/organisms/Navigation';
import Button from '../components/atoms/Button/Button';
import PlusIcon from '../assets/plus.svg';
import Comment from '../components/molecules/Comment';
import Sidebar from '../components/molecules/Sidebar';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
`;

const StyledWrapperDesktop = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-columns: 0.5fr 3fr;
`;

const StyledGrid = styled.div`
  width: 100%;
  height: 85%;
  overflow-y: scroll;
  margin-top: 3rem;
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 5rem;
  align-items: center;
  justify-content: flex-start;
  padding: 1rem 2rem 0 2rem;

  ::-webkit-scrollbar {
    display: none;
  }
`;
const Home = () => {
  const [SidebarOpen, setSidebarOpen] = useState(false);
  const [pageWidth, setPageWidth] = useState(window.innerWidth);

  const handleSidebarOpen = () => setSidebarOpen(prevState => !prevState);
  return (
    <>
      {pageWidth >= 650 ? (
        <StyledWrapperDesktop>
          <Navigation />
          <StyledGrid>
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
          </StyledGrid>
          <Button icon={PlusIcon} add onClick={handleSidebarOpen} />
          <Sidebar isVisible={SidebarOpen} handleSidebar={handleSidebarOpen} />
        </StyledWrapperDesktop>
      ) : (
        <StyledWrapper>
          <StyledGrid>
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
          </StyledGrid>
          <Navigation />
          <Button icon={PlusIcon} add onClick={handleSidebarOpen} />
          <Sidebar isVisible={SidebarOpen} handleSidebar={handleSidebarOpen} />
        </StyledWrapper>
      )}
    </>
  );
};
export default Home;

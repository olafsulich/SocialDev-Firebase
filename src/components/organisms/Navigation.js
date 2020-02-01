import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../atoms/Button/Button';
import HomeIcon from '../../assets/home.svg';
import ChatIcon from '../../assets/messages.svg';
import NotificationIcon from '../../assets/notifications.svg';
import UserIcon from '../../assets/user.svg';
import Heading from '../atoms/Heading/Heading';

const StyledWrapper = styled.aside`
  width: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 90%;
  border-top: 2px solid ${({ theme }) => theme.thirdaryColor};
`;

const StyledWrapperDesktop = styled.aside`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 5rem;
`;
const StyledIconsWrapper = styled.nav`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 1rem 1.5rem 0 1.5rem;
`;
const StyledIconsDesktop = styled.nav`
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem 1.5rem 0 1.5rem;
  margin-left: 2rem;
`;

const StyledHeading = styled(Heading)`
  margin-bottom: 1rem;
`;
const Navigation = () => {
  const [pageWidth, setPageWidth] = useState(window.innerWidth);
  console.log(pageWidth);
  return (
    <>
      {pageWidth >= 650 ? (
        <StyledWrapperDesktop>
          <StyledIconsDesktop>
            <StyledHeading active>Home</StyledHeading>
            <StyledHeading>Messenger</StyledHeading>
            <StyledHeading>Notifications</StyledHeading>
            <StyledHeading>Account</StyledHeading>
          </StyledIconsDesktop>
        </StyledWrapperDesktop>
      ) : (
        <StyledWrapper>
          <StyledIconsWrapper>
            <Button icon={HomeIcon} active />
            <Button icon={ChatIcon} />
            <Button icon={NotificationIcon} />
            <Button icon={UserIcon} />
          </StyledIconsWrapper>
        </StyledWrapper>
      )}
    </>
  );
};

export default Navigation;

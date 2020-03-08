import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import moment from 'moment';
import Navigation from '../components/organisms/Navigation';
import Button from '../components/atoms/Button/Button';
import GridTemplate from '../templates/GridTemplate';
import PensilIcon from '../assets/pensil.svg';
import Heading from '../components/atoms/Heading/Heading';
import Text from '../components/atoms/Text/Text';
import UserProfileIcon from '../assets/userProfile.svg';
import EmailIcon from '../assets/email.svg';
import JoinedAtIcon from '../assets/joined.svg';
import { auth } from '../firebase/firebase';
import EditProfile from '../components/molecules/EditProfile';
import UserPic from '../assets/userPic.jpg';
const StyledWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  padding-top: 4rem;

  @media (min-width: 650px) {
    display: grid;
    grid-template-columns: 0.5fr 3fr;
    grid-column-gap: 3rem;
  }
`;

const StyledAccountWrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const StyledImageWrapper = styled.figure`
  width: 15rem;
  height: 15rem;
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
    border-radius: inherit;
  }
`;

const StyledInfoWrapper = styled.article`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-top: 3rem;
`;

const StyledButton = styled(Button)`
  background-size: 35% 35%;
`;

const StyledText = styled(Text)`
  margin: 2rem 0;
  position: relative;
  ::before {
    width: 2rem;
    height: 2rem;
    position: absolute;
    content: '';
    background-image: url(${({ icon }) => icon});
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: 90% 90%;
    left: -3rem;
    top: -0.4rem;
  }
`;
const StyledButtonLogout = styled.button`
  font-size: 1.1rem;
  font-weight: ${({ theme }) => theme.regular};
  color: #fff;
  background-color: hsla(203, 89%, 53%, 0.8);
  border-radius: 30px;
  padding: 0.4rem 3rem;
`;
const Account = ({ currentUser }) => {
  const [SidebarOpen, setSidebarOpen] = useState(false);
  const { userName, email, photoURL, createdAt } = currentUser.authUser;

  const handleSidebarOpen = () => setSidebarOpen(prevState => !prevState);

  return (
    <StyledWrapper>
      <Navigation />
      <GridTemplate>
        <StyledAccountWrapper>
          <StyledImageWrapper>
            <img src={photoURL} alt={userName} />
          </StyledImageWrapper>
          <StyledInfoWrapper>
            <StyledText icon={UserProfileIcon}>{userName}</StyledText>
            <StyledText icon={EmailIcon}>{email}</StyledText>
            <StyledText icon={JoinedAtIcon}>
              {currentUser ? moment(createdAt.toDate()).calendar() : 'date'}
            </StyledText>
          </StyledInfoWrapper>
          <StyledButtonLogout onClick={() => auth.signOut()}>Log out</StyledButtonLogout>
        </StyledAccountWrapper>
        <StyledButton icon={PensilIcon} add onClick={handleSidebarOpen} />
      </GridTemplate>
      <EditProfile isVisible={SidebarOpen} handleAddPost={handleSidebarOpen} />
    </StyledWrapper>
  );
};

Account.propTypes = {
  currentUser: PropTypes.object.isRequired,
};

export default Account;

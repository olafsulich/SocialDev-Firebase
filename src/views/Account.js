import React, { useContext } from 'react';
import styled from 'styled-components';
import Navigation from '../components/organisms/Navigation';
import Button from '../components/atoms/Button/Button';
import GridTemplate from '../templates/GridTemplate';
import PensilIcon from '../assets/pensil.svg';
import Heading from '../components/atoms/Heading/Heading';
import Text from '../components/atoms/Text/Text';
import UserProfileIcon from '../assets/userProfile.svg';
import EmailIcon from '../assets/email.svg';
import JoinedAtIcon from '../assets/joined.svg';
import { Context } from '../context/context';

const StyledWrapper = styled.div`
  width: 100%;
  overflow: hidden;
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
  margin-top: 2rem;
`;

const StyledButton = styled(Button)`
  background-size: 35% 35%;
`;

const StyledHeading = styled(Heading)`
  margin: 2rem 0;
  position: relative;

  ::before {
    width: 2rem;
    height: 2rem;
    position: absolute;
    content: '';
    background-image: url(${UserProfileIcon});
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: 90% 90%;
    left: -3rem;
    top: 0.4rem;
  }
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
const StyledButtonLogut = styled.button`
  font-size: 1.4rem;
  font-weight: ${({ theme }) => theme.regular};
  color: ${({ theme }) => theme.fontColorText};
  background-color: ${({ theme }) => theme.primaryColor};
  border-radius: 30px;
  padding: 0.7rem 4rem;
  margin-top: 2rem;
`;
const Account = () => {
  const { handleLogout, email, displayName } = useContext(Context);
  return (
    <StyledWrapper>
      <Navigation />
      <GridTemplate>
        <StyledAccountWrapper>
          <StyledImageWrapper>
            <img
              src="https://upload.wikimedia.org/wikipedia/en/thumb/9/98/Gianni_Versace.jpg/220px-Gianni_Versace.jpg"
              alt="user"
            />
          </StyledImageWrapper>
          <StyledInfoWrapper>
            <StyledHeading>{displayName}</StyledHeading>
            <StyledText icon={EmailIcon}>{email}</StyledText>
            <StyledText icon={JoinedAtIcon}>Joined at 19.02.2020</StyledText>
          </StyledInfoWrapper>
          <StyledButtonLogut onClick={handleLogout}>Log out</StyledButtonLogut>
        </StyledAccountWrapper>
      </GridTemplate>
      <StyledButton icon={PensilIcon} add />
    </StyledWrapper>
  );
};
export default Account;

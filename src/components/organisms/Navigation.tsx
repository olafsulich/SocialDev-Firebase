import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../atoms/Button/Button';
import HomeIcon from '../../assets/home.svg';
import ChatIcon from '../../assets/messages.svg';
import NotificationIcon from '../../assets/notifications.svg';
import UserIcon from '../../assets/user.svg';
import Heading from '../atoms/Heading/Heading';

const StyledWrapper = styled.aside`
  width: 100%;
  height: 10vh;
  position: fixed;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 90%;
  border-top: 2px solid ${({ theme }) => theme.tertiaryColor};
  z-index: 20;

  @media (min-width: 850px) {
    width: auto;
    height: auto;
    flex-direction: column;
    margin-top: 5rem;
    justify-content: flex-start;
    position: fixed;
    top: 0;
    border: none;
    background: transparent;
  }
`;

const StyledIconsWrapper = styled.nav`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 1rem 1.5rem 0 1.5rem;

  @media (min-width: 850px) {
    align-items: flex-start;
    flex-direction: column;
    justify-content: space-between;
    padding: 1rem 1.5rem 0 1.5rem;
    margin-left: 2rem;
  }
`;

const StyledHeading = styled(Heading)<{ icon?: any }>`
  margin-bottom: 1rem;
  padding: 0.5rem 1rem 0.5rem 3rem;
  margin: 0 0 0.3rem 0;
  position: relative;

  ::before {
    content: '';
    width: 2.5rem;
    height: 2.5rem;
    background-image: url(${({ icon }) => icon});
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: 60% 60%;
    position: absolute;
    left: 3px;
    top: 0;
    filter: brightness(0%);
  }

  &.active {
    color: hsla(203, 89%, 53%, 0.8);

    ::before {
      filter: none;
    }
  }

  :focus {
    border: 1px solid hsla(203, 89%, 53%, 0.8);
    border-radius: 30px;
    color: hsla(203, 89%, 53%, 0.8);

    ::before {
      filter: none;
    }
  }

  :hover {
    border-radius: 30px;
    background-color: ${({ theme }) => theme.primaryColor};
    color: hsla(203, 89%, 53%, 0.8);

    ::before {
      filter: none;
    }
  }
`;

const StyledLink = styled(NavLink)`
  margin-bottom: 1rem;
  text-decoration: none;
`;

const StyledButton = styled(Button)`
  filter: grayscale(100%);
  -webkit-backface-visibility: hidden;
  -webkit-transform: scale(1);
  &.active {
    filter: none;
  }
`;

const Navigation: React.FC = () => {
  const [pageWidth, setPageWidth] = useState<number>(window.innerWidth);

  const updateDimensions = () => {
    setPageWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', updateDimensions);
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, [pageWidth]);

  return (
    <StyledWrapper>
      <StyledIconsWrapper aria-labelledby="primary-navigation">
        {pageWidth >= 850 ? (
          <>
            <StyledHeading as={StyledLink} icon={HomeIcon} to="/" exact activeclass="active">
              Home
            </StyledHeading>
            <StyledHeading as={StyledLink} icon={ChatIcon} to="/messenger" activeclass="active">
              Messenger
            </StyledHeading>
            <StyledHeading
              icon={NotificationIcon}
              as={StyledLink}
              to="/notifications"
              activeclass="active"
            >
              Notifications
            </StyledHeading>
            <StyledHeading as={StyledLink} icon={UserIcon} to="/account" activeclass="active">
              Account
            </StyledHeading>
          </>
        ) : (
          <>
            <StyledButton icon={HomeIcon} as={StyledLink} to="/" exact activeclass="active" />
            <StyledButton icon={ChatIcon} as={StyledLink} to="/messenger" activeclass="active" />
            <StyledButton
              icon={NotificationIcon}
              as={StyledLink}
              to="/notifications"
              activeclass="active"
            />
            <StyledButton icon={UserIcon} as={StyledLink} to="/account" activeclass="active" />
          </>
        )}
      </StyledIconsWrapper>
    </StyledWrapper>
  );
};

export default Navigation;

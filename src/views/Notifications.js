import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import Navigation from '../components/organisms/Navigation';
import GridTemplate from '../templates/GridTemplate';
import StyledHeading from '../components/atoms/Heading/Heading';
import NotificationsList from '../components/molecules/NotificationsList';
import useCollection from '../hooks/useCollection';
import { notificationsRef } from '../firebase/firestoreRefs';

const StyledWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  @media (min-width: 650px) {
    display: grid;
    grid-template-columns: 0.5fr 3fr;
    grid-column-gap: 3rem;
  }
`;

const StyledDiv = styled.div`
  width: 100%;
  height: 90vh;
  max-height: 90vh;
`;

const StyledNotificationsWrapper = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  border: 2px solid #e6ecf1;
  border-top: none;
  padding: 2rem 3rem;

  ${({ heading }) =>
    heading &&
    css`
      border: none;
      background-color: #f5f8fa;
      width: 100%;
      height: 10%;
      align-items: flex-start;
      justify-content: flex-start;
      padding: 2rem 3rem;
    `}
`;

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useCollection(notificationsRef, setNotifications);

  return (
    <StyledWrapper>
      <Navigation />
      <GridTemplate>
        <StyledDiv>
          <StyledNotificationsWrapper heading>
            <StyledHeading>Notifications</StyledHeading>
          </StyledNotificationsWrapper>
          <NotificationsList notifications={notifications} />
        </StyledDiv>
      </GridTemplate>
    </StyledWrapper>
  );
};

export default Notifications;

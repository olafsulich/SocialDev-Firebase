import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { firestore } from '../firebase/firebase';
import Navigation from '../components/organisms/Navigation';
import GridTemplate from '../templates/GridTemplate';
import StyledHeading from '../components/atoms/Heading/Heading';
import documentsCollection from '../utils/documentsCollection';
import NotificationsList from '../components/molecules/NotificationsList';

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

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  const notificationsRef = firestore.collection('notifications');

  let unsubscribeFromNotifications = null;

  useEffect(() => {
    unsubscribeFromNotifications = notificationsRef.orderBy('time', 'desc').onSnapshot(snapshot => {
      const newNotifications = snapshot.docs.map(documentsCollection);
      setNotifications(newNotifications);
    });
    return () => {
      unsubscribeFromNotifications();
    };
  }, []);

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

import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import StyledHeading from '../components/atoms/Heading/Heading';
import NotificationsList from '../components/molecules/NotificationsList';
import useSubscription from '../hooks/useSubscription';
import { notificationsRef } from '../firebase/firestoreRefs';
import PageTemplate from '../templates/PageTemplate';

const StyledDiv = styled.div`
  width: 45rem;
  height: 85vh;
  max-height: 90vh;
  overflow: scroll;
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

  useSubscription(notificationsRef, setNotifications, 'desc');

  return (
    <PageTemplate>
      <StyledDiv>
        <StyledNotificationsWrapper heading>
          <StyledHeading>Notifications</StyledHeading>
        </StyledNotificationsWrapper>
        <NotificationsList notifications={notifications} />
      </StyledDiv>
    </PageTemplate>
  );
};

export default Notifications;

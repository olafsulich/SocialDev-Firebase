import React, { useState, lazy, Suspense } from 'react';
import styled from 'styled-components';
import useSubscription from '../hooks/useSubscription';
import { notificationsRef } from '../firebase/firestoreRefs';
import PageTemplate from '../templates/PageTemplate';
import Loader from '../components/atoms/Loader/Loader';

const HeadingWrapper = lazy(() => import('../components/atoms/HeadingWrapper/HeadingWrapper'));
const NotificationsList = lazy(() => import('../components/molecules/NotificationsList'));

const StyledDiv = styled.div`
  width: 45rem;
  height: 85vh;
  max-height: 90vh;
  overflow: scroll;
`;

const Notifications = () => {
  const [notifications, setNotifications] = useState<[]>([]);

  useSubscription(notificationsRef, setNotifications, 'desc');

  return (
    <PageTemplate>
      <StyledDiv>
        <Suspense fallback={<Loader />}>
          <HeadingWrapper headingName="Notifications" />
          <NotificationsList notifications={notifications} />
        </Suspense>
      </StyledDiv>
    </PageTemplate>
  );
};

export default Notifications;

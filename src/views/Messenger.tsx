import React, { useState, lazy, Suspense } from 'react';
import styled from 'styled-components';
import { roomsRef } from '../firebase/firestoreRefs';
import useSubscription from '../hooks/useSubscription';
import PageTemplate from '../templates/PageTemplate';
import Loader from '../components/atoms/Loader/Loader';

const HeadingWrapper = lazy(() => import('../components/atoms/HeadingWrapper/HeadingWrapper'));
const AddRoom = lazy(() => import('../components/molecules/AddRoom'));
const RoomsList = lazy(() => import('../components/molecules/RoomsList'));

const StyledDiv = styled.div`
  width: 45rem;
  height: 85vh;
  max-height: 90vh;
  overflow: scroll;
`;

const Messenger = () => {
  const [rooms, setRooms] = useState([]);

  useSubscription(roomsRef, setRooms, 'desc');

  const handleCreate = (roomToAdd: never) => {
    roomsRef.add(roomToAdd);
    setRooms([roomToAdd, ...rooms]);
  };

  return (
    <PageTemplate>
      <StyledDiv>
        <Suspense fallback={<Loader />}>
          <HeadingWrapper headingName="Rooms" />
          <AddRoom handleCreate={handleCreate} />
          <RoomsList rooms={rooms} />
        </Suspense>
      </StyledDiv>
    </PageTemplate>
  );
};

export default Messenger;

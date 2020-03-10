import React, { useState, lazy, Suspense } from 'react';
import styled, { css } from 'styled-components';
import { roomsRef } from '../firebase/firestoreRefs';
import useSubscription from '../hooks/useSubscription';
import PageTemplate from '../templates/PageTemplate';
import Loader from '../components/atoms/Loader/Loader';

const AddRoom = lazy(() => import('../components/molecules/AddRoom'));
const RoomsList = lazy(() => import('../components/molecules/RoomsList'));
const StyledHeading = lazy(() => import('../components/atoms/Heading/Heading'));

const StyledDiv = styled.div`
  width: 45rem;
  height: 85vh;
  max-height: 90vh;
  overflow: scroll;
`;

const StyledRoomWrapper = styled.div`
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

const Messenger = () => {
  const [rooms, setRooms] = useState([]);

  useSubscription(roomsRef, setRooms, 'desc');

  const handleCreate = roomToAdd => {
    roomsRef.add(roomToAdd);
    setRooms([roomToAdd, ...rooms]);
  };

  return (
    <PageTemplate>
      <StyledDiv>
        <Suspense fallback={<Loader />}>
          <StyledRoomWrapper heading>
            <StyledHeading>Rooms</StyledHeading>
          </StyledRoomWrapper>
          <AddRoom handleCreate={handleCreate} />
          <RoomsList rooms={rooms} />
        </Suspense>
      </StyledDiv>
    </PageTemplate>
  );
};

export default Messenger;

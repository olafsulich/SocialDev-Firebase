import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import StyledHeading from '../components/atoms/Heading/Heading';
import useUser from '../hooks/useUser';
import AddRoom from '../components/molecules/AddRoom';
import { roomsRef } from '../firebase/firestoreRefs';
import useSubscription from '../hooks/useSubscription';
import RoomsList from '../components/molecules/RoomsList';
import PageTemplate from '../templates/PageTemplate';

const StyledDiv = styled.div`
  width: 100%;
  height: 90vh;
  max-height: 90vh;
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
  const [currentUser, setCurrentUser] = useState(null);
  const [rooms, setRooms] = useState([]);

  useUser(setCurrentUser);
  useSubscription(roomsRef, setRooms, 'desc');

  const handleCreate = roomToAdd => {
    roomsRef.add(roomToAdd);
    setRooms([roomToAdd, ...rooms]);
  };

  return (
    <PageTemplate>
      <StyledDiv>
        <StyledRoomWrapper heading>
          <StyledHeading>Rooms</StyledHeading>
        </StyledRoomWrapper>
        <AddRoom handleCreate={handleCreate} />
        <RoomsList rooms={rooms} />
      </StyledDiv>
    </PageTemplate>
  );
};

export default Messenger;

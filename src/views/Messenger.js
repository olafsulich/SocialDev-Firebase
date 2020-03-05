import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { firestore } from '../firebase/firebase';
import Navigation from '../components/organisms/Navigation';
import GridTemplate from '../templates/GridTemplate';
import RoomDetails from './RoomDetails';
import StyledHeading from '../components/atoms/Heading/Heading';
import Text from '../components/atoms/Text/Text';
import useUser from '../hooks/useUser';
import AddRoom from '../components/molecules/AddRoom';
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
  border: 1px solid #e6ecf1;
`;

const StyledRoomWrapper = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  border: 1px solid #e6ecf1;
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

  const handleCreate = roomToAdd => {
    firestore.collection('rooms').add(roomToAdd);
    setRooms([roomToAdd, ...rooms]);
  };
  const handleRemove = id => {
    firestore
      .collection('rooms')
      .doc(id)
      .delete();
  };

  let unsubscribeFromRooms = null;

  useEffect(() => {
    unsubscribeFromRooms = firestore
      .collection('rooms')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const newRooms = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRooms(newRooms);
      });
    return () => unsubscribeFromRooms();
  }, []);

  console.log(rooms);
  return (
    <StyledWrapper>
      <Navigation />
      <GridTemplate>
        <StyledDiv>
          <StyledRoomWrapper heading>
            <StyledHeading>Rooms</StyledHeading>
          </StyledRoomWrapper>
          <AddRoom handleCreate={handleCreate} />
          {rooms.map(({ title, id }) => (
            <StyledRoomWrapper key={id}>
              <Text>{title}</Text>
            </StyledRoomWrapper>
          ))}
        </StyledDiv>
      </GridTemplate>
    </StyledWrapper>
  );
};

export default Messenger;

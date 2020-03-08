import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { firestore } from '../firebase/firebase';
import Navigation from '../components/organisms/Navigation';
import GridTemplate from '../templates/GridTemplate';
import StyledHeading from '../components/atoms/Heading/Heading';
import useUser from '../hooks/useUser';
import AddRoom from '../components/molecules/AddRoom';
import documentsCollection from '../utils/documentsCollection';
import Room from '../components/molecules/Room';

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

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Messenger = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [rooms, setRooms] = useState([]);
  useUser(setCurrentUser);

  const roomRef = firestore.collection('rooms');

  const handleCreate = roomToAdd => {
    roomRef.add(roomToAdd);
    setRooms([roomToAdd, ...rooms]);
  };
  const handleRemove = id => {
    roomRef.doc(id).delete();
  };

  let unsubscribeFromRooms = null;

  useEffect(() => {
    unsubscribeFromRooms = roomRef.orderBy('createdAt', 'desc').onSnapshot(snapshot => {
      const newRooms = snapshot.docs.map(documentsCollection);
      setRooms(newRooms);
    });
    return () => {
      unsubscribeFromRooms();
    };
  }, []);

  return (
    <StyledWrapper>
      <Navigation />
      <GridTemplate>
        <StyledDiv>
          <StyledRoomWrapper heading>
            <StyledHeading>Rooms</StyledHeading>
          </StyledRoomWrapper>
          <AddRoom handleCreate={handleCreate} />
          {rooms.map(({ title, id, user }) => (
            <Room title={title} id={id} key={id} user={user} handleRemove={handleRemove} />
          ))}
        </StyledDiv>
      </GridTemplate>
    </StyledWrapper>
  );
};

export default Messenger;

import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { useParams } from 'react-router-dom';
import { firestore, auth } from '../firebase/firebase';
import Navigation from '../components/organisms/Navigation';
import GridTemplate from '../templates/GridTemplate';
import Heading from '../components/atoms/Heading/Heading';
import Text from '../components/atoms/Text/Text';
import AddMessage from '../components/molecules/AddMessage';
import documentsCollection from '../utils/documentsCollection';

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
  position: relative;
`;

const StyledHeadingWrapper = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  border-bottom: 1px solid #e6ecf1;
  padding: 2rem 3rem;
`;

const StyledChatWrapper = styled.div`
  width: 100%;
  height: auto;
  max-height: 80%;
  padding: 3rem 2rem;
  display: grid;
  grid-template-columns: 1fr;
  align-items: start;
  justify-items: flex-start;
  overflow: scroll;
  position: relative;
`;

const StyledMessageWrapper = styled.article`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 1.5rem;
  position: relative;

  ${({ fromCurrentUser }) =>
    fromCurrentUser &&
    css`
      justify-content: flex-end;
    `}
`;

const StyledAuthorImage = styled.figure`
  display: flex;
  height: 100%;
  width: 4rem;
  position: absolute;
  top: 0rem;
  left: -1rem;

  ${({ fromCurrentUser }) =>
    fromCurrentUser &&
    css`
      right: -2rem;
      left: auto;
    `}
  img {
    width: 3rem;
    height: 3rem;
    border-radius: 100px;
  }
`;

const StyledMessage = styled(Text)`
  background-color: #f1f0f0;
  color: #000;
  padding: 0.6rem 1.5rem;
  border-radius: 2rem;
  max-width: 60%;
  min-height: 3rem;
  margin-left: 3rem;

  ${({ fromCurrentUser }) =>
    fromCurrentUser &&
    css`
      color: #fff;
      background-color: hsla(203, 89%, 53%, 0.8);
      margin-right: 3rem;
    `}
`;

const RoomDetails = () => {
  const [room, setRoom] = useState(null);
  const [messages, setMessages] = useState([]);

  const { id } = useParams();
  const chatRef = useRef(null);

  const roomRef = firestore.doc(`rooms/${id}`);
  const messageRef = roomRef.collection(`messages`);
  const currentUser = auth.currentUser;
  let unsubscribeFromRoom = null;
  let unsubscribeFromMessages = null;

  useEffect(() => {
    unsubscribeFromRoom = roomRef.onSnapshot(snapshot => {
      const detailRoom = documentsCollection(snapshot);
      setRoom(detailRoom);
    });

    unsubscribeFromMessages = messageRef.orderBy('createdAt', 'asc').onSnapshot(snapshot => {
      const detailMessages = snapshot.docs.map(documentsCollection);
      setMessages(detailMessages);
    });

    return () => {
      unsubscribeFromRoom();
      unsubscribeFromMessages();
    };
  }, []);

  useEffect(() => {
    const currentRef = chatRef.current;
    currentRef.scrollTop = currentRef.scrollHeight;
  }, [messages]);

  const createMessage = messageToAdd => messageRef.add(messageToAdd);

  const isUserMessage = (authUser, messageAuthor, message) => {
    if (authUser.uid === messageAuthor.uid) {
      return (
        <StyledMessageWrapper fromCurrentUser>
          <StyledAuthorImage fromCurrentUser>
            <img src={messageAuthor.photoURL} alt={messageAuthor.userName} />
          </StyledAuthorImage>
          <StyledMessage fromCurrentUser>{message}</StyledMessage>
        </StyledMessageWrapper>
      );
    }
    return (
      <StyledMessageWrapper>
        <StyledAuthorImage>
          <img src={messageAuthor.photoURL} alt={messageAuthor.userName} />
        </StyledAuthorImage>
        <StyledMessage>{message}</StyledMessage>
      </StyledMessageWrapper>
    );
  };

  return (
    <StyledWrapper>
      <Navigation />
      <GridTemplate>
        <StyledDiv>
          <StyledHeadingWrapper>
            <Heading>{room ? room.title : ''}</Heading>
          </StyledHeadingWrapper>
          <StyledChatWrapper ref={chatRef}>
            {messages.map(({ user, message }) => isUserMessage(currentUser, user, message))}
          </StyledChatWrapper>
          <AddMessage onCreate={createMessage} />
        </StyledDiv>
      </GridTemplate>
    </StyledWrapper>
  );
};

export default RoomDetails;

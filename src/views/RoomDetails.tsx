import React, { useState, useRef, lazy, Suspense } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { firestore, auth } from '../firebase/firebase';
import useSubscription from '../hooks/useSubscription';
import useRefScroll from '../hooks/useRefScroll';
import useCollection from '../hooks/useCollection';
import PageTemplate from '../templates/PageTemplate';
import Loader from '../components/atoms/Loader/Loader';

const HeadingWrapper = lazy(() => import('../components/atoms/HeadingWrapper/HeadingWrapper'));
const MessagesList = lazy(() => import('../components/molecules/MessagesList'));
const AddMessage = lazy(() => import('../components/molecules/AddMessage'));

const StyledDiv = styled.div`
  width: 100%;
  height: 90vh;
  max-height: 90vh;
  border: 1px solid #e6ecf1;
  position: relative;
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

const RoomDetails = () => {
  const [room, setRoom] = useState<{ title: string } | null>(null);
  const [messages, setMessages] = useState<[]>([]);

  const { id } = useParams();

  const chatRef = useRef<HTMLDivElement>(null);

  const roomRef = firestore.doc(`rooms/${id}`);
  const messageRef = roomRef.collection(`messages`);

  const currentUser = auth.currentUser;

  useSubscription(messageRef, setMessages);
  useCollection(roomRef, setRoom);
  useRefScroll(chatRef, messages);

  return (
    <PageTemplate>
      <StyledDiv>
        <Suspense fallback={<Loader />}>
          <HeadingWrapper headingName={room ? room.title : ''} />
          <StyledChatWrapper ref={chatRef}>
            <MessagesList currentUser={currentUser} messages={messages} />
          </StyledChatWrapper>
          <AddMessage messageRef={messageRef} />
        </Suspense>
      </StyledDiv>
    </PageTemplate>
  );
};

export default RoomDetails;

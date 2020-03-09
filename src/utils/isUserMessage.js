import React from 'react';
import Message from '../components/atoms/Message/Message';

const isUserMessage = (authUser, messageAuthor, message) => {
  return (
    <>
      {authUser.uid === messageAuthor.uid ? (
        <Message fromCurrentUser message={message} />
      ) : (
        <Message message={message} />
      )}
    </>
  );
};

export default isUserMessage;

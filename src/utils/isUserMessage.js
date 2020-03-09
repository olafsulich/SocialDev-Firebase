import React from 'react';
import Message from '../components/atoms/Message/Message';

const isUserMessage = (authUser, messageAuthor, message, id) => {
  return (
    <>
      {authUser.uid === messageAuthor.uid ? (
        <Message fromCurrentUser message={message} messageAuthor={messageAuthor} id={id} />
      ) : (
        <Message message={message} messageAuthor={messageAuthor} key={id} id={id} />
      )}
    </>
  );
};

export default isUserMessage;

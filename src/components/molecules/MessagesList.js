import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import isUserMessage from '../../utils/isUserMessage';

const StyledArticle = styled.article`
  width: 100%;
`;

const MessagesList = ({ messages, currentUser }) => {
  return (
    <>
      {messages.map(({ user, message, id }) => (
        <StyledArticle key={id}>{isUserMessage(currentUser, user, message)}</StyledArticle>
      ))}
    </>
  );
};

MessagesList.propTypes = {
  messages: PropTypes.array.isRequired,
  currentUser: PropTypes.object.isRequired,
};

export default MessagesList;

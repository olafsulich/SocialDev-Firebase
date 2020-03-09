import React from 'react';
import PropTypes from 'prop-types';
import isUserMessage from '../../utils/isUserMessage';

const MessagesList = ({ messages, currentUser }) => {
  return <>{messages.map(({ user, message }) => isUserMessage(currentUser, user, message))}</>;
};

MessagesList.propTypes = {
  messages: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
};

export default MessagesList;

import React from 'react';
import PropTypes from 'prop-types';
const Comment = ({ content, user, createdAt, title }) => {
  return (
    <article>
      <span>{user.userName}</span>
      <span>{content}</span>
      <span>{title}</span>
      <span>{new Date()}</span>
    </article>
  );
};

Comment.propTypes = {
  content: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default Comment;

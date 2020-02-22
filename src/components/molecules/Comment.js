import React from 'react';
import PropTypes from 'prop-types';
const Comment = ({ content }) => {
  return (
    <article>
      <span>{content}</span>
    </article>
  );
};

Comment.propTypes = {
  content: PropTypes.string.isRequired,
};

export default Comment;

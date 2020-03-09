import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

const CommentsList = ({ comments }) => {
  return (
    <>
      {comments.map(({ content, user: { name }, id }) => {
        return <Comment content={content} userName={name} key={id} comments={comments.length} />;
      })}
    </>
  );
};

CommentsList.propTypes = {
  comments: PropTypes.object.isRequired,
};

export default CommentsList;

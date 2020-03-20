import React from 'react';
import PropTypes from 'prop-types';
import Comment from '../atoms/Comment/Comment.tsx';

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
  comments: PropTypes.array.isRequired,
};

export default CommentsList;

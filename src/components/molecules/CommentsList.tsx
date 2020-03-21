import React from 'react';
import Comment from '../atoms/Comment/Comment';

interface Props {
  comments: [];
}

const CommentsList: React.FC<Props> = ({ comments }) => {
  return (
    <>
      {comments.map(({ content, user: { name }, id }) => {
        return <Comment content={content} userName={name} key={id} />;
      })}
    </>
  );
};

export default CommentsList;

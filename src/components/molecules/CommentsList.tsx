import React from 'react';
import Comment from '../atoms/Comment/Comment';

interface Comments {
  content: string;
  user: {
    name: string;
  };
  id: number;
}

interface Props {
  comments: Comments[];
}

const CommentsList: React.FC<Props> = ({ comments }) => {
  return (
    <>
      {comments.map(({ content, user: { name }, id }) => (
        <Comment content={content} userName={name} key={id} />
      ))}
    </>
  );
};

export default CommentsList;

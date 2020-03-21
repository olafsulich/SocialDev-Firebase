import React from 'react';
import Post from '../atoms/Post/Post';

interface Props {
  posts: [];
}

const PostsList: React.FC<Props> = ({ posts }) => {
  return (
    <>
      {posts.map(({ user, title, likes, comments, id, createdAt }) => {
        return (
          <Post
            title={title}
            key={id}
            user={user}
            likes={likes}
            comments={comments}
            id={id}
            createdAt={createdAt}
            isLink
          />
        );
      })}
    </>
  );
};

export default PostsList;

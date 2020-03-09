import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';

const PostsList = ({ posts }) => {
  return (
    <>
      {posts.map(({ user, title, content, likes, comments, id, createdAt }) => {
        return (
          <Post
            title={title}
            key={title}
            user={user}
            content={content}
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

PostsList.propTypes = {
  posts: PropTypes.object.isRequired,
};

export default PostsList;

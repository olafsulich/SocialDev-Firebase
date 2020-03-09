import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter, useParams } from 'react-router-dom';
import { firestore } from '../firebase/firebase';
import AddComment from '../components/molecules/AddComment';
import Post from '../components/atoms/Post/Post';
import useSubscription from '../hooks/useSubscription';
import useCollection from '../hooks/useCollection';
import CommentsList from '../components/molecules/CommentsList';
import useUpdate from '../hooks/useUpdate';
import PageTemplate from '../templates/PageTemplate';

const PostDetails = ({ user: { authUser } }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const { id } = useParams();

  const postRef = firestore.doc(`posts/${id}`);
  const commentRef = postRef.collection(`usersComments`);

  useSubscription(commentRef, setComments);
  useCollection(postRef, setPost);
  useUpdate(postRef, comments.length, comments);

  return (
    <PageTemplate>
      {post && <Post {...post} />}
      <CommentsList comments={comments} />
      <AddComment commentRef={commentRef} user={authUser} />
    </PageTemplate>
  );
};

PostDetails.propTypes = {
  user: PropTypes.object.isRequired,
};

export default withRouter(PostDetails);

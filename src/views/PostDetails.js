import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withRouter, useParams } from 'react-router-dom';
import Navigation from '../components/organisms/Navigation';
import GridTemplate from '../templates/GridTemplate';
import { firestore } from '../firebase/firebase';
import AddComment from '../components/molecules/AddComment';
import Comment from '../components/molecules/Comment';
import Post from '../components/molecules/Post';
import documentsCollection from '../utils/documentsCollection';
const StyledWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  @media (min-width: 650px) {
    display: grid;
    grid-template-columns: 0.5fr 3fr;
    grid-column-gap: 3rem;
  }
`;

const PostDetails = ({ user: { authUser } }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const { id } = useParams();

  const postRef = firestore.doc(`posts/${id}`);
  const commentRef = postRef.collection(`usersComments`);

  let unsubscribeFromPost = null;
  let unsubscribeFromComments;

  useEffect(() => {
    unsubscribeFromComments = commentRef.orderBy('createdAt', 'asc').onSnapshot(snapshot => {
      const detailComments = snapshot.docs.map(documentsCollection);
      setComments(detailComments);
    });

    unsubscribeFromPost = postRef.onSnapshot(snapshot => {
      const detailPost = documentsCollection(snapshot);
      setPost(detailPost);
    });

    return () => {
      unsubscribeFromPost();
      unsubscribeFromComments();
    };
  }, []);

  useEffect(() => {
    postRef.update({ comments: comments.length });
  }, [comments]);

  const createComment = newComment => commentRef.add(newComment);

  return (
    <StyledWrapper>
      <Navigation />
      <GridTemplate>
        {post && <Post {...post} />}
        {comments.map(comment => (
          <Comment
            content={comment.content}
            userName={comment.user.name}
            key={comment.id}
            comments={comments.length}
          />
        ))}
        <AddComment onCreate={createComment} user={authUser} />
      </GridTemplate>
    </StyledWrapper>
  );
};

PostDetails.propTypes = {
  user: PropTypes.object.isRequired,
};

export default withRouter(PostDetails);

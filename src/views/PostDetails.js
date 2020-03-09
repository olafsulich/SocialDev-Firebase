import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withRouter, useParams } from 'react-router-dom';
import Navigation from '../components/organisms/Navigation';
import GridTemplate from '../templates/GridTemplate';
import { firestore } from '../firebase/firebase';
import AddComment from '../components/molecules/AddComment';
import Post from '../components/molecules/Post';
import useSubscription from '../hooks/useSubscription';
import useCollection from '../hooks/useCollection';
import CommentsList from '../components/molecules/CommentsList';
import useUpdate from '../hooks/useUpdate';

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

  useSubscription(commentRef, setComments);
  useCollection(postRef, setPost);
  useUpdate(postRef, comments, comments.length, comments);

  return (
    <StyledWrapper>
      <Navigation />
      <GridTemplate>
        {post && <Post {...post} />}
        <CommentsList comments={comments} />
        <AddComment commentRef={commentRef} user={authUser} />
      </GridTemplate>
    </StyledWrapper>
  );
};

PostDetails.propTypes = {
  user: PropTypes.object.isRequired,
};

export default withRouter(PostDetails);

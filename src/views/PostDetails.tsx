import React, { useState, lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { firestore } from '../firebase/firebase';
import useSubscription from '../hooks/useSubscription';
import useCollection from '../hooks/useCollection';
import useUpdate from '../hooks/useUpdate';
import PageTemplate from '../templates/PageTemplate';
import Loader from '../components/atoms/Loader/Loader';

const AddComment = lazy(() => import('../components/molecules/AddComment'));
const Post = lazy(() => import('../components/atoms/Post/Post'));
const CommentsList = lazy(() => import('../components/molecules/CommentsList'));

interface Props {
  user: { authUser?: {} };
}

interface IPost {
  title: string;
  likes: number;
  comments: object;
  id: number;
  createdAt: {
    toDate: () => {};
  };
  isLink?: boolean;
  user: {};
}

const PostDetails: React.FC<Props> = ({ user: { authUser } }) => {
  const [post, setPost] = useState<IPost>();
  const [comments, setComments] = useState([]);
  const { id } = useParams();

  const postRef = firestore.doc(`posts/${id}`);
  const commentRef = postRef.collection(`usersComments`);

  useSubscription(commentRef, setComments);
  useCollection(postRef, setPost);
  useUpdate(postRef, comments.length, comments);

  return (
    <PageTemplate>
      <Suspense fallback={<Loader />}>
        {post && <Post {...post} />}
        <CommentsList comments={comments} />
        <AddComment commentRef={commentRef} />
      </Suspense>
    </PageTemplate>
  );
};

export default PostDetails;

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Heading from '../atoms/Heading/Heading';
import Button from '../atoms/Button/Button';
import Text from '../atoms/Text/Text';
import CommentsIcon from '../../assets/comments.svg';
import HeartIcon from '../../assets/heart.svg';
import RemoveIcon from '../../assets/delete.svg';
import UserPic from '../../assets/userPic.jpg';
import { firestore, auth } from '../../firebase/firebase';

const StyledWrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const StyledCommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: 1100px) {
    width: 80%;
    max-width: 980px;
    flex-direction: row;
    justify-content: space-around;
  }
`;

const StyledAuthorWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 1.5rem;
`;

const StyledAuthorImage = styled.figure`
  width: 5.5rem;
  height: 5.5rem;
  margin-right: 2rem;
  @media (min-width: 1500px) {
    width: 6rem;
    height: 6rem;
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 100px;
  }
`;
const StyledTitleWrapper = styled.article`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
`;

const StyledInfoWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  @media (min-width: 1100px) {
    margin-top: 5rem;
    z-index: 8;
    transform: translateX(-6rem);
  }
`;

const StyledIconWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-right: 1.5rem;
`;

const StyledQuantity = styled.span`
  color: ${({ theme }) => theme.fontColorText};
  font-size: 1.4rem;
  font-weight: ${({ theme }) => theme.regular};
`;

const StyledIcon = styled.div`
  width: 4rem;
  height: 4rem;
  background-image: url(${({ icon }) => icon});
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 60% 60%;
  background-color: #fff;
`;

const StyledButton = styled.button`
  font-size: 1.4rem;
  font-weight: ${({ theme }) => theme.regular};
  color: ${({ theme }) => theme.fontColorText};
  background-color: ${({ theme }) => theme.primaryColor};
  border-radius: 12px;
  padding: 0.6rem 1.6rem;
`;
const Post = ({ title, likes, comments, onRemove, id, user }) => {
  const postRef = firestore.doc(`posts/${id}`);

  const like = () => postRef.update({ likes: likes + 1 });

  const isUserPost = (currentUser, postAuthor) => {
    if (!currentUser) return false;
    return currentUser.uid === postAuthor.uid;
  };
  const currentUser = auth.currentUser;

  return (
    <StyledWrapper>
      <StyledCommentWrapper>
        <StyledAuthorWrapper>
          <StyledAuthorImage>
            <img src={user.photoURL || UserPic} alt="author" />
          </StyledAuthorImage>
          <StyledTitleWrapper>
            <Heading>{user.name}</Heading>
            <Text>{title}</Text>
          </StyledTitleWrapper>
        </StyledAuthorWrapper>
        <StyledInfoWrapper>
          <StyledIconWrapper>
            <StyledIcon icon={CommentsIcon} />
            <StyledQuantity>{comments}</StyledQuantity>
          </StyledIconWrapper>
          <StyledIconWrapper>
            <StyledIcon icon={HeartIcon} onClick={() => like()} />
            <StyledQuantity>{likes}</StyledQuantity>
          </StyledIconWrapper>
          {isUserPost(currentUser, user) ? (
            <Button remove icon={RemoveIcon} onClick={() => onRemove(id)} />
          ) : (
            <StyledButton>Comment</StyledButton>
          )}
        </StyledInfoWrapper>
      </StyledCommentWrapper>
    </StyledWrapper>
  );
};

Post.propTypes = {
  title: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  comments: PropTypes.number.isRequired,
  onRemove: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
};

export default Post;

import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
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
  width: 45rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border: 1px solid #e6ecf1;
  padding: 2rem 6rem;
`;

const StyledCommentWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
  height: 100%;
  width: 100%;
  position: relative;
`;

const StyledAuthorWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
`;

const StyledAuthorImage = styled.figure`
  display: flex;
  height: 100%;
  width: 4rem;
  position: absolute;
  top: -0.5rem;
  left: -13%;

  img {
    width: 3rem;
    height: 3rem;
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
  @media (min-width: 1100px) {
    z-index: 8;
  }
`;

const StyledIconWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 1rem 0 0;
  transform: translateX(-15px);
`;

const StyledQuantity = styled.span`
  color: ${({ theme }) => theme.fontColorText};
  font-size: 1.4rem;
  font-weight: ${({ theme }) => theme.regular};
`;

const StyledIcon = styled.div`
  width: 3rem;
  height: 3rem;
  background-image: url(${({ icon }) => icon});
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 60% 60%;
  background-color: #fff;
  border-radius: 50px;
  cursor: pointer;
  margin-right: 5px;

  :hover {
    border-radius: 30px;
    background-color: ${({ theme }) => theme.primaryColor};
  }

  ${({ remove }) =>
    remove &&
    css`
      :hover {
        background-color: hsla(341, 75%, 51%, 0.2);
      }
    `}

  ${({ comments }) =>
    comments &&
    css`
      :hover {
        background-color: hsla(146, 72%, 44%, 0.2);
      }
    `}
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  z-index: 12;
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
        <StyledLink to={`posts/${id}`}>
          <StyledAuthorImage>
            <img src={user.photoURL || UserPic} alt={user.name} />
          </StyledAuthorImage>
        </StyledLink>
        <StyledAuthorWrapper>
          <StyledLink to={`posts/${id}`}>
            <StyledTitleWrapper>
              <Heading>{user.name}</Heading>
              <Text>{title}</Text>
            </StyledTitleWrapper>
          </StyledLink>
          <StyledInfoWrapper>
            <StyledIconWrapper>
              <StyledIcon comments icon={CommentsIcon} />
              <StyledQuantity>{comments}</StyledQuantity>
            </StyledIconWrapper>
            <StyledIconWrapper>
              <StyledIcon icon={HeartIcon} onClick={() => like()} />
              <StyledQuantity>{likes}</StyledQuantity>
            </StyledIconWrapper>
            <StyledIconWrapper>
              {isUserPost(currentUser, user) ? (
                <StyledIcon remove icon={RemoveIcon} onClick={() => onRemove(id)} />
              ) : null}
            </StyledIconWrapper>
          </StyledInfoWrapper>
        </StyledAuthorWrapper>
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

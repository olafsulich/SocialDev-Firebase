import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import Heading from '../Heading/Heading';
import Text from '../Text/Text';
import CommentsIcon from '../../../assets/comments.svg';
import HeartIcon from '../../../assets/heart.svg';
import RemoveIcon from '../../../assets/delete.svg';
import { firestore, auth } from '../../../firebase/firebase';
import isUserOwnerShip from '../../../utils/isUserOwnerShip';
import { postsRef } from '../../../firebase/firestoreRefs';
import handleRemove from '../../../utils/handleRemove';

const StyledWrapper = styled.div`
  width: 45rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border: 1px solid #e6ecf1;
  padding: 2rem 6rem;

  :hover {
    background-color: #f5f8fa;
    cursor: pointer;
  }
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
const StyledArticle = styled.article`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  width: 90%;
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

const StyledIcon = styled.button<ButtonProps>`
  width: 3rem;
  height: 3rem;
  background-image: url(${({ icon }) => icon});
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 60% 60%;
  background-color: transparent;
  border-radius: 50px;
  cursor: pointer;
  margin-right: 5px;
  :focus,
  :hover {
    border-radius: 30px;
    background-color: ${({ theme }) => theme.primaryColor};
  }

  ${({ remove }) =>
    remove &&
    css`
      :focus,
      :hover {
        background-color: hsla(341, 75%, 51%, 0.2);
      }
    `}

  ${({ comments }) =>
    comments &&
    css`
      :focus,
      :hover {
        background-color: hsla(146, 72%, 44%, 0.2);
        cursor: auto;
      }
    `}
`;

const StyledHeading = styled(Heading)`
  margin-bottom: 0;
`;

const StyledDate = styled.span`
  font-size: 1rem;
  margin-top: 6px;
  color: #bec3c9;
  font-weight: ${({ theme }) => theme.regular};
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  z-index: 12;
`;

const StyledText = styled(Text)`
  margin-top: 1rem;
`;

interface ButtonProps {
  readonly icon?: any;
  readonly remove?: boolean;
  readonly comments?: boolean;
}

interface Props {
  title: string;
  likes: number;
  comments: object;
  id: number;
  createdAt: {
    toDate: () => {};
  };
  isLink?: boolean;
  user: {
    name?: string;
    photoURL?: string;
  };
}

const Post: React.FC<Props> = ({ title, likes, comments, id, user, createdAt, isLink }) => {
  const postRef = firestore.doc(`posts/${id}`);

  const like = () => postRef.update({ likes: likes + 1 });

  const currentUser = auth.currentUser;
  const { name, photoURL } = user;

  return (
    <StyledWrapper>
      <StyledCommentWrapper>
        {isLink ? (
          <StyledLink to={`posts/${id}`}>
            <StyledAuthorImage>
              <img src={photoURL} alt={name} />
            </StyledAuthorImage>
          </StyledLink>
        ) : (
          <StyledAuthorImage>
            <img src={photoURL} alt={name} />
          </StyledAuthorImage>
        )}
        <StyledAuthorWrapper>
          {isLink ? (
            <StyledLink to={`posts/${id}`}>
              <StyledArticle>
                <StyledHeading>{name}</StyledHeading>
                <StyledDate>
                  {createdAt.toDate ? moment(createdAt.toDate()).calendar() : 'date'}
                </StyledDate>
                <StyledText>{title}</StyledText>
              </StyledArticle>
            </StyledLink>
          ) : (
            <StyledArticle>
              <StyledHeading>{name}</StyledHeading>
              <StyledDate>
                {createdAt.toDate ? moment(createdAt.toDate()).calendar() : 'date'}
              </StyledDate>
              <StyledText>{title}</StyledText>
            </StyledArticle>
          )}
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
              {isUserOwnerShip(currentUser, user) ? (
                <StyledIcon remove icon={RemoveIcon} onClick={() => handleRemove(postsRef, id)} />
              ) : null}
            </StyledIconWrapper>
          </StyledInfoWrapper>
        </StyledAuthorWrapper>
      </StyledCommentWrapper>
    </StyledWrapper>
  );
};

export default Post;

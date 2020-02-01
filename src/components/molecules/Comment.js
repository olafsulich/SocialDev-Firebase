import React from 'react';
import styled from 'styled-components';
import Heading from '../atoms/Heading/Heading';
import Text from '../atoms/Text/Text';
import CommentsIcon from '../../assets/comments.svg';
import HeartIcon from '../../assets/heart.svg';
import UserImage from '../../assets/photo.jpeg';

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
  width: 5rem;
  height: 5rem;
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
  border-radius: 30px;
  padding: 0.6rem 1.6rem;
`;
const Comment = () => (
  <StyledWrapper>
    <StyledCommentWrapper>
      <StyledAuthorWrapper>
        <StyledAuthorImage>
          <img src={UserImage} alt="author" />
        </StyledAuthorImage>
        <StyledTitleWrapper>
          <Heading>My new post!</Heading>
          <Text>Reviewing awsome book, check it out!</Text>
        </StyledTitleWrapper>
      </StyledAuthorWrapper>
      <StyledInfoWrapper>
        <StyledIconWrapper>
          <StyledIcon icon={CommentsIcon} />
          <StyledQuantity>3</StyledQuantity>
        </StyledIconWrapper>
        <StyledIconWrapper>
          <StyledIcon icon={HeartIcon} />
          <StyledQuantity>2</StyledQuantity>
        </StyledIconWrapper>
        <StyledButton>Comment</StyledButton>
      </StyledInfoWrapper>
    </StyledCommentWrapper>
  </StyledWrapper>
);

export default Comment;

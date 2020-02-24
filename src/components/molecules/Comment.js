import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledArticle = styled.article`
  display: grid;
  grid-template-columns: 3rem 70%;
  align-items: center;
  justify-content: center;
  width: 80%;
  margin: 0 3rem;
  padding: 2rem 4rem;
`;

const StyledAuthor = styled.span`
  font-size: 1.4rem;
  font-weight: ${({ theme }) => theme.bold};
  margin-right: 3rem;
`;

const StyledComment = styled.span`
  font-size: 1.2rem;
  justify-self: end;
  align-self: end;
  font-weight: ${({ theme }) => theme.light};
  padding-left: 2rem;
`;

const Comment = ({ content, userName }) => {
  return (
    <StyledArticle>
      <StyledAuthor>{userName}</StyledAuthor>
      <StyledComment>{content}</StyledComment>
    </StyledArticle>
  );
};

Comment.propTypes = {
  content: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};

export default Comment;

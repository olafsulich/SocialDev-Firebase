import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledArticle = styled.article`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 80%;
  margin: 0 3rem;
`;

const Comment = ({ content, userName }) => {
  return (
    <StyledArticle>
      <span>{userName}</span>
      <span>{content}</span>
    </StyledArticle>
  );
};

Comment.propTypes = {
  content: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};

export default Comment;

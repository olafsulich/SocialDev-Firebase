import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Heading from '../Heading/Heading';
import Text from '../Text/Text';

const StyledWrapper = styled.div`
  width: 45rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border: 1px solid #e6ecf1;
  padding: 2rem 3rem;
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

const StyledTitleWrapper = styled.article`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  max-width: 80%;
`;

const StyledHeaing = styled(Heading)`
  margin-right: 2rem;
`;

const StyledText = styled(Text)`
  padding-right: 3rem;
`;

const Comment = ({ content, userName }) => {
  return (
    <StyledWrapper>
      <StyledCommentWrapper>
        <StyledAuthorWrapper>
          <StyledTitleWrapper>
            <StyledHeaing>{userName}</StyledHeaing>
            <StyledText>{content}</StyledText>
          </StyledTitleWrapper>
        </StyledAuthorWrapper>
      </StyledCommentWrapper>
    </StyledWrapper>
  );
};

Comment.propTypes = {
  content: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};

export default Comment;

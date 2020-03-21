import React from 'react';
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
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const StyledTitleWrapper = styled.article`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
`;

interface Props {
  content: string;
  userName: string;
}

const Comment: React.FC<Props> = ({ content, userName }) => {
  return (
    <StyledWrapper>
      <StyledCommentWrapper>
        <StyledAuthorWrapper>
          <StyledTitleWrapper>
            <Heading comment>{userName}</Heading>
            <Text comment>{content}</Text>
          </StyledTitleWrapper>
        </StyledAuthorWrapper>
      </StyledCommentWrapper>
    </StyledWrapper>
  );
};

export default Comment;

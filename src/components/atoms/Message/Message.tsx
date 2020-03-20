import React from 'react';
import styled, { css } from 'styled-components';
import Text from '../Text/Text';

const StyledMessageWrapper = styled.div<UserProps>`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 1.5rem;
  position: relative;

  ${({ fromCurrentUser }) =>
    fromCurrentUser &&
    css`
      justify-content: flex-end;
    `}
`;

const StyledAuthorImage = styled.figure<UserProps>`
  display: flex;
  height: 100%;
  width: 4rem;
  position: absolute;
  top: 0rem;
  left: -1rem;

  ${({ fromCurrentUser }) =>
    fromCurrentUser &&
    css`
      right: -2rem;
      left: auto;
    `}
  img {
    width: 3rem;
    height: 3rem;
    border-radius: 100px;
  }
`;

const StyledMessage = styled(Text)<UserProps>`
  background-color: #f1f0f0;
  color: #000;
  padding: 0.6rem 1.5rem;
  border-radius: 2rem;
  max-width: 60%;
  min-height: 3rem;
  margin-left: 3rem;

  ${({ fromCurrentUser }) =>
    fromCurrentUser &&
    css`
      color: #fff;
      background-color: hsla(203, 89%, 53%, 0.8);
      margin-right: 3rem;
    `}
`;

interface UserProps {
  fromCurrentUser?: boolean;
}

interface Props {
  messageAuthor: {
    photoURL: string;
    userName: string;
  };
  message: string;
  fromCurrentUser: boolean;
}

const Message: React.FC<Props> = ({ messageAuthor, message, fromCurrentUser }) => {
  const { photoURL, userName } = messageAuthor;
  return (
    <>
      {fromCurrentUser ? (
        <StyledMessageWrapper fromCurrentUser>
          <StyledAuthorImage fromCurrentUser>
            <img src={photoURL} alt={userName || 'user'} />
          </StyledAuthorImage>
          <StyledMessage fromCurrentUser>{message}</StyledMessage>
        </StyledMessageWrapper>
      ) : (
        <StyledMessageWrapper>
          <StyledAuthorImage>
            <img src={photoURL} alt={userName} />
          </StyledAuthorImage>
          <StyledMessage>{message}</StyledMessage>
        </StyledMessageWrapper>
      )}
    </>
  );
};

export default Message;

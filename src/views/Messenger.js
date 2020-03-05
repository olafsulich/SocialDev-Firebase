import React from 'react';
import styled, { css } from 'styled-components';
import Navigation from '../components/organisms/Navigation';
import GridTemplate from '../templates/GridTemplate';
import Heading from '../components/atoms/Heading/Heading';
import Text from '../components/atoms/Text/Text';
import UserPic from '../assets/userPic.jpg';
import Input from '../components/atoms/Input/Input';
const StyledWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  @media (min-width: 650px) {
    display: grid;
    grid-template-columns: 0.5fr 3fr;
    grid-column-gap: 3rem;
  }
`;

const StyledDiv = styled.div`
  width: 100%;
  height: 90vh;
  max-height: 90vh;
  border: 1px solid #e6ecf1;
`;

const StyledHeadingWrapper = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  border-bottom: 1px solid #e6ecf1;
  padding: 2rem 3rem;
`;

const StyledChatWrapper = styled.div`
  width: 100%;
  height: 80%;
  padding: 3rem 2rem;
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  justify-items: space-between;
`;

const StyledMessageWrapper = styled.article`
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

const StyledAuthorImage = styled.figure`
  display: flex;
  height: 100%;
  width: 4rem;
  position: absolute;
  top: 0.5rem;
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

const StyledMessage = styled(Text)`
  background-color: #f1f0f0;
  color: #000;
  padding: 0.6rem 1.5rem;
  border-radius: 2rem;
  max-width: 60%;
  margin-left: 3rem;

  ${({ fromCurrentUser }) =>
    fromCurrentUser &&
    css`
      color: #fff;
      background-color: hsla(203, 89%, 53%, 0.8);
      margin-right: 3rem;
    `}
`;

const StyledButton = styled.button`
  font-size: 1.1rem;
  font-weight: ${({ theme }) => theme.regular};
  color: #fff;
  background-color: hsla(203, 89%, 53%, 0.8);
  border-radius: 30px;
  padding: 0.6rem 2.5rem;
  margin-left: 2rem;
`;

const StyledForm = styled.form`
  margin: 2rem auto;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 80%;
`;

const StyledInput = styled(Input)`
  padding: 0.8rem 2rem;
  font-size: 1rem;
  font-weight: ${({ theme }) => theme.regular};
  width: 50%;
`;

const Messenger = () => {
  return (
    <StyledWrapper>
      <Navigation />
      <GridTemplate>
        <StyledDiv>
          <StyledHeadingWrapper>
            <Heading>React room</Heading>
          </StyledHeadingWrapper>
          <StyledChatWrapper>
            <StyledMessageWrapper>
              <StyledAuthorImage>
                <img src={UserPic} alt="user pic" />
              </StyledAuthorImage>
              <StyledMessage>
                Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing
                industries for previewing layouts and visual mockups.
              </StyledMessage>
            </StyledMessageWrapper>
            <StyledMessageWrapper fromCurrentUser>
              <StyledAuthorImage fromCurrentUser>
                <img src={UserPic} alt="user pic" />
              </StyledAuthorImage>
              <StyledMessage fromCurrentUser>
                Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing
                industries for previewing layouts and visual mockups.
              </StyledMessage>
            </StyledMessageWrapper>
            <StyledMessageWrapper>
              <StyledMessage>message</StyledMessage>
            </StyledMessageWrapper>
          </StyledChatWrapper>
          <StyledForm>
            <StyledInput
              type="text"
              placeholder="Write a something..."
              name="message"
              aria-label="Write a something..."
            />
            <StyledButton type="submit">Send</StyledButton>{' '}
          </StyledForm>
        </StyledDiv>
      </GridTemplate>
    </StyledWrapper>
  );
};

export default Messenger;

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from '../atoms/Button/Button';
import PlusIcon from '../../assets/plus.svg';
import Input from '../atoms/Input/Input';
import Heading from '../atoms/Heading/Heading';

const StyledWrapper = styled.div`
  height: 100%;
  width: 100%;
  z-index: 10;
  top: 0%;
  right: 0%;
  position: absolute;
  border-left: 10px solid ${({ theme }) => theme.buttonColor};
  will-change: opacity, transform;
  opacity: ${({ isVisible }) => (isVisible ? '1' : '0')};
  transform: translateX(${({ isVisible }) => (isVisible ? '0' : '100%')});
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledFormWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 60%;
`;

const StyledHeadingWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0 0 1.5rem 1.5rem;
`;

const StyledHeading = styled(Heading)`
  font-size: 1.9rem;
`;

const StyledButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 1.5rem 0 1.5rem 1.5rem;
`;

const StyledButton = styled.button`
  font-size: 1.4rem;
  font-weight: ${({ theme }) => theme.regular};
  color: ${({ theme }) => theme.fontColorText};
  background-color: ${({ theme }) => theme.primaryColor};
  border-radius: 30px;
  padding: 0.7rem 4rem;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const StyledTextArea = styled(Input)`
  height: 40vh;
  border-radius: 20px;
  font-size: 1.4rem;
  font-weight: ${({ theme }) => theme.regular};
  margin-top: 2rem;
  padding: 15px 20px;
`;

const Sidebar = ({ isVisible, handleSidebar }) => (
  <StyledWrapper isVisible={isVisible}>
    <StyledFormWrapper>
      <StyledHeadingWrapper>
        <StyledHeading>Add post</StyledHeading>
      </StyledHeadingWrapper>
      <StyledForm>
        <Input placeholder="text" />
        <StyledTextArea as="textarea" placeholder="description" />
      </StyledForm>
      <StyledButtonWrapper>
        <StyledButton>Post</StyledButton>
      </StyledButtonWrapper>
    </StyledFormWrapper>
    <Button close icon={PlusIcon} onClick={handleSidebar} />
  </StyledWrapper>
);
Sidebar.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  handleSidebar: PropTypes.func.isRequired,
};

export default Sidebar;

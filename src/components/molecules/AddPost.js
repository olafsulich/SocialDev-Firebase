import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from '../atoms/Button/Button';
import PlusIcon from '../../assets/plus.svg';
import Input from '../atoms/Input/Input';
import Heading from '../atoms/Heading/Heading';
import UserPic from '../../assets/userPic.jpg';
const StyledWrapper = styled.div`
  width: 100%;
  height: 100vh;
  z-index: 13;
  top: 0%;
  right: 0%;
  position: fixed;
  border-left: 10px solid ${({ theme }) => theme.buttonColor};
  will-change: opacity, transform;
  opacity: ${({ isVisible }) => (isVisible ? '1' : '0')};
  transform: translateX(${({ isVisible }) => (isVisible ? '0' : '100%')});
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 50rem;

  @media (min-width: 750px) {
    width: 60%;
  }

  @media (min-width: 1000px) {
    max-width: 40rem;
  }
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
  resize: none;
`;

const AddPost = ({ isVisible, handleAddPost, handleCreate, user }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const handleTitleChange = ({ target: { value } }) => setTitle(value);
  const handleContentChange = ({ target: { value } }) => setContent(value);

  const handleSubmit = e => {
    e.preventDefault();
    const { uid, photoURL, email, userName } = user.authUser;
    const post = {
      title,
      content,
      user: {
        name: userName,
        uid,
        email,
        photoURL: photoURL || UserPic,
      },
      likes: 0,
      comments: 0,
      createdAt: new Date(),
    };
    handleCreate(post);
    setTitle('');
    setContent('');
  };

  return (
    <StyledWrapper isVisible={isVisible}>
      <StyledFormWrapper>
        <StyledHeadingWrapper>
          <StyledHeading>Add post</StyledHeading>
        </StyledHeadingWrapper>
        <StyledForm onSubmit={handleSubmit}>
          <Input placeholder="text" value={title} name="title" onChange={handleTitleChange} />
          <StyledTextArea
            as="textarea"
            placeholder="content"
            value={content}
            name="content"
            onChange={handleContentChange}
          />
        </StyledForm>
        <StyledButtonWrapper>
          <StyledButton onClick={handleSubmit}>Post</StyledButton>
        </StyledButtonWrapper>
      </StyledFormWrapper>
      <Button close icon={PlusIcon} onClick={handleAddPost} />
    </StyledWrapper>
  );
};
AddPost.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  handleAddPost: PropTypes.func.isRequired,
  handleCreate: PropTypes.func.isRequired,
  user: PropTypes.object,
};

AddPost.defaultProps = {
  user: {},
};

export default AddPost;

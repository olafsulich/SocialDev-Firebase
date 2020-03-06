import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import PropTypes from 'prop-types';
import Input from '../atoms/Input/Input';
import useUser from '../../hooks/useUser';
import UserPic from '../../assets/userPic.jpg';
import EmojiIcon from '../../assets/emoji.svg';

const StyledWrapper = styled.div`
  position: absolute;
  top: 90%;
  width: 100%;
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
  position: relative;
`;

const StyledInput = styled(Input)`
  padding: 0.8rem 2rem;
  font-size: 1rem;
  font-weight: ${({ theme }) => theme.regular};
  width: 50%;
  position: relative;

  ::placeholder {
    color: #bec3c9;
    padding-right: 1rem;
  }
`;

const StyledEmojiButton = styled.input`
  width: 2.5rem;
  height: 2.5rem;
  background: none;
  border: none;
  background-image: url(${({ icon }) => icon});
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 60% 60%;
  position: absolute;
  right: 35%;
  top: 3px;
  cursor: pointer;
`;

const AddMessage = ({ onCreate }) => {
  const [message, setMessage] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [pickerVisability, setPickerVisability] = useState(false);

  useUser(setCurrentUser);

  const handleInputChange = ({ target: { value } }) => setMessage(value);
  const handleAddEmoji = ({ native }) => {
    setMessage(prevState => prevState + native);
  };

  const handlePickerVisability = e => {
    e.preventDefault();
    setPickerVisability(prevState => !prevState);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { userName, photoURL, uid } = currentUser.authUser;
    const newMessage = {
      message,
      user: {
        name: userName,
        uid,
        photoURL: photoURL || UserPic,
      },
      createdAt: new Date(),
    };
    onCreate(newMessage);
    setMessage('');
  };
  return (
    <StyledWrapper>
      {pickerVisability ? (
        <Picker
          set="messenger"
          style={{ position: 'absolute', bottom: '85%', right: '15%', zIndex: '10' }}
          darkMode={false}
          onSelect={handleAddEmoji}
          showSkinTones={false}
          showPreview={false}
          color="#1ca0f2"
        />
      ) : null}
      <StyledForm onSubmit={handleSubmit}>
        <StyledInput
          onChange={handleInputChange}
          type="text"
          placeholder="Write something..."
          name="message"
          aria-label="Write something..."
          value={message}
        />
        <StyledEmojiButton type="button" icon={EmojiIcon} onClick={handlePickerVisability} />

        <StyledButton type="submit" onClick={handleSubmit}>
          Send
        </StyledButton>
      </StyledForm>
    </StyledWrapper>
  );
};

AddMessage.propTypes = {
  onCreate: PropTypes.func.isRequired,
};
export default AddMessage;

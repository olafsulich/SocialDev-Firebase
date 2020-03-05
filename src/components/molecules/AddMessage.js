import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Input from '../atoms/Input/Input';
import useUser from '../../hooks/useUser';

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

const AddMessage = ({ onCreate }) => {
  const [message, setMessage] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  useUser(setCurrentUser);

  const handleInputChange = ({ target: { value } }) => setMessage(value);

  const handleSubmit = e => {
    e.preventDefault();
    const { userName, photoURL } = currentUser.authUser;
    const createdAt = new Date();
    onCreate(message, userName, photoURL, createdAt);
    setMessage('');
  };
  return (
    <StyledForm>
      <StyledInput
        onChange={handleInputChange}
        type="text"
        placeholder="Write something..."
        name="message"
        aria-label="Write something..."
        value={message}
      />
      <StyledButton type="submit" onClick={handleSubmit}>
        Send
      </StyledButton>
    </StyledForm>
  );
};

AddMessage.propTypes = {
  onCreate: PropTypes.func.isRequired,
};
export default AddMessage;

import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import useUser from '../../hooks/useUser';
import UserPic from '../../assets/userPic.jpg';
const StyledWrapper = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border: 2px solid #e6ecf1;
  border-top: none;
  padding: 1rem 6rem;
  position: relative;
`;

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
  height: 100%;
  width: 100%;
  position: relative;
  margin-bottom: 2.6rem;
`;

const StyledForm = styled.form`
  height: 5rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 100%;
  max-height: 16rem;
  font-size: 1rem;
  font-weight: ${({ theme }) => theme.regular};
  margin-top: 2rem;
  padding: 20px 20px 0 20px;
  border: none;

  ::placeholder {
    color: #bec3c9;
    font-size: 1.2rem;
  }
`;

const StyledAuthorImage = styled.figure`
  display: flex;
  height: 100%;
  width: 6rem;
  position: absolute;
  top: 1.8rem;
  left: -4%;

  img {
    width: 3rem;
    height: 3rem;
    border-radius: 100px;
  }
`;

const AddRoom = ({ handleCreate }) => {
  const [title, setTitle] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  useUser(setCurrentUser);

  const handleContentChange = ({ target: { value } }) => setTitle(value);

  const handleSubmit = e => {
    e.preventDefault();
    const { uid, photoURL, email, userName } = currentUser.authUser;
    const room = {
      title,
      user: {
        name: userName,
        uid,
        email,
        photoURL: photoURL || UserPic,
      },
      createdAt: new Date(),
    };
    handleCreate(room);
    setTitle('');
  };
  return (
    <StyledWrapper>
      <StyledContainer>
        <StyledAuthorImage>
          <img
            src={currentUser ? currentUser.authUser.photoURL : null}
            alt={currentUser ? currentUser.authUser.userName : null}
          />
        </StyledAuthorImage>
        <StyledForm onSubmit={handleSubmit}>
          <StyledInput
            value={title}
            placeholder="Create room"
            name="title"
            onChange={handleContentChange}
            aria-label="Create room"
          />
        </StyledForm>
      </StyledContainer>
    </StyledWrapper>
  );
};

AddRoom.propTypes = {
  handleCreate: PropTypes.func.isRequired,
};

export default AddRoom;

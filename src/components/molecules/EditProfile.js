import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../atoms/Button/Button';
import PlusIcon from '../../assets/plus.svg';
import Input from '../atoms/Input/Input';
import Heading from '../atoms/Heading/Heading';
import { auth, firestore, storage } from '../../firebase/firebase';
import Text from '../atoms/Text/Text';
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
const StyledInput = styled(Input)`
  margin-top: 2rem;
`;
const StyledInputTypeFile = styled(Input)`
  margin: 2rem 0 10rem 0;
  cursor: pointer;
  overflow: hidden;
  border-radius: 7px;
  width: 50%;
  ::before {
    width: 100%;
    height: 100%;
    content: 'update picture';
    display: inline-block;
  }
  ::-webkit-file-upload-button {
    display: none;
  }
`;

const EditProfile = ({ isVisible, handleAddPost }) => {
  const [userName, setUserName] = useState('');
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleUserNameChange = ({ target: { value } }) => setUserName(value);

  const handChange = e => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type;
      const validImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/jpg'];
      if (validImageTypes.includes(fileType)) {
        setError('');
        setImage(file);
      } else {
        setError('Please select an image to upload');
      }
    }
  };

  const handleUpdate = () => {
    if (userName) {
      firestore.doc(`users/${auth.currentUser.uid}`).update({ userName });
    }
    if (image) {
      const uploadTask = storage
        .ref()
        .child(`user-profiles`)
        .child(auth.currentUser.uid)
        .child(image.name)
        .put(image);

      uploadTask.on(
        'state_changed',

        () => {
          storage
            .ref()
            .child(`user-profiles`)
            .child(auth.currentUser.uid)
            .child(image.name)
            .getDownloadURL()
            .then(urlPath => {
              setUrl(urlPath);
              firestore.doc(`users/${auth.currentUser.uid}`).update({ photoURL: urlPath });
            });
        },
      );
    } else {
      setError('Error please choose an image to upload');
    }
  };

  return (
    <StyledWrapper isVisible={isVisible}>
      <StyledFormWrapper>
        <StyledHeadingWrapper>
          <StyledHeading>Edit Profile</StyledHeading>
        </StyledHeadingWrapper>
        <StyledForm onSubmit={handleUpdate}>
          <StyledInput
            placeholder="user name"
            value={userName}
            name="user name"
            onChange={handleUserNameChange}
          />
          <Text>{error}</Text>
          <StyledInputTypeFile
            type="file"
            placeholder="user name"
            name="file"
            onChange={handChange}
          />
        </StyledForm>
        <StyledButtonWrapper>
          <StyledButton onClick={handleUpdate}>Edit</StyledButton>
        </StyledButtonWrapper>
      </StyledFormWrapper>
      <Button close icon={PlusIcon} onClick={handleAddPost} />
    </StyledWrapper>
  );
};

EditProfile.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  handleAddPost: PropTypes.func.isRequired,
};
export default EditProfile;

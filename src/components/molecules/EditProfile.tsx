import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Input from '../atoms/Input/Input';
import { auth, firestore, storage } from '../../firebase/firebase';
import Text from '../atoms/Text/Text';

const StyledWrapper = styled.div<{ editable: boolean }>`
  width: 90%;
  height: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border: 1px solid #e6ecf1;
  padding: 1rem 3rem;

  @media screen and (min-width: 400px) {
    width: 100%;
  }

  ${({ editable }) =>
    editable &&
    css`
      :hover {
        background-color: #f5f8fa;
        cursor: pointer;
      }
    `}
`;

const StyledEditProfile = styled.div<{ photo: boolean }>`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  padding-right: 5rem;

  ${({ photo }) =>
    photo &&
    css`
      position: relative;
    `}
  @media
    screen
    and
    (min-width: 340px) {
    padding-right: 0;
  }
`;
const StyledInputTypeFile = styled(Input)`
  cursor: pointer;
  border-radius: 100px;
  height: 100%;
  width: 5rem;
  position: absolute;
  top: 0;
  right: 0%;
  background: none;

  ::-webkit-file-upload-button {
    display: none;
  }
`;
const StyledAuthorImage = styled.figure`
  display: flex;
  height: 100%;
  width: 5rem;
  align-items: center;
  justify-content: center;

  img {
    width: 3rem;
    height: 3rem;
    border-radius: 100px;
  }

  @media screen and (min-width: 340px) {
    img {
      width: 4rem;
      height: 4rem;
      border-radius: 100px;
    }
  }
`;

const StyledText = styled(Text)<{ valueText?: boolean }>`
  color: #bec3c9;

  ${({ valueText }) =>
    valueText &&
    css`
      color: inherit;
    `}
`;

const StyledButtonWrapper = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 1.5rem;
  padding-right: 8rem;
  @media screen and (min-width: 340px) {
    padding-right: 1rem;
  }
  @media screen and (min-width: 400px) {
    width: 100%;
  }
`;

const StyledButton = styled.button`
  font-size: 1.1rem;
  font-weight: ${({ theme }) => theme.regular};
  color: #fff;
  background-color: hsla(203, 89%, 53%, 0.8);
  border-radius: 30px;
  padding: 0.4rem 3rem;

  :focus {
    color: hsla(203, 89%, 53%, 0.8);
    background: none;
    border: 2px solid hsla(203, 89%, 53%, 0.8);
  }
`;

interface Props {
  photoURL: string;
  nameOfUser: string;
}

const EditProfile: React.FC<Props> = ({ photoURL, nameOfUser }) => {
  const [userName, setUserName] = useState<string>('');
  const [image, setImage] = useState<Blob | Uint8Array | ArrayBuffer | null>(null);
  const [imageName, setImageName] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUserName(e.target.value);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const files = e.target.files[0];
      setImage(files);
      setImageName(files.name);
    }
  };

  const handleUpdate = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.FormEvent<HTMLFormElement>,
  ) => {
    if (auth.currentUser !== null) {
      e.preventDefault();
      const userUid = auth.currentUser.uid;
      const docRef = firestore.doc(`users/${userUid}`);

      if (userName) {
        docRef.update({ userName });
      }
      if (image) {
        const uploadTask = storage
          .ref()
          .child(`user-profiles`)
          .child(userUid)
          .put(image);

        uploadTask.on(
          'state_changed',

          () => {
            storage
              .ref()
              .child(`user-profiles`)
              .child(userUid)
              .getDownloadURL()
              .then(urlPath => {
                docRef.update({ photoURL: urlPath });
              });
          },
        );
      }

      setUserName('');
    }
  };

  return (
    <>
      <StyledWrapper editable>
        <StyledEditProfile photo>
          <Text>Photo</Text>
          <StyledAuthorImage tabIndex={-1}>
            <img src={photoURL} alt={nameOfUser} />
          </StyledAuthorImage>
          <StyledInputTypeFile
            type="file"
            name="file"
            onChange={handlePhotoChange}
            aria-label="Change user profile picture"
            tabIndex={0}
          />
        </StyledEditProfile>
      </StyledWrapper>
      <StyledWrapper editable>
        <StyledEditProfile as="form" photo onSubmit={handleUpdate}>
          <StyledText as="label">Name</StyledText>
          <Input
            account
            placeholder={nameOfUser}
            value={userName}
            name="user name"
            onChange={handleUserNameChange}
            aria-label="Change your user name"
            autoComplete="off"
          />
        </StyledEditProfile>
      </StyledWrapper>
      <StyledButtonWrapper>
        {error ? <Text>Error, please try later</Text> : null}
        <StyledButton onClick={handleUpdate}>Edit</StyledButton>
      </StyledButtonWrapper>
    </>
  );
};

EditProfile.propTypes = {
  photoURL: PropTypes.string.isRequired,
  nameOfUser: PropTypes.string.isRequired,
};
export default EditProfile;

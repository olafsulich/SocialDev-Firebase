import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Input from '../atoms/Input/Input';
import useUser from '../../hooks/useUser';
import EmojiIcon from '../../assets/emoji.svg';
import createDoc from '../../utils/createDoc';
import EmojiPicker from '../atoms/EmojiPicker/EmojiPicker';

const StyledFormWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  position: relative;
`;

const StyledCommentWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-top: 7rem;
`;

const StyledButton = styled.button`
  font-size: 1.1rem;
  font-weight: ${({ theme }) => theme.regular};
  color: #fff;
  background-color: hsla(203, 89%, 53%, 0.8);
  border-radius: 30px;
  padding: 0.6rem 2.5rem;
  margin-left: 8rem;

  :focus {
    color: hsla(203, 89%, 53%, 0.8);
    background: none;
    border: 2px solid hsla(203, 89%, 53%, 0.8);
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: relative;
`;

const StyledInput = styled(Input)`
  padding: 0.8rem 2rem;
  font-size: 1rem;
  font-weight: ${({ theme }) => theme.regular};

  ::placeholder {
    color: #bec3c9;
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
  right: -15%;
  top: 3px;
  cursor: pointer;
  border-radius: 30px;
  padding: 5px;

  :focus {
    border: 2px solid hsla(203, 89%, 53%, 0.6);
  }
`;

const AddComment = ({ commentRef }) => {
  const [content, setContent] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [pickerVisability, setPickerVisability] = useState(false);

  useUser(setCurrentUser);

  const handleContentChange = ({ target: { value } }) => setContent(value);

  const handleAddEmoji = ({ native }) => {
    setContent(prevState => prevState + native);
  };

  const handlePickerVisability = () => {
    setPickerVisability(prevState => !prevState);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { userName, uid } = currentUser.authUser;
    const newComment = {
      content,
      user: {
        name: userName,
        uid,
      },
      createdAt: new Date(),
    };
    createDoc(newComment, commentRef);
    setContent('');
  };

  return (
    <StyledFormWrapper>
      {pickerVisability ? (
        <EmojiPicker handleAddEmoji={handleAddEmoji} top="-40%" right="-60%" />
      ) : null}
      <StyledCommentWrapper>
        <StyledForm onSubmit={handleSubmit}>
          <StyledInput
            type="text"
            placeholder="Write a comment..."
            value={content}
            name="content"
            onChange={handleContentChange}
            aria-label="Write a comment..."
            isRequired
          />
          <StyledEmojiButton onClick={handlePickerVisability} type="button" icon={EmojiIcon} />
        </StyledForm>
        <StyledButton type="submit" onClick={handleSubmit}>
          Comment
        </StyledButton>
      </StyledCommentWrapper>
    </StyledFormWrapper>
  );
};

AddComment.propTypes = {
  commentRef: PropTypes.object.isRequired,
};
export default AddComment;

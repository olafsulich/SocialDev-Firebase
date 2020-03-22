import React, { useState } from 'react';
import styled from 'styled-components';
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

const StyledEmojiButton = styled.input<{ icon: any }>`
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
  @media (hover: none) {
    display: none;
  }
`;

interface Props {
  commentRef: {};
}

interface User {
  authUser: {
    userName: string;
    uid: string;
  };
}

const AddComment: React.FC<Props> = ({ commentRef }) => {
  const [content, setContent] = useState<string>('');
  const [pickerVisibility, setPickerVisibility] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useUser(setCurrentUser);

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setContent(e.target.value);

  const handleAddEmoji = (e: { native: string }) => {
    setContent(prevState => prevState + e.native);
  };

  const handlePickerVisibility = () => {
    setPickerVisibility(prevState => !prevState);
  };

  const handleSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.FormEvent<HTMLFormElement>,
  ) => {
    if (currentUser !== null) {
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
    }
  };
  console.log(content);
  return (
    <StyledFormWrapper>
      {pickerVisibility ? (
        <EmojiPicker handleAddEmoji={handleAddEmoji} top="-40%" right="-60%" />
      ) : null}
      <StyledCommentWrapper>
        <StyledForm onSubmit={handleSubmit}>
          <Input
            comment
            type="text"
            placeholder="Write a comment..."
            value={content}
            name="content"
            onChange={handleContentChange}
            aria-label="Write a comment..."
            required
            maxLength={150}
          />
          <StyledEmojiButton
            onClick={handlePickerVisibility}
            type="button"
            aria-label="emoji button"
            icon={EmojiIcon}
          />
        </StyledForm>
        <StyledButton type="submit" onClick={handleSubmit}>
          Comment
        </StyledButton>
      </StyledCommentWrapper>
    </StyledFormWrapper>
  );
};

export default AddComment;

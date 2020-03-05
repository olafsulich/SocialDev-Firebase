import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Text from '../atoms/Text/Text';
import { auth } from '../../firebase/firebase';
import RemoveIcon from '../../assets/delete.svg';
import isUserOwnerShip from '../../utils/isUserOwnerShip';

const StyledRoomWrapper = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  border: 2px solid #e6ecf1;
  border-top: none;
  padding: 2rem 3rem;

  ${({ heading }) =>
    heading &&
    css`
      border: none;
      background-color: #f5f8fa;
      width: 100%;
      height: 10%;
      align-items: flex-start;
      justify-content: flex-start;
      padding: 2rem 3rem;
    `}
`;
const StyledIcon = styled.div`
  width: 3rem;
  height: 3rem;
  background-image: url(${({ icon }) => icon});
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 60% 60%;
  background-color: #fff;
  border-radius: 50px;
  cursor: pointer;
  margin-left: 2rem;

  :hover {
    border-radius: 30px;
    background-color: ${({ theme }) => theme.primaryColor};
  }

  ${({ remove }) =>
    remove &&
    css`
      :hover {
        background-color: hsla(341, 75%, 51%, 0.2);
      }
    `}
`;
const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Room = ({ title, id, user }) => {
  const currentUser = auth.currentUser;

  return (
    <StyledLink to={`/rooms/${id}`}>
      <StyledRoomWrapper key={id}>
        {isUserOwnerShip(currentUser, user) ? (
          <>
            <Text>{title}</Text>
            <StyledIcon remove icon={RemoveIcon} />
          </>
        ) : (
          <Text>{title}</Text>
        )}
      </StyledRoomWrapper>
    </StyledLink>
  );
};

Room.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  user: PropTypes.object,
};

Room.defaultProps = {
  user: {},
};

export default Room;

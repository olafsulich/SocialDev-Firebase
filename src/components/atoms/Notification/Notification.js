import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import Text from '../Text/Text';

const StyledNotificationWrapper = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
      align-items: center;
      justify-content: space-between;
      padding: 2rem 3rem;
    `}
`;

const Notification = ({ content, id, userName }) => {
  return (
    <StyledNotificationWrapper key={id}>
      <Text>{userName}</Text>
      <Text>{content}</Text>
    </StyledNotificationWrapper>
  );
};

Notification.propTypes = {
  content: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};

export default Notification;

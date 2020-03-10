import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import moment from 'moment';
import Text from '../Text/Text';

const StyledWrapper = styled.section`
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
`;

const StyledNotificationWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  padding-right: 5rem;
  @media screen and (min-width: 340px) {
    padding-right: 0;
  }
`;

const StyledText = styled(Text)`
  color: #bec3c9;

  ${({ value }) =>
    value &&
    css`
      color: inherit;
    `}
`;

const StyledDate = styled.time`
  font-size: 1rem;
  margin-top: 6px;
  font-weight: ${({ theme }) => theme.regular};
`;

const UserCard = ({ name, value, createdAt }) => {
  if (createdAt) {
    return (
      <StyledWrapper>
        <StyledNotificationWrapper>
          <StyledText>{name}</StyledText>
          <StyledDate>{value.toDate ? moment(value.toDate()).calendar() : 'date'}</StyledDate>
        </StyledNotificationWrapper>
      </StyledWrapper>
    );
  }

  return (
    <StyledWrapper>
      <StyledNotificationWrapper>
        <StyledText>{name}</StyledText>
        <StyledText value>{value}</StyledText>
      </StyledNotificationWrapper>
    </StyledWrapper>
  );
};

UserCard.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  createdAt: PropTypes.bool,
};
UserCard.defaultProps = {
  createdAt: false,
};
export default UserCard;

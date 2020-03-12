import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import moment from 'moment';
import Text from '../Text/Text';

const StyledWrapper = styled.article`
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

const StyledUserCard = styled.div`
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

  ${({ textValue }) =>
    textValue &&
    css`
      color: inherit;
    `}
`;

const StyledDate = styled.span`
  font-size: 1rem;
  margin-top: 6px;
  font-weight: ${({ theme }) => theme.regular};
`;

const UserCard = ({ textName, textValue, createdAt }) => {
  if (createdAt) {
    return (
      <StyledWrapper>
        <StyledUserCard>
          <StyledText as="h2">{textName}</StyledText>
          <StyledDate>
            {textValue.toDate ? moment(textValue.toDate()).calendar() : 'date'}
          </StyledDate>
        </StyledUserCard>
      </StyledWrapper>
    );
  }

  return (
    <StyledWrapper>
      <StyledUserCard>
        <StyledText as="h2">{textName}</StyledText>
        <StyledText textValue>{textValue}</StyledText>
      </StyledUserCard>
    </StyledWrapper>
  );
};

UserCard.propTypes = {
  textName: PropTypes.string.isRequired,
  textValue: PropTypes.any.isRequired,
  createdAt: PropTypes.bool,
};
UserCard.defaultProps = {
  createdAt: false,
};
export default UserCard;

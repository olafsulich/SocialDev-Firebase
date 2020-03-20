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

const StyledText = styled(Text)<TextProps>`
  color: ${props => (props.styledText ? 'inherit' : '#bec3c9')};
`;

const StyledDate = styled.span`
  font-size: 1rem;
  margin-top: 6px;
  font-weight: ${({ theme }) => theme.regular};
`;

interface TextProps {
  styledText?: boolean;
}

interface Props {
  textName: string;
  textValue: {
    toDate: () => {};
  };
  createdAt: {};
  styledText: boolean;
}

const UserCard: React.FC<Props> = ({ textName, textValue, createdAt }) => {
  return (
    <StyledWrapper>
      <StyledUserCard>
        <StyledText>{textName}</StyledText>
        {createdAt ? (
          <StyledDate>{textValue ? moment(textValue.toDate()).calendar() : 'date'}</StyledDate>
        ) : (
          <StyledText styledText>{textValue}</StyledText>
        )}
      </StyledUserCard>
    </StyledWrapper>
  );
};

export default UserCard;

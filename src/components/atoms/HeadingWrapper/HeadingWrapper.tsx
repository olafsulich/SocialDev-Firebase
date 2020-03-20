import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Heading from '../Heading/Heading';

const StyledHeadingWrapper = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 2rem 3rem;
  border: none;
  background-color: hsla(203, 89%, 53%, 0.6);

  h1 {
    color: #fff;
  }
`;

interface Props {
  headingName: string;
}

const HeadingWrapper: React.FC<Props> = ({ headingName }) => {
  return (
    <StyledHeadingWrapper>
      <Heading as="h1">{headingName}</Heading>
    </StyledHeadingWrapper>
  );
};

export default HeadingWrapper;

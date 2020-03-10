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
  background-color: #f5f8fa;
`;

const HeadingWrapper = ({ headingName }) => {
  return (
    <StyledHeadingWrapper>
      <Heading>{headingName}</Heading>
    </StyledHeadingWrapper>
  );
};

HeadingWrapper.propTypes = {
  headingName: PropTypes.string.isRequired,
};

export default HeadingWrapper;

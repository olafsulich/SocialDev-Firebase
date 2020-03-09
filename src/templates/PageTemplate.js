import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Navigation from '../components/organisms/Navigation';
import GridTemplate from './GridTemplate';

const StyledWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  @media (min-width: 850px) {
    display: grid;
    grid-template-columns: 0.5fr 3fr;
    grid-column-gap: 3rem;
  }
`;

const PageTemplate = ({ children }) => (
  <StyledWrapper>
    <Navigation />
    <GridTemplate>{children}</GridTemplate>
  </StyledWrapper>
);

PageTemplate.propTypes = {
  children: PropTypes.any.isRequired,
};
export default PageTemplate;

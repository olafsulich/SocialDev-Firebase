import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledGrid = styled.div`
  width: 100%;
  height: 85%;
  grid-column: 2/3;
  margin-top: 3rem;
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 5rem;
  align-items: center;
  justify-content: flex-start;
  padding: 1rem 2rem 0 2rem;
  margin-bottom: 10vh;
`;
const GridTemplate = ({ children }) => <StyledGrid>{children}</StyledGrid>;
GridTemplate.propTypes = {
  children: PropTypes.any.isRequired,
};
export default GridTemplate;

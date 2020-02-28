import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledGrid = styled.div`
  width: 100%;
  height: 85%;
  grid-column: 2/3;
  display: grid;
  grid-template-columns: 1fr;
  /* grid-row-gap: 4rem; */
  align-items: center;
  justify-items: center;
  padding: 1rem 10rem 0 0;
  margin: 6rem 0 4rem 0;
`;
const GridTemplate = ({ children }) => <StyledGrid>{children}</StyledGrid>;
GridTemplate.propTypes = {
  children: PropTypes.any.isRequired,
};
export default GridTemplate;

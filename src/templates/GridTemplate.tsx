import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledGrid = styled.div`
  width: 100%;
  height: 85%;
  grid-column: 2/3;
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  justify-items: center;
  margin: 0 0 8.5rem 0;
  padding: 0rem 10rem 0 0;
  @media only screen and (max-width: 850px) {
    padding: 0;
    grid-column: 1/2;
  }
`;

interface Props {
  children: React.ReactNode;
}
const GridTemplate: React.FC<Props> = ({ children }) => <StyledGrid>{children}</StyledGrid>;

export default GridTemplate;

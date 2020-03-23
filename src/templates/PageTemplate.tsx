import React from 'react';
import styled from 'styled-components';
import Navigation from '../components/organisms/Navigation';
import GridTemplate from './GridTemplate';

const StyledWrapper = styled.section`
  width: 100%;
  overflow: hidden;
  @media (min-width: 850px) {
    display: grid;
    grid-template-columns: 0.5fr 3fr;
    grid-column-gap: 3rem;
  }
`;

interface Props {
  children: React.ReactNode;
}

const PageTemplate: React.FC<Props> = ({ children }) => (
  <StyledWrapper>
    <Navigation />
    <GridTemplate>{children}</GridTemplate>
  </StyledWrapper>
);

export default PageTemplate;

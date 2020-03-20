import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
from {
   transform: rotate(0deg); 
}
to { 
    transform: rotate(360deg); 
  }
`;

const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10rem;
`;

const StyledLoaderCircle = styled.div`
  display: inline-block;
  box-sizing: border-box;
  padding: 30px;
  width: 8rem;
  height: 140px;
`;

const StyledCircle = styled.div`
  box-sizing: border-box;
  width: 3rem;
  height: 3rem;
  border-radius: 100%;
  border: 8px solid #f5f8fa;
  border-top-color: hsla(203, 89%, 53%, 0.8);
  animation: ${spin} 1s infinite linear;
`;

const Loader: React.FC = () => (
  <StyledWrapper data-testid="loader">
    <StyledLoaderCircle>
      <StyledCircle />
    </StyledLoaderCircle>
  </StyledWrapper>
);
export default Loader;

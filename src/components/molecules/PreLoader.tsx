import React from 'react';
import styled from 'styled-components';
import Logo from '../../assets/logo.svg';

const StyledWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.secondaryColor};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledLogo = styled.img`
  width: 12rem;
  height: 12rem;
`;

const PreLoader = () => {
  return (
    <StyledWrapper>
      <StyledLogo src={Logo} />
    </StyledWrapper>
  );
};

export default PreLoader;

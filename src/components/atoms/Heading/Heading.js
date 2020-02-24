import styled, { css } from 'styled-components';

const StyledHeading = styled.h2`
  display: inline;
  font-size: 2.3rem;
  font-weight: ${({ theme }) => theme.bold};
  color: ${({ theme }) => theme.fontColorText};

  &.active {
    background-color: ${({ theme }) => theme.primaryColor};
    border-radius: 30px;
    padding: 0.4rem 1rem;
  }
`;

export default StyledHeading;

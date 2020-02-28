import styled, { css } from 'styled-components';

const StyledHeading = styled.h2`
  display: inline;
  font-size: 1.2rem;
  font-weight: ${({ theme }) => theme.bold};
  color: ${({ theme }) => theme.fontColorText};
  margin-bottom: 1rem;
`;

export default StyledHeading;

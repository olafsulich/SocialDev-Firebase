import styled from 'styled-components';

const StyledHeading = styled.h2`
  display: inline;
  font-size: 1.2rem;
  font-weight: ${({ theme }) => theme.bold};
  color: ${({ theme }) => theme.fontColorText};
`;

export default StyledHeading;

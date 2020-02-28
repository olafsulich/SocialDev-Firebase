import styled from 'styled-components';

const StyledText = styled.p`
  display: inline;
  font-size: 1.1rem;
  font-weight: ${({ theme }) => theme.regular};
  color: ${({ theme }) => theme.fontColorText};
  line-height: 1.7rem;
`;

export default StyledText;

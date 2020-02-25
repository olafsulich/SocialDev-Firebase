import styled from 'styled-components';

const StyledInput = styled.input`
  width: 24rem;
  padding: 1.8rem 2.6rem;
  font-size: 1.2rem;
  font-weight: ${({ theme }) => theme.regular};
  background-color: ${({ theme }) => theme.tertiaryColor};
  padding: 10px 20px 10px 20px;
  border: none;
  border-radius: 50px;
  ::placeholder {
    letter-spacing: 1px;
    color: ${({ theme }) => theme.fontColorText};
  }
`;

export default StyledInput;

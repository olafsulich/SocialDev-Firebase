import styled from 'styled-components';

const StyledInput = styled.input`
  width: 24rem;
  padding: 15px 30px;
  font-size: 1.2rem;
  font-weight: ${({ theme }) => theme.regular};
  background-color: ${({ theme }) => theme.thirdaryColor};
  padding: 10px 20px 10px 20px;
  border: none;
  border-radius: 50px;
  ::placeholder {
    letter-spacing: 1px;
    color: ${({ theme }) => theme.fontColorText};
  }
`;

export default StyledInput;

import styled, { css } from 'styled-components';

interface Props {
  account?: boolean;
  comment?: boolean;
}

const StyledInput = styled.input<Props>`
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

  ${({ account }) =>
    account &&
    css`
      width: 12rem;
      background: none;
      color: inherit;
      font-weight: inherit;
      padding-left: 4rem;
    `}

  ${({ comment }) =>
    comment &&
    css`
      padding: 0.8rem 2rem;
      font-size: 1rem;
      font-weight: ${({ theme }) => theme.regular};

      ::placeholder {
        color: #bec3c9;
      }
    `}
`;

export default StyledInput;

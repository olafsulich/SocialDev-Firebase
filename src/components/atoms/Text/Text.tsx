import styled, { css } from 'styled-components';

interface Props {
  errorMessage?: boolean;
  comment?: boolean;
}

const StyledText = styled.p<Props>`
  display: inline;
  font-size: 1.1rem;
  font-weight: ${({ theme }) => theme.regular};
  color: ${({ theme }) => theme.fontColorText};
  line-height: 1.7rem;
  ${({ errorMessage }) =>
    errorMessage &&
    css`
      color: red;
      font-size: 0.9rem;
      min-width: 200px;
      text-align: center;
    `};

  ${({ comment }) =>
    comment &&
    css`
      padding-right: 3rem;
    `};
`;

export default StyledText;

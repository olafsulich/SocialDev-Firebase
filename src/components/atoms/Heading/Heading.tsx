import styled, { css } from 'styled-components';

interface Props {
  comment?: boolean;
}

const StyledHeading = styled.h2<Props>`
  display: inline;
  font-size: 1.2rem;
  font-weight: ${({ theme }) => theme.bold};
  color: ${({ theme }) => theme.fontColorText};

  ${({ comment }) =>
    comment &&
    css`
      margin-right: 2rem;
    `};
`;

export default StyledHeading;

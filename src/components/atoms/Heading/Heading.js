import styled from 'styled-components';

const StyledHeading = styled.h2`
  display: inline;
  font-size: 1.5rem;
  font-weight: ${({ theme }) => theme.bold};
  color: ${({ theme }) => theme.fontColorText};
  padding: 0.5rem 1rem 0.3rem 3rem;
  margin: 0 0 0.3rem 0;
  position: relative;

  ::before {
    content: '';
    width: 2.5rem;
    height: 2.5rem;
    background-image: url(${({ icon }) => icon});
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: 60% 60%;
    position: absolute;
    left: 3px;
    top: 2px;
  }

  &.active {
    color: hsla(203, 89%, 53%, 0.8);
  }
  :hover {
    border-radius: 30px;
    background-color: ${({ theme }) => theme.primaryColor};
    color: hsla(203, 89%, 53%, 0.8);
  }
`;

export default StyledHeading;

import styled, { css } from 'styled-components';

const StyledIcon = styled.button`
  width: 4rem;
  height: 4rem;
  background-image: url(${({ icon }) => icon});
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 60% 60%;
  background-color: #fff;
  border: none;
  ${({ active }) =>
    active &&
    css`
      border-radius: 15px;
      background-color: ${({ theme }) => theme.primaryColor};
    `}
  ${({ add }) =>
    add &&
    css`
      width: 5rem;
      height: 5rem;
      position: absolute;
      top: 80%;
      right: 5%;
      border-radius: 50px;
      background-color: ${({ theme }) => theme.buttonColor};
      background-size: 50% 50%;
    `}
      ${({ close }) =>
        close &&
        css`
          width: 5rem;
          height: 5rem;
          position: absolute;
          top: 85%;
          right: 5%;
          border-radius: 50px;
          background-color: ${({ theme }) => theme.buttonColor};
          background-size: 50% 50%;
          transform: rotate(45deg);
        `}
`;

export default StyledIcon;

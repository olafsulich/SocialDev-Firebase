import styled from 'styled-components';

const StyledIcon = styled.button<{ icon: any }>`
  width: 4rem;
  height: 4rem;
  background-image: url(${({ icon }) => icon});
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 60% 60%;
  background-color: #fff;
  border: none;

  &.active {
    border-radius: 15px;
    background-color: ${({ theme }) => theme.primaryColor};
  }
`;

export default StyledIcon;

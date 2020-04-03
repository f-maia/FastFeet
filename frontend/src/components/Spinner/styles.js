import styled, { keyframes } from 'styled-components';

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const SpinnerIcon = styled.div`
  animation: ${rotate360} 0.75s linear infinite;
  transform: translateZ(0);

  border: 2px solid lighten(0.2, '#7d40e7');
  border-left: 3px solid #7d40e7;
  background: transparent;
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  border-radius: 50%;
`;

export const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

import styled from 'styled-components';

export const Background = styled.div`
  display: ${({ show }) => (show ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 3;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.7); /* Black w/ opacity */
`;

export const Container = styled.div`
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 450px;
  background: #fff;
  padding: 25px;
`;

export const Outside = styled.div`
  position: fixed;
  z-index: 2;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
`;

import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

export const Background = styled.View`
  background-color: #7d40e7;
  height: 100px;
  width: 100%;
`;

export const ContentContainer = styled.View`
  margin-top: -95px;
  padding: ${({ pad }) => `${pad}px`};
  padding-bottom: 0;
  flex: 1;
`;

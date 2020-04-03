import styled, { css } from 'styled-components';

export const customStyle = css`
  &:nth-child(3) {
    flex: 3;
  }
`;

export const Warning = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
  color: #ff386d;
  margin-top: 25px;
`;

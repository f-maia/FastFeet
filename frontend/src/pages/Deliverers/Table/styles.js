import styled, { css } from 'styled-components';

export const customStyle = css`
  &:first-child {
    width: unset;
    max-width: unset;
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

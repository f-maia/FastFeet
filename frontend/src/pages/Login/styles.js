import styled from 'styled-components';

export const InputRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;

  &:last-child {
    margin-bottom: 0;
  }

  & > div:not(:first-child) {
    margin-left: 16px;
  }
`;

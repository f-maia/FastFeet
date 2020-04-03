import styled, { css } from 'styled-components';

export const InputRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const customStyle = css`
  & {
    align-items: center;
    justify-content: center;
    margin-bottom: 25px;
  }

  label {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 150px;
    height: 150px;
    background: transparent;
    border: 1px dashed #ddd;
    border-radius: 50%;
    margin: 0;

    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
    }

    span {
      color: #ddd;
      font-weight: bold;
      font-size: 16px;
      align-self: center;
    }

    input {
      display: none;
    }
  }
`;

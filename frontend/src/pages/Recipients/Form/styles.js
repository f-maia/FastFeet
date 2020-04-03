import styled, { css } from 'styled-components';

export const InputRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;

  &:last-child {
    margin-bottom: 0;
  }

  div:not(:first-child) {
    margin-left: 16px;
  }
`;

export const largerInput = css`
  flex: 3;
`;

export const numberInput = css`
  width: 150px;
  max-width: 150px;

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }
`;

export const AddressDetailsInput = css`
  width: 150px;
  max-width: 150px;
`;

import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;

  label {
    color: #444;
    font-weight: bold;
    font-size: 14px;
    margin-bottom: 7px;
    text-align: left;
  }

  input {
    background: #fff;
    border: 1px #ddd solid;
    border-radius: 4px;
    height: 45px;
    padding: 12px 15px;
    font-size: 16px;
    color: #444;
    flex: 1;

    &::placeholder {
      color: rgba(153, 153, 153, 1);
    }
  }

  span {
    color: #ff386d;
    align-self: flex-start;
    margin-top: 5px;
    font-weight: bold;
  }

  ${({ customStyle }) => customStyle}
`;

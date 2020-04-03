import styled from 'styled-components';

export const DelivererContainer = styled.div`
  display: flex;
  align-items: center;

  span {
    margin-left: 5px;
  }
`;

export const Tag = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  height: 25px;
  border-radius: 12px;
  background: ${({ backgroundColor }) => backgroundColor};

  div {
    height: 10px;
    width: 10px;
    background-color: ${({ color }) => color};
    border-radius: 50%;
    display: inline-block;
  }

  span {
    margin-left: 6px;
    font-size: 14px;
    font-weight: bold;
    color: ${({ color }) => color};
  }
`;

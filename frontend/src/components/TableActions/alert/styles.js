import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 20px 75px rgba(0, 0, 0, 0.13);
  padding: 25px;
  max-width: 450px;
`;

export const Title = styled.h1`
  font-size: 26px;
  color: #444;
  margin-bottom: 10px;
`;

export const Message = styled.p`
  color: #999;
  font-size: 14px;
  margin-bottom: 25px;
  white-space: pre-wrap;
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    font-weight: bold;
    font-size: 16px;
    color: #fff;
    border: 0;
    border-radius: 4px;
    background-color: #999;
    padding: 5px;
    width: 100px;

    &:first-child {
      background-color: #7d40e7;
      margin-right: 5px;
    }
  }
`;

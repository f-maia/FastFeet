import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #7d40e7;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 360px;
  padding: 60px 30px;
  text-align: center;
  background: #fff;
  border: 0;
  border-radius: 4px;

  img {
    height: 45px;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 40px;
    max-width: 300px;

    button {
      height: 45px;
      background: #7d40e7;
      font-weight: bold;
      text-align: center;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#7d40e7')};
      }
    }
  }
`;

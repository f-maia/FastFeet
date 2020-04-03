import styled from 'styled-components';

export const OrderInfo = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  div {
    display: flex;
    flex-direction: column;
    line-height: 26px;

    strong {
      color: #444;
      font-size: 14px;
    }

    p {
      color: #666;
      font-size: 16px;

      strong {
        color: #666;
        font-size: 16px;
      }
    }

    &:not(:last-child) {
      padding-bottom: 10px;
      border-bottom: 1px solid #eee;
      margin-bottom: 10px;
    }

    div {
      display: flex;
      justify-content: center;
      align-items: center;
      max-height: 90vh;
      overflow: auto;

      img {
        margin-top: 10px;
        max-width: 400px;
        max-height: 400px;
        width: unset;
        height: unset;
        border-radius: unset;
      }
    }
  }
`;

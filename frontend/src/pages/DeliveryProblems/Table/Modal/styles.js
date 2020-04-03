import styled from 'styled-components';

export const ProblemInfo = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  div {
    display: flex;
    max-height: 90vh;
    overflow: auto;
    flex-direction: column;
    line-height: 26px;

    strong {
      color: #444;
      font-size: 14px;
    }

    p {
      color: #666;
      font-size: 16px;
    }
  }
`;

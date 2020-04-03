import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
`;

export const ArrowLeft = styled.div`
  width: 0;
  height: 0;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-right: 16px solid
    ${({ disabled }) => (disabled ? darken(0.3, '#f5f5f5') : '#7d40e7')};
  cursor: ${({ disabled }) => (disabled ? 'unset' : 'pointer')};
`;

export const CurrentPage = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #7d40e7;
  margin: 0 15px;
  text-align: center;
  line-height: 16px;
`;

export const ArrowRigth = styled.div`
  width: 0;
  height: 0;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-left: 16px solid
    ${({ disabled }) => (disabled ? darken(0.3, '#f5f5f5') : '#7d40e7')};
  cursor: ${({ disabled }) => (disabled ? 'unset' : 'pointer')};
`;

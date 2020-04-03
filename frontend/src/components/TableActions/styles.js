import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
`;

export const Badge = styled.button`
  position: relative;
  background: none;
  border: 0;
  z-index: unset;
`;

export const ActionList = styled.div`
  position: absolute;
  min-width: 150px;
  width: ${({ width }) => `${width}px`};
  left: ${({ left }) => `${left}px`};
  top: ${({ top }) => `${top}px`};
  background: #fff;
  border: 1px solid #00000026;
  border-radius: 4px;
  padding: 15px 10px;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  z-index: 1;

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: ${({ arrowLeft }) => `${arrowLeft}px`};
    top: ${({ arrowTop }) => `${arrowTop - 1}px`};
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 6px solid #00000026;
    z-index: 2;
  }

  &::after {
    top: ${({ arrowTop }) => `${arrowTop}px`};
    border-bottom-color: #fff;
  }
`;

export const ActionContainer = styled.div`
  &:not(:first-child) {
    padding-top: 6px;
    margin-top: 6px;
    border-top: 1px #00000026 solid;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border: 0;
    width: 100%;
    background: transparent;

    span {
      font-size: 16px;
      margin-left: 8px;
      color: #999;
    }
  }
`;

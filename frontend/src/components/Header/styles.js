import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  flex: 1;
  height: 64px;
  background: #fff;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  border-bottom: 1px solid #ddd;
  width: 100%;
`;

export const PagesContainer = styled.div`
  display: flex;
  align-items: center;

  img {
    height: 30px;
    width: 166px;
    padding: 2px 30px 2px 0;
    border-right: 1px solid #ddd;
    margin-right: 10px;
  }
`;

export const PageTitle = styled(Link).attrs((props) => ({
  to: props.to,
}))`
  font-weight: bold;
  line-height: 20px;
  height: 20px;
  margin-left: 21px;
  font-size: 15px;
  color: ${(props) => (props.selected ? '#444' : '#999')};
`;

export const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  font-size: 14px;
`;

export const Username = styled.strong`
  color: #666;
`;

export const Logout = styled.button`
  border: none;
  background: none;
  color: #de3b3b;
`;

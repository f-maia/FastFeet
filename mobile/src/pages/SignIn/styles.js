import styled from 'styled-components';

export const Background = styled.View`
  flex: 1;
  background: #7d40e7;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.View`
  align-items: center;
  justify-content: center;
  padding: 0 25px;
  width: 100%;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  height: 45px;
  margin: 37px 0 15px;
  width: 100%;
  padding: 0 20px;
  background: #fff;
  border: solid 1px #ddd;
  border-radius: 4px;
`;

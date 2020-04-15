import styled from 'styled-components/native';

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#999',
  textAlignVertical: 'top',
})`
  border: 0.3px solid rgba(0, 0, 0, 0.1);
  background: #fff;
  margin-bottom: 20px;
  padding: 20px;
  min-height: 50%;
  height: 70%;
  max-height: 300px;
  border-radius: 4px;
  font-size: 16px;
`;

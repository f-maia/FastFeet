import styled from 'styled-components';
import { RectButton } from 'react-native-gesture-handler';

export const DetailsContainer = styled.View`
  background-color: #fff;
  border: 0.3px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  margin-bottom: 10px;
  width: 100%;
  padding: 10px;
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  margin-bottom: 5px;
  align-items: center;
`;

export const HeaderText = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: #7d40e7;
  margin-left: 5px;
`;

export const InfoContainer = styled.View`
  justify-content: space-between;
`;

export const Info = styled.View``;

export const InfoTitle = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #999;
  margin-bottom: 5px;
`;

export const InfoData = styled.Text`
  font-size: 14px;
  color: #444;
`;

export const InfoWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const OptionsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 83px;
  border-radius: 4px;
  border: 0.3px solid rgba(0, 0, 0, 0.1);
`;

export const OptionButtonContainer = styled.View`
  flex: 1;
`;

export const Option = styled(RectButton)`
  background: ${({ disabled }) => (disabled ? '#ddd' : '#f8f9fd')};
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const OptionText = styled.Text`
  width: 60px;
  text-align: center;
  font-size: 12px;
  color: ${({ disabled }) => (disabled ? '#bbb' : '#999')};
`;

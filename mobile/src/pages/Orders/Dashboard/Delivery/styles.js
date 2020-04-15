import styled from 'styled-components';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const Container = styled.View`
  background-color: #fff;
  border: 0.3px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  margin-bottom: 20px;
  height: 169px;
  width: 100%;
`;

export const TitleContainer = styled.View`
  padding: 0 15px;
  padding-top: 10px;
  padding-bottom: 0;
  flex-direction: row;
  height: 50px;
  margin-bottom: 10px;
`;

export const Title = styled.Text`
  color: #7d40e7;
  font-size: 14px;
  font-weight: bold;
  margin-left: 10px;
`;

export const StatusContainer = styled.View`
  padding: 0 15px;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const Dots = styled.View`
  flex-direction: row;
  width: 240px;
  height: 1px;
  justify-content: space-between;
  border: 0.5px solid #7d40e7;
  margin-top: -15px;
  margin-bottom: 10px;
`;

export const Dot = styled.View`
  border: 1px solid #7d40e7;
  margin-top: -5px;
  margin-left: -5px;
  margin-right: -5px;
  width: 10px;
  height: 10px;
  line-height: 10px;
  border-radius: 5px;
  background: ${({ completed }) => (completed ? '#7d40e7' : '#fff')};
`;

export const StatusTypes = styled.View`
  width: 288px;
  flex-direction: row;
  justify-content: space-between;
`;

export const Status = styled.Text`
  text-align: center;
  width: 45px;
  font-size: 8px;
  color: #999;
`;

export const InfoContainer = styled.View`
  padding: 0 15px;
  background-color: #f8f9fd;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  height: 64px;
`;

export const Info = styled.View`
  align-items: flex-start;
  justify-content: flex-end;
`;

export const InfoTitle = styled.Text`
  font-weight: bold;
  font-size: 8px;
  color: #999;
`;

export const InfoData = styled.Text`
  color: #444;
  font-size: 12px;
  font-weight: bold;
`;

export const InfoDetails = styled(TouchableOpacity)``;

export const InfoDetailsText = styled.Text`
  color: #7d40e7;
  font-size: 12px;
  font-weight: bold;
`;

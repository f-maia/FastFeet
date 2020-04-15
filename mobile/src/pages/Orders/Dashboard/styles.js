import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  padding: 10px 20px;
  padding-bottom: 0;
  background: #fff;
`;

export const HeaderContainer = styled.View`
  width: 100%;
  height: 70px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  margin-bottom: 20px;
`;

export const UserInfoContainer = styled.View`
  flex-direction: row;
`;

export const UserInfo = styled.View`
  margin-left: 12px;
  align-items: flex-start;
  justify-content: center;
`;

export const Greeting = styled.Text`
  color: #666;
  font-size: 12px;
`;

export const Username = styled.Text`
  color: #444;
  font-size: 22px;
  font-weight: bold;
`;

export const Logout = styled(TouchableOpacity)``;

export const ListContainer = styled.View`
  flex: 1;
  justify-content: center;
`;

export const ListHeader = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  margin-bottom: 10px;
`;
export const HeaderTitle = styled.Text`
  color: #444;
  font-size: 22px;
  font-weight: bold;
`;

export const HeaderFilters = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 130px;
`;

export const FilterButton = styled.TouchableOpacity``;

export const FilterText = styled.Text`
  color: ${({ selected }) => (selected ? '#7D40E7' : '#666')};
  font-size: 12px;
  font-weight: bold;
  text-decoration: ${({ selected }) =>
    selected ? 'underline #7D40E7' : 'none'};
`;

export const DeliveriesList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;

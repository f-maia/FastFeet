import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
`;

export const HeaderText = styled.Text`
  font-weight: bold;
  color: #fff;
  font-size: 18px;
`;

export const ProblemsList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  nestedScrollEnabled: true,
})``;

export const ProblemContainer = styled.View`
  padding: 10px 20px;
  padding-bottom: 0;
  border: 0.3px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  margin-bottom: 15px;
  background-color: #fff;
  min-height: 56px;
  max-height: 200px;
`;

export const ProblemHeader = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  margin-bottom: 5px;
`;

export const ProblemTopic = styled.Text`
  font-size: 12px;
  color: #c1c1c1;
  font-weight: bold;
`;

export const ProblemDate = styled.Text`
  font-size: 12px;
  color: #c1c1c1;
`;

export const ProblemScroll = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  nestedScrollEnabled: true,
})``;

export const ProblemText = styled.Text`
  text-align: justify;
  font-size: 16px;
  line-height: 21px;
  color: #999;
  padding-bottom: 10px;
`;

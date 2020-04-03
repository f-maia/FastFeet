import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 34px;
  width: 900px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 27px;
`;

export const Title = styled.h1`
  font-size: 24px;
  color: #444;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 240px;
`;

export const OptionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 112px;
  height: 36px;
  background: ${({ color }) => color};
  color: #fff;
  border: 0;
  border-radius: 4px;
  font-weight: bold;
  font-size: 14px;

  span {
    text-align: end;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 4px;
  padding: 30px;
`;

export const SpinnerContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

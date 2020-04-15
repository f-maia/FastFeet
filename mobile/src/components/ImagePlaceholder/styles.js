import styled from 'styled-components';
import { lighten, darken } from 'polished';

export const Container = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  border-radius: ${({ size }) => `${size / 2}px`};

  background-color: ${({ color }) => {
    const light = lighten(0.3, color);
    if (light === '#fff') {
      return darken(0.3, color);
    }

    return light;
  }};
`;
export const Name = styled.Text`
  font-weight: bold;
  font-size: ${({ size }) => `${size / 2}px`};
  color: ${({ color }) => color};
`;

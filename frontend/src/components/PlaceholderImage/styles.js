import styled from 'styled-components';
import { lighten, darken } from 'polished';

export const Image = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  width: 35px;
  height: 35px;
  border-radius: 50%;

  color: ${({ color }) => color};
  background-color: ${({ color }) => {
    const light = lighten(0.3, color);
    if (light === '#fff') {
      return darken(0.3, color);
    }

    return light;
  }};
`;

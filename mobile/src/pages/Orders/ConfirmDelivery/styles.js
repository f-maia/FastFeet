import styled from 'styled-components/native';
import { RNCamera } from 'react-native-camera';

export const Camera = styled(RNCamera)`
  align-items: center;
  align-self: center;
  flex: 1;
  width: 100%;
  border: 0.3px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  margin-bottom: 15px;
  overflow: hidden;
`;

export const PictureButton = styled.TouchableOpacity`
  position: absolute;
  background: rgba(0, 0, 0, 0.3);
  height: 62px;
  width: 62px;
  border-radius: 31px;
  bottom: 22px;
  align-items: center;
  justify-content: center;
`;

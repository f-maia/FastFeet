import React, { useRef, useState } from 'react';
import { CommonActions } from '@react-navigation/native';
import { StyleSheet, Alert } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import CustomBackground from '~/components/CustomBackground';
import Button from '~/components/Button';

import { Camera, PictureButton } from './styles';

export default function ConfirmDelivery({ route, navigation }) {
  const { id } = route.params;

  const [formData, setFormData] = useState(null);
  const camera = useRef(null);

  async function endDelivery() {
    if (!formData) return;

    try {
      await api.put(`/delivery/${id}/end`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      Alert.alert(
        'Confirmar entrega',
        `Entrega da encomenda ${id} confirmada com sucesso!`,
        [
          {
            text: 'OK!',
            onPress: () =>
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'Dashboard' }],
                })
              ),
          },
        ]
      );
    } catch (err) {
      console.tron.log(err);
      Alert.alert(
        'Erro',
        'Ocorreu um erro ao confirmar a entrega. Tente novamente.'
      );
    }
  }

  async function takePicture() {
    if (camera) {
      const options = {
        quality: 0.5,
        base64: true,
        forceUpOrientation: true,
        fixOrientation: true,
      };

      const data = await camera.current.takePictureAsync(options);
      const fileName = data.uri
        .slice(data.uri.lastIndexOf('/') + 1, data.uri.length)
        .split('.')[0];
      const multipartFormData = new FormData();
      multipartFormData.append('file', {
        uri: data.uri,
        name: `signature_${fileName}.jpg`,
        type: 'image/*',
      });
      setFormData(multipartFormData);
    }
  }

  const style = StyleSheet.create({
    shadow: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
      position: 'relative',
    },
  });

  return (
    <CustomBackground>
      <Camera style={style.shadow} ref={camera} captureAudio={false}>
        <PictureButton onPress={takePicture}>
          <Icon size={26} color="#fff" name="camera-alt" />
        </PictureButton>
      </Camera>

      <Button
        style={{ marginBottom: 20 }}
        onPress={endDelivery}
        disabled={!formData}
      >
        Enviar
      </Button>
    </CustomBackground>
  );
}

ConfirmDelivery.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

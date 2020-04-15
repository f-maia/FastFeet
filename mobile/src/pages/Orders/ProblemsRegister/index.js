import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Alert } from 'react-native';

import api from '~/services/api';

import CustomBackground from '~/components/CustomBackground';
import Button from '~/components/Button';

import { Input } from './styles';

export default function ProblemsRegister({ route, navigation }) {
  const { id } = route.params;

  const [loading, setLoading] = useState(false);
  const [problem, setProblem] = useState('');

  async function handleSubmit() {
    if (!problem) return;

    setLoading(true);

    try {
      if (problem.trim().length === 0) throw new Error();

      await api.post(`/delivery/${id}/problems`, {
        description: problem,
      });

      Alert.alert('Problema registrado com sucesso!', `Descrição: ${problem}`, [
        { text: 'OK!', onPress: () => navigation.goBack() },
      ]);
    } catch (err) {
      Alert.alert(
        'Ocorreu um erro',
        'Verifique a descrição do problema e tente novamente!'
      );
    }

    setProblem('');
    setLoading(false);
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
      <Input
        style={style.shadow}
        placeholder="Inclua aqui o problema que ocorreu na entrega."
        returnKeyType="send"
        onSubmitEditing={handleSubmit}
        value={problem}
        onChangeText={setProblem}
        autoCapitalize="sentences"
        multiline
      />
      <Button loading={loading} onPress={handleSubmit} disabled={!problem}>
        Enviar
      </Button>
    </CustomBackground>
  );
}

ProblemsRegister.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

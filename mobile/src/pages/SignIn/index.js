import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { StatusBar, Image } from 'react-native';

import { Actions as AuthActions } from '~/store/ducks/auth';

import Button from '~/components/Button';

import { Background, Container, Input } from './styles';

import logo from '~/assets/logo.png';

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const [id, setId] = useState('');

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor('#7D40E7');
    }, [])
  );

  function handleSubmit() {
    dispatch(AuthActions.signInRequest(id));
  }

  return (
    <Background>
      <Container>
        <Image
          style={{
            width: 250,
            height: 50,
          }}
          source={logo}
        />
        <Input
          placeholder="Informe seu ID de cadastro"
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
          value={id}
          onChangeText={setId}
          keyboardType="numeric"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Button loading={loading} bgColor="#82BF18" onPress={handleSubmit}>
          Entrar no sistema
        </Button>
      </Container>
    </Background>
  );
}

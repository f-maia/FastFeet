import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { StatusBar, Image } from 'react-native';

import { Actions as AuthActions } from '~/store/ducks/auth';

import ImagePlaceholder from '~/components/ImagePlaceholder';
import Button from '~/components/Button';

import {
  Container,
  ImageContainer,
  InfoContainer,
  InfoTitle,
  InfoData,
  ButtonContainer,
} from './styles';

export default function Profile() {
  const dispatch = useDispatch();
  const { name, avatar, email, created_at } = useSelector(
    (state) => state.auth.user
  );

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('#fff');
    }, [])
  );

  return (
    <Container>
      <ImageContainer>
        {avatar ? (
          <Image
            style={{ width: 136, height: 136, borderRadius: 68 }}
            source={{ uri: avatar.url }}
          />
        ) : (
          <ImagePlaceholder name={name} size={136} />
        )}
      </ImageContainer>
      <InfoContainer>
        <InfoTitle>Nome completo</InfoTitle>
        <InfoData>{name}</InfoData>
      </InfoContainer>
      <InfoContainer>
        <InfoTitle>Email</InfoTitle>
        <InfoData>{email}</InfoData>
      </InfoContainer>
      <InfoContainer>
        <InfoTitle>Data de cadastro</InfoTitle>
        <InfoData>{created_at}</InfoData>
      </InfoContainer>
      <ButtonContainer>
        <Button
          bgColor="#E74040"
          onPress={() => {
            dispatch(AuthActions.signOut());
          }}
        >
          Logout
        </Button>
      </ButtonContainer>
    </Container>
  );
}

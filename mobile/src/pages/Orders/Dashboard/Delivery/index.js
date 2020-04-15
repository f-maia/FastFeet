import React from 'react';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet } from 'react-native';

import {
  Container,
  TitleContainer,
  Title,
  StatusContainer,
  Dots,
  Dot,
  StatusTypes,
  Status,
  InfoContainer,
  Info,
  InfoTitle,
  InfoData,
  InfoDetails,
  InfoDetailsText,
} from './styles';

const style = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    position: 'relative',
  },
});

export default function Delivery({ data }) {
  const navigation = useNavigation();
  const {
    id,
    start_date,
    signature,
    created_at,
    canceled_at,
    recipient,
  } = data;
  const { city } = recipient;

  return (
    <Container style={style.container}>
      <TitleContainer>
        <Icon name="local-shipping" size={22} color="#7D40E7" />
        <Title>Encomenda {id}</Title>
      </TitleContainer>
      <StatusContainer>
        <Dots>
          <Dot completed={!canceled_at} />
          <Dot completed={start_date && !canceled_at} />
          <Dot completed={signature && !canceled_at} />
        </Dots>
        <StatusTypes>
          <Status>Aguardando Retirada</Status>
          <Status>Retirada</Status>
          <Status>Entregue</Status>
        </StatusTypes>
      </StatusContainer>
      <InfoContainer>
        <Info>
          <InfoTitle>Data</InfoTitle>
          <InfoData>{created_at}</InfoData>
        </Info>
        <Info>
          <InfoTitle>Cidade</InfoTitle>
          <InfoData>{city}</InfoData>
        </Info>
        <Info>
          <InfoDetails onPress={() => navigation.navigate('Details', { data })}>
            <InfoTitle />
            <InfoDetailsText>Ver detalhes</InfoDetailsText>
          </InfoDetails>
        </Info>
      </InfoContainer>
    </Container>
  );
}

Delivery.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    start_date: PropTypes.string,
    canceled_at: PropTypes.string,
    created_at: PropTypes.string.isRequired,
    signature: PropTypes.object,
    recipient: PropTypes.shape({
      city: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

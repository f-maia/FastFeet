import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useFocusEffect } from '@react-navigation/native';
import { StatusBar, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import formatDate from '~/utils/formatDate';

import CustomBackground from '~/components/CustomBackground';

import {
  DetailsContainer,
  HeaderContainer,
  HeaderText,
  InfoContainer,
  Info,
  InfoTitle,
  InfoData,
  InfoWrapper,
  OptionsContainer,
  OptionButtonContainer,
  Option,
  OptionText,
} from './styles';

export default function Details({ route, navigation }) {
  const { data } = route.params;
  const {
    id,
    recipient,
    start_date,
    end_date,
    canceled_at,
    product,
    signature,
  } = data;
  const { name, city, street, number, state, zip_code } = recipient;
  const finished = !!canceled_at || !!signature;

  const [withdrawDate, setWithdrawDate] = useState(start_date);

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor('#7D40E7');
    }, [])
  );

  async function startDelivery() {
    try {
      let date = new Date();

      const response = await api.put(`/delivery/${id}/start`, {
        start_date: date,
      });
      date = formatDate(response.data.start_date);

      setWithdrawDate(date);
    } catch (err) {
      Alert.alert(
        'Ocorreu um erro ao confirmar a retirada da encomenda',
        'Limite de retiradas por dia: 5\nHorário de funcionamento: 8h~18h\n\nTente novamente mais tarde.'
      );
    }
  }

  function handleWithdraw() {
    Alert.alert(
      'Realizar retirada',
      `Tem certeza que deseja confirmar a retirada da encomenda ${id}`,
      [
        { text: 'Sim', onPress: startDelivery },
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  }

  function defineStatus() {
    if (canceled_at) return 'CANCELADO';
    if (end_date && signature) return 'ENTREGUE';
    if (withdrawDate) return 'PENDENTE';
    return 'AGUARDANDO RETIRADA';
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
    infoSpacing: {
      marginBottom: 12,
    },
    infoMiddleSpacing: {
      marginBottom: 12,
      marginTop: 12,
    },
    optionBorder: {
      borderWidth: 0,
      borderStyle: 'solid',
      borderColor: 'rgba(0, 0, 0, 0.1)',
      borderLeftWidth: 1,
      borderRightWidth: 1,
      overflow: 'hidden',
    },
  });

  return (
    <CustomBackground>
      <DetailsContainer style={style.shadow}>
        <HeaderContainer>
          <Icon color="#7D40E7" size={24} name="local-shipping" />
          <HeaderText>Informações da entrega</HeaderText>
        </HeaderContainer>

        <InfoContainer>
          <Info>
            <InfoTitle>DESTINATÁRIO</InfoTitle>
            <InfoData>{name}</InfoData>
          </Info>

          <Info style={style.infoMiddleSpacing}>
            <InfoTitle>ENDEREÇO DE ENTREGA</InfoTitle>
            <InfoData>{`${street}, ${number}, ${city} - ${state}, ${zip_code}`}</InfoData>
          </Info>

          <Info>
            <InfoTitle>PRODUTO</InfoTitle>
            <InfoData>{product}</InfoData>
          </Info>
        </InfoContainer>
      </DetailsContainer>

      <DetailsContainer style={style.shadow}>
        <HeaderContainer>
          <Icon color="#7D40E7" size={24} name="event" />
          <HeaderText>Situação da entrega</HeaderText>
        </HeaderContainer>

        <InfoContainer>
          <Info style={style.infoSpacing}>
            <InfoTitle>STATUS</InfoTitle>
            <InfoData>{defineStatus()}</InfoData>
          </Info>

          <InfoWrapper>
            <Info>
              <InfoTitle>DATA DE RETIRADA</InfoTitle>
              <InfoData>{withdrawDate || '- - / - - / - -'}</InfoData>
            </Info>

            <Info>
              <InfoTitle>DATA DE ENTREGA</InfoTitle>
              <InfoData>
                {end_date && !canceled_at ? end_date : '- - / - - / - -'}
              </InfoData>
            </Info>
          </InfoWrapper>
        </InfoContainer>
      </DetailsContainer>

      <OptionsContainer style={style.shadow}>
        <OptionButtonContainer>
          <Option
            disabled={finished}
            onPress={() => {
              if (finished) return;

              navigation.navigate('ProblemsRegister', { id });
            }}
          >
            <Icon
              color={finished ? '#bbb' : '#E74040'}
              size={24}
              name="highlight-off"
            />
            <OptionText disabled={finished}>Informar Problema</OptionText>
          </Option>
        </OptionButtonContainer>

        <OptionButtonContainer style={style.optionBorder}>
          <Option
            onPress={() => {
              navigation.navigate('ProblemsView', { id });
            }}
          >
            <Icon color="#E7BA40" size={24} name="info-outline" />
            <OptionText>Visualizar Problemas</OptionText>
          </Option>
        </OptionButtonContainer>

        {withdrawDate ? (
          <OptionButtonContainer>
            <Option
              disabled={finished}
              onPress={() => {
                if (finished) return;

                navigation.navigate('ConfirmDelivery', { id });
              }}
            >
              <Icon
                color={finished ? '#bbb' : '#7D40E7'}
                size={24}
                name="alarm-on"
              />
              <OptionText disabled={finished}>Confirmar Entrega</OptionText>
            </Option>
          </OptionButtonContainer>
        ) : (
          <OptionButtonContainer>
            <Option disabled={!!canceled_at} onPress={handleWithdraw}>
              <Icon color="#7D40E7" size={24} name="flag" />
              <OptionText>Realizar Retirada</OptionText>
            </Option>
          </OptionButtonContainer>
        )}
      </OptionsContainer>
    </CustomBackground>
  );
}

Details.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      data: PropTypes.shape({
        id: PropTypes.number.isRequired,
        start_date: PropTypes.string,
        end_date: PropTypes.string,
        canceled_at: PropTypes.string,
        signature: PropTypes.object,
        product: PropTypes.string.isRequired,
        recipient: PropTypes.shape({
          name: PropTypes.string.isRequired,
          city: PropTypes.string.isRequired,
          street: PropTypes.string.isRequired,
          state: PropTypes.string.isRequired,
          zip_code: PropTypes.string.isRequired,
          number: PropTypes.number.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

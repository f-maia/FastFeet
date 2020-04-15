import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Image, StatusBar } from 'react-native';

import { Actions as AuthActions } from '~/store/ducks/auth';

import api from '~/services/api';

import formatDate from '~/utils/formatDate';
import formatZipCode from '~/utils/formatZipCode';

import ImagePlaceholder from '~/components/ImagePlaceholder';
import Loading from '~/components/Loading';
import Warning from '~/components/Warning';

import Delivery from './Delivery';

import {
  Container,
  HeaderContainer,
  UserInfoContainer,
  UserInfo,
  Greeting,
  Username,
  Logout,
  ListContainer,
  ListHeader,
  HeaderTitle,
  HeaderFilters,
  FilterText,
  FilterButton,
  DeliveriesList,
} from './styles';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { id, name, avatar } = useSelector((state) => state.auth.user);

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [filter, setFilter] = useState('pending');
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);
  const [deliveries, setDeliveries] = useState([]);

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('#fff');

      setTotalItems(0);
      setLoading(true);
      setPage(1);
      setLoading(false);
    }, [])
  );

  useEffect(() => {
    async function loadDeliveries() {
      const response = await api.get(`/deliveryman/${id}/deliveries`, {
        params: { page, filter },
      });
      const { data, headers } = response;

      if (JSON.stringify(data).length <= 2) {
        setNotFound(true);
        return;
      }

      const dataFormatted = data.map((delivery) => ({
        ...delivery,
        start_date: formatDate(delivery.start_date),
        end_date: formatDate(delivery.end_date),
        canceled_at: formatDate(delivery.canceled_at),
        created_at: formatDate(delivery.created_at),
        recipient: {
          ...delivery.recipient,
          zip_code: formatZipCode(delivery.recipient.zip_code),
        },
      }));

      setTotalItems(Number(headers['x-total-count']));
      setDeliveries((deliveriesList) => {
        return page === 1
          ? dataFormatted
          : [...deliveriesList, ...dataFormatted];
      });
      setLoading(false);
    }

    if (page === 1 && refreshing === false) {
      setLoading(true);
    }

    setNotFound(false);
    loadDeliveries();
  }, [id, page, filter, refreshing]);

  function handleFilterChange(newFilter) {
    setFilter(newFilter);
    setPage(1);
  }

  async function handleRefresh() {
    setRefreshing(true);
    setPage(1);
    setRefreshing(false);
  }

  function handleEndReached() {
    const totalPages = totalItems / 6;

    if (totalPages > page) {
      setPage(page + 1);
    }
  }

  function renderDeliveries() {
    if (loading) return <Loading />;
    if (notFound) return <Warning>Nenhuma encomenda encontrada</Warning>;

    return (
      <DeliveriesList
        data={deliveries}
        removeClippedSubviews
        maxToRenderPerBatch={4}
        windowSize={7}
        initialNumToRender={4}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        onEndReachedThreshold={0.35}
        onEndReached={handleEndReached}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <Delivery data={item} />}
      />
    );
  }

  return (
    <Container>
      <HeaderContainer>
        <UserInfoContainer>
          {avatar ? (
            <Image
              style={{ width: 68, height: 68, borderRadius: 34 }}
              source={{ uri: avatar.url }}
            />
          ) : (
            <ImagePlaceholder name={name} size={68} />
          )}
          <UserInfo>
            <Greeting>Bem vindo de volta,</Greeting>
            <Username>{name}</Username>
          </UserInfo>
        </UserInfoContainer>
        <Logout
          onPress={() => {
            dispatch(AuthActions.signOut());
          }}
        >
          <Icon name="exit-to-app" size={22} color="#E74040" />
        </Logout>
      </HeaderContainer>

      <ListContainer>
        <ListHeader>
          <HeaderTitle>Entregas</HeaderTitle>
          <HeaderFilters>
            <FilterButton onPress={() => handleFilterChange('pending')}>
              <FilterText selected={filter === 'pending'}>Pendentes</FilterText>
            </FilterButton>
            <FilterButton onPress={() => handleFilterChange('delivered')}>
              <FilterText selected={filter === 'delivered'}>
                Entregues
              </FilterText>
            </FilterButton>
          </HeaderFilters>
        </ListHeader>

        {renderDeliveries()}
      </ListContainer>
    </Container>
  );
}

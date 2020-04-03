import React from 'react';
import { useDispatch } from 'react-redux';

import history from '~/services/history';

import { Actions as AuthActions } from '~/store/ducks/auth';

import {
  Container,
  PagesContainer,
  PageTitle,
  UserContainer,
  Username,
  Logout,
} from './styles';

import logo from '~/assets/logo.svg';

export default function Header() {
  const dispatch = useDispatch();

  const pages = [
    { route: '/orders', name: 'ENCOMENDAS' },
    { route: '/deliverers', name: 'ENTREGADORES' },
    { route: '/recipients', name: 'DESTINATÁRIOS' },
    { route: '/delivery-problems', name: 'PROBLEMAS' },
  ];

  function isCurrentPage(route) {
    const currentPage = history.location.pathname
      .split('/')
      .filter((name) => !!name)[0];
    const routeName = route.replace('/', '');

    return currentPage.includes(routeName);
  }

  function handleSignOut() {
    dispatch(AuthActions.signOut());
  }

  return (
    <Container>
      <PagesContainer>
        <img src={logo} alt="FastFeet" />
        {pages.map(({ route, name }) => (
          <PageTitle to={route} key={route} selected={isCurrentPage(route)}>
            {name}
          </PageTitle>
        ))}
      </PagesContainer>
      <UserContainer>
        <Username>Admin FastFeet</Username>
        <Logout onClick={handleSignOut}>sair do sistema</Logout>
      </UserContainer>
    </Container>
  );
}

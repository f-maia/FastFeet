import React from 'react';
import PropTypes from 'prop-types';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';

import history from '~/services/history';

import Spinner from '~/components/Spinner';

import {
  Container,
  Header,
  Title,
  ButtonContainer,
  OptionButton,
  FormContainer,
  SpinnerContainer,
} from './styles';

export default function FormPage({ title, route, formRef, loading, children }) {
  return (
    <Container>
      <Header>
        <Title>{title}</Title>
        <ButtonContainer>
          {loading ? (
            <SpinnerContainer>
              <Spinner size={35} />
            </SpinnerContainer>
          ) : (
            <>
              <OptionButton
                color="#CCC"
                onClick={() => history.push(route)}
                type="button"
              >
                <MdKeyboardArrowLeft size={22} color="#fff" />
                <span>VOLTAR</span>
              </OptionButton>
              <OptionButton
                color="#7D40E7"
                onClick={() => formRef.current.handleSubmit()}
                type="button"
              >
                <MdCheck size={22} color="#fff" />
                <span>SALVAR</span>
              </OptionButton>
            </>
          )}
        </ButtonContainer>
      </Header>
      <FormContainer>{children}</FormContainer>
    </Container>
  );
}

FormPage.propTypes = {
  title: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  formRef: PropTypes.oneOfType([PropTypes.object]).isRequired,
  children: PropTypes.element.isRequired,
  loading: PropTypes.bool.isRequired,
};

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';

import { Actions as AuthActions } from '~/store/ducks/auth';

import InputContainer from '~/components/InputContainer';
import Spinner from '~/components/Spinner';

import logo from '~/assets/logo.svg';

import { InputRow } from './styles';

export default function Login() {
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();

  const validationSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  });

  function handleSubmit(values) {
    const { email, password } = values;

    dispatch(AuthActions.signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="FastFeet" />

      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {(formikBag) => (
          <Form>
            <InputRow>
              <InputContainer>
                <label htmlFor="email">SEU E-MAIL</label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="exemplo@email.com"
                  autoComplete="off"
                />
                {!!formikBag.errors.email && (
                  <span>{`${formikBag.errors.email}`}</span>
                )}
              </InputContainer>
            </InputRow>

            <InputRow>
              <InputContainer>
                <label htmlFor="password">SUA SENHA</label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="**********"
                  autoComplete="off"
                />
                {!!formikBag.errors.password && (
                  <span>{`${formikBag.errors.password}`}</span>
                )}
              </InputContainer>
            </InputRow>

            {loading ? (
              <Spinner />
            ) : (
              <button type="submit">Entrar no sistema</button>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
}

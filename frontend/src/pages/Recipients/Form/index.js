import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';

import FormPage from '~/components/FormPage';
import InputContainer from '~/components/InputContainer';

import {
  InputRow,
  largerInput,
  numberInput,
  AddressDetailsInput,
} from './styles';

export default function RecipientsForm({ handleSubmit, initialState }) {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const validationSchema = yup.object().shape({
    name: yup.string().required(),
    street: yup.string().required(),
    number: yup.number().integer().positive().required(),
    address_details: yup.string(),
    city: yup.string().required(),
    state: yup.string().required(),
    zip_code: yup
      .string()
      .length(9)
      .matches(/^[0-9]{5}-[0-9]{3}$/, 'Must be exactly 8 digits')
      .required(),
  });

  const formTitle = initialState.id ? 'Edição' : 'Cadastro';

  function onSubmit(values, actions) {
    setLoading(true);

    values = {
      ...values,
      zip_code: values.zip_code.replace(/\D/g, ''),
    };
    handleSubmit(values, actions);

    setLoading(false);
  }

  return (
    <FormPage
      title={`${formTitle} de destinatários`}
      route="/recipients"
      formRef={formRef}
      loading={loading}
    >
      <Formik
        innerRef={formRef}
        initialValues={initialState}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {(formikBag) => (
          <Form>
            <InputRow>
              <InputContainer>
                <label htmlFor="name">Nome</label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Ludwig van Beethoven"
                  autoComplete="off"
                />
                {!!formikBag.errors.name && (
                  <span>{`${formikBag.errors.name}`}</span>
                )}
              </InputContainer>
            </InputRow>

            <InputRow>
              <InputContainer customStyle={largerInput}>
                <label htmlFor="street">Rua</label>
                <Field
                  type="text"
                  id="street"
                  name="street"
                  placeholder="Rua Beethoven"
                  autoComplete="off"
                />
                {!!formikBag.errors.street && (
                  <span>{`${formikBag.errors.street}`}</span>
                )}
              </InputContainer>

              <InputContainer customStyle={numberInput}>
                <label htmlFor="number">Número</label>
                <Field
                  type="number"
                  min="0"
                  id="number"
                  name="number"
                  placeholder="Rua 1729"
                  autoComplete="off"
                />
                {!!formikBag.errors.number && (
                  <span>{`${formikBag.errors.number}`}</span>
                )}
              </InputContainer>

              <InputContainer customStyle={AddressDetailsInput}>
                <label htmlFor="address_details">Complemento</label>
                <Field
                  type="text"
                  id="address_details"
                  name="address_details"
                  autoComplete="off"
                />
                {!!formikBag.errors.address_details && (
                  <span>{`${formikBag.errors.address_details}`}</span>
                )}
              </InputContainer>
            </InputRow>

            <InputRow>
              <InputContainer>
                <label htmlFor="city">Cidade</label>
                <Field
                  type="text"
                  id="city"
                  name="city"
                  placeholder="Diadema"
                  autoComplete="off"
                />
                {!!formikBag.errors.city && (
                  <span>{`${formikBag.errors.city}`}</span>
                )}
              </InputContainer>

              <InputContainer>
                <label htmlFor="state">Estado</label>
                <Field
                  type="text"
                  id="state"
                  name="state"
                  placeholder="São Paulo"
                  autoComplete="off"
                />
                {!!formikBag.errors.state && (
                  <span>{`${formikBag.errors.state}`}</span>
                )}
              </InputContainer>

              <InputContainer>
                <label htmlFor="zip_code">CEP</label>
                <Field type="text" name="zip_code" autoComplete="off">
                  {({ field }) => (
                    <InputMask
                      {...field}
                      mask="99999-999"
                      id="zip_code"
                      placeholder="09960-580"
                    />
                  )}
                </Field>
                {!!formikBag.errors.zip_code && (
                  <span>{`${formikBag.errors.zip_code}`}</span>
                )}
              </InputContainer>
            </InputRow>
          </Form>
        )}
      </Formik>
    </FormPage>
  );
}

RecipientsForm.defaultProps = {
  initialState: {
    name: '',
    street: '',
    number: '',
    address_details: '',
    city: '',
    state: '',
    zip_code: '',
  },
};

RecipientsForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  initialState: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    street: PropTypes.string.isRequired,
    number: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    address_details: PropTypes.string,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    zip_code: PropTypes.string.isRequired,
  }),
};

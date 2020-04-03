import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Field, Form, Formik } from 'formik';
import Async from 'react-select/async';
import * as yup from 'yup';

import api from '~/services/api';

import FormPage from '~/components/FormPage';
import InputContainer from '~/components/InputContainer';

import { InputRow, customStyle } from './styles';

export default function OrdersForm({ initialState, handleSubmit }) {
  const [deliverers, setDeliverers] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  const formTitle = initialState.recipient ? 'Edição' : 'Cadastro';

  const validationSchema = yup.object().shape({
    recipient: yup.object().shape({
      value: yup.number().required(),
      label: yup.string().required(),
    }),
    deliverer: yup.object().shape({
      value: yup.number().required(),
      label: yup.string().required(),
    }),
    product: yup.string().required(),
  });

  useEffect(() => {
    async function loadDeliverers() {
      const response = await api.get('/deliverers');

      const data = response.data.map((deliverer) => ({
        value: deliverer.id,
        label: deliverer.name,
      }));

      setDeliverers(data);
    }

    async function loadRecipients() {
      const response = await api.get('/recipients');

      const data = response.data.map((recipient) => ({
        value: recipient.id,
        label: recipient.name,
      }));

      setRecipients(data);
    }

    loadDeliverers();
    loadRecipients();
  }, []);

  const handleChange = (value, formik) => {
    formik.setValues({ ...formik.values, ...value });
    return value;
  };

  const filter = (value, data) => {
    return data.filter((i) =>
      i.label.toLowerCase().includes(value.toLowerCase())
    );
  };

  const load = (value, cb, data) => {
    setTimeout(() => {
      cb(filter(value, data));
    }, 100);
  };

  return (
    <FormPage
      title={`${formTitle} de encomendas`}
      route="/orders"
      formRef={formRef}
      loading={loading}
    >
      <Formik
        innerRef={formRef}
        initialValues={initialState}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          setLoading(true);
          handleSubmit(values, actions);
          setLoading(false);
        }}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {(formikBag) => (
          <Form>
            <InputRow>
              <InputContainer>
                <label htmlFor="recipient">Destinatário</label>
                <Async
                  id="recipient"
                  name="recipient"
                  placeholder="Ludwig van Beethoven"
                  type="text"
                  styles={customStyle}
                  cacheOptions
                  defaultOptions={recipients}
                  loadOptions={(value, cb) => load(value, cb, recipients)}
                  onChange={(value) =>
                    handleChange({ recipient: value }, formikBag)
                  }
                  value={formikBag.values.recipient}
                />
                {!!formikBag.errors.recipient && (
                  <span>{`${formikBag.errors.recipient}`}</span>
                )}
              </InputContainer>

              <InputContainer>
                <label htmlFor="deliverer">Entregador</label>
                <Async
                  id="deliverer"
                  name="deliverer"
                  placeholder="John Doe"
                  type="text"
                  styles={customStyle}
                  cacheOptions
                  defaultOptions={deliverers}
                  loadOptions={(value, cb) => load(value, cb, deliverers)}
                  onChange={(value) =>
                    handleChange({ deliverer: value }, formikBag)
                  }
                  value={formikBag.values.deliverer}
                />
                {!!formikBag.errors.deliverer && (
                  <span>{`${formikBag.errors.deliverer}`}</span>
                )}
              </InputContainer>
            </InputRow>

            <InputRow>
              <InputContainer>
                <label htmlFor="product">Nome do produto</label>
                <Field
                  type="text"
                  id="product"
                  name="product"
                  placeholder="Yamaha SX7"
                  autoComplete="off"
                />
                {!!formikBag.errors.product && (
                  <span>{`${formikBag.errors.product}`}</span>
                )}
              </InputContainer>
            </InputRow>
          </Form>
        )}
      </Formik>
    </FormPage>
  );
}

OrdersForm.defaultProps = {
  initialState: {
    product: '',
    recipient: null,
    deliverer: null,
  },
};

OrdersForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  initialState: PropTypes.shape({
    product: PropTypes.string.isRequired,
    recipient: PropTypes.shape({
      value: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
    }),
    deliverer: PropTypes.shape({
      value: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
    }),
  }),
};

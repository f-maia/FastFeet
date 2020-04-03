import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { MdInsertPhoto } from 'react-icons/md';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';

import FormPage from '~/components/FormPage';
import InputContainer from '~/components/InputContainer';

import { customStyle, InputRow } from './styles';

export default function DeliverersForm({ handleSubmit, initialState }) {
  const formRef = useRef(null);
  const [avatarFile, setAvatarFile] = useState(new FormData());
  const [loading, setLoading] = useState(false);

  const validationSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
  });

  const formTitle = initialState.id ? 'Edição' : 'Cadastro';

  function renderImageButton() {
    const { file } = avatarFile;

    if (file) {
      return <img src={URL.createObjectURL(file)} alt="preview avatar" />;
    }

    if (initialState && initialState.avatar) {
      return <img src={initialState.avatar.url} alt="preview avatar" />;
    }

    return (
      <>
        <MdInsertPhoto size={45} color="#DDD" />
        <span>Adicionar foto</span>
      </>
    );
  }

  return (
    <FormPage
      title={`${formTitle} de entregadores`}
      route="/deliverers"
      formRef={formRef}
      loading={loading}
    >
      <Formik
        innerRef={formRef}
        initialValues={initialState}
        validationSchema={validationSchema}
        onSubmit={(value, actions) => {
          setLoading(true);
          handleSubmit({ ...value, ...avatarFile }, actions);
          setAvatarFile(new FormData());
          setLoading(false);
        }}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {(formikBag) => (
          <Form>
            <InputContainer customStyle={customStyle}>
              <label htmlFor="avatar">
                {renderImageButton()}

                <input
                  type="file"
                  id="avatar"
                  accept="image/*"
                  onChange={(e) => {
                    setAvatarFile({
                      ...avatarFile,
                      file: e.target.files[0],
                    });
                  }}
                />
              </label>
            </InputContainer>

            <InputRow>
              <InputContainer>
                <label htmlFor="name">Nome</label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  autoComplete="off"
                />
                {!!formikBag.errors.name && (
                  <span>{`${formikBag.errors.name}`}</span>
                )}
              </InputContainer>
            </InputRow>

            <InputRow>
              <InputContainer>
                <label htmlFor="email">Email</label>
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
          </Form>
        )}
      </Formik>
    </FormPage>
  );
}

DeliverersForm.defaultProps = {
  initialState: {
    name: '',
    email: '',
  },
};

DeliverersForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  initialState: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }),
  }),
};

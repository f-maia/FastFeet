import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import RecipientsForm from '../Form';

export default function RecipientsEdit({ location }) {
  const initialState = location.state;

  async function handleSubmit(values) {
    const { id } = initialState;

    try {
      const recipientResponse = await api.put(`/recipients/${id}`, values);

      const { name, zip_code } = recipientResponse.data;

      toast.success(
        <div>
          <p>Destinatário editado com sucesso!</p>
          <br />
          <p>Id: {id}</p>
          <p>Nome: {name}</p>
          <p>CEP: {zip_code}</p>
        </div>
      );

      history.replace(location.pathname, recipientResponse.data);
    } catch (err) {
      toast.error(
        'Falha ao editar destinatário. Verifique os campos e tente novamente.'
      );
    }
  }
  return (
    <RecipientsForm handleSubmit={handleSubmit} initialState={initialState} />
  );
}

RecipientsEdit.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.object.isRequired,
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

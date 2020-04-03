import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import DeliverersForm from '../Form';

export default function DeliverersEdit({ location }) {
  const initialState = location.state;

  async function handleSubmit(values) {
    const { id } = initialState;
    const { name, email, file } = values;

    try {
      let { avatar } = location.state;

      if (file) {
        const formData = new FormData();
        formData.append('file', values.file);

        const avatarResponse = await api.post('/files', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        avatar = avatarResponse.data;
      }

      const avatar_id = avatar ? avatar.id : null;

      const data = { name, email, avatar_id };

      await api.put(`/deliverers/${id}`, data);

      toast.success(
        <div>
          <p>Entregador editado com sucesso!</p>
          <br />
          <p>Id: {id}</p>
          <p>Nome: {name}</p>
          <p>Email: {email}</p>
        </div>
      );

      history.replace(location.pathname, { id, name, email, avatar });
    } catch (err) {
      toast.error(
        'Falha ao editar entregador. Verifique os campos e tente novamente.'
      );
    }
  }

  return (
    <DeliverersForm handleSubmit={handleSubmit} initialState={initialState} />
  );
}

DeliverersEdit.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.object.isRequired,
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

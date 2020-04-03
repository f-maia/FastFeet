import React from 'react';
import { toast } from 'react-toastify';

import api from '~/services/api';

import DeliverersForm from '../Form';

export default function DeliverersCreate() {
  async function handleSubmit(values, actions) {
    const { name, email, file } = values;

    try {
      let avatar_id = null;

      if (file) {
        const formData = new FormData();
        formData.append('file', values.file);

        const avatarResponse = await api.post('/files', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        avatar_id = avatarResponse.data.id;
      }

      const data = { name, email, avatar_id };

      const delivererResponse = await api.post('/deliverers', data);

      const { id } = delivererResponse.data;

      toast.success(
        <div>
          <p>Entregador cadastrado com sucesso!</p>
          <br />
          <p>Id: {id}</p>
          <p>Nome: {name}</p>
          <p>Email: {email}</p>
        </div>
      );

      actions.resetForm();
    } catch (err) {
      toast.error(
        'Falha ao cadastrar entregador. Verifique os campos e tente novamente.'
      );
    }
  }

  return <DeliverersForm handleSubmit={handleSubmit} />;
}

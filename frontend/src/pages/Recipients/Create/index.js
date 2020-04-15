import React from 'react';
import { toast } from 'react-toastify';

import api from '~/services/api';

import RecipientsForm from '../Form';

export default function RecipientsCreate() {
  async function handleSubmit(values, actions) {
    try {
      const recipientResponse = await api.post('/recipients', values);

      const { id, name, zip_code } = recipientResponse.data;

      toast.success(
        <div>
          <p>Destinatário cadastrado com sucesso!</p>
          <br />
          <p>Id: {id}</p>
          <p>Nome: {name}</p>
          <p>CEP: {zip_code}</p>
        </div>
      );

      actions.resetForm();
    } catch (err) {
      toast.error(
        'Falha ao cadastrar destinatário. Verifique os campos e tente novamente.'
      );
    }
  }
  return <RecipientsForm handleSubmit={handleSubmit} />;
}

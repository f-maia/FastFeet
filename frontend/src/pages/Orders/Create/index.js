import React from 'react';
import { toast } from 'react-toastify';

import api from '~/services/api';

import OrdersForm from '../Form';

export default function OrdersCreate() {
  async function handleSubmit(values, actions) {
    try {
      const { product, recipient, deliverer } = values;
      const { value: deliveryman_id, label: delivererName } = deliverer;
      const { value: recipient_id, label: recipientName } = recipient;

      const orderResponse = await api.post('/orders', {
        product,
        deliveryman_id,
        recipient_id,
      });

      const { id } = orderResponse.data;

      toast.success(
        <div>
          <p>Encomenda cadastrada com sucesso!</p>
          <br />
          <p>Id: {id}</p>
          <p>Produto: {product}</p>
          <p>Entregador: {delivererName}</p>
          <p>Destinatário: {recipientName}</p>
        </div>
      );

      actions.resetForm();
    } catch (err) {
      toast.error(
        'Falha ao cadastrar encomenda. Verifique os campos e tente novamente.'
      );
    }
  }

  return <OrdersForm handleSubmit={handleSubmit} />;
}

import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import OrdersForm from '../Form';

export default function OrdersEdit({ location }) {
  const initialState = location.state;

  async function handleSubmit(values) {
    try {
      const { id } = initialState;

      const { product, recipient, deliverer } = values;
      const { value: deliveryman_id, label: delivererName } = deliverer;
      const { value: recipient_id, label: recipientName } = recipient;

      await api.put(`/orders/${id}`, {
        product,
        deliveryman_id,
        recipient_id,
      });

      toast.success(
        <div>
          <p>Encomenda editada com sucesso!</p>
          <br />
          <p>Id: {id}</p>
          <p>Produto: {product}</p>
          <p>Entregador: {delivererName}</p>
          <p>Destinatário: {recipientName}</p>
        </div>
      );

      history.replace(location.pathname, {
        id,
        ...values,
      });
    } catch (err) {
      toast.error(
        'Falha ao editar encomenda. Verifique os campos e tente novamente.'
      );
    }
  }

  return <OrdersForm initialState={initialState} handleSubmit={handleSubmit} />;
}

OrdersEdit.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.object.isRequired,
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';

import TableActions from '~/components/TableActions';

import Modal from '../Modal';

export default function TableRow({ data, onDelete }) {
  const { delivery_id: id, description, delivery } = data;
  const { product, recipient, deliverer } = delivery;

  return (
    <tr>
      <td>#{id < 10 ? `0${id}` : id}</td>
      <td>{description}</td>
      <td>
        <TableActions
          width={250}
          view={{
            modal: Modal,
            props: data,
          }}
          remove={
            delivery.end_date || delivery.canceled_at
              ? null
              : {
                  text: 'Cancelar encomenda',
                  route: `/problem/${id}/cancel-delivery`,
                  message: {
                    title: `Deseja cancelar a entrega ${id}?`,
                    info: `Produto: ${product}\nDestinatário: ${recipient.name}\nEntregador: ${deliverer.name}`,
                    success: 'A encomenda foi cancelada com sucesso.',
                    error: 'Falha ao cancelar encomenda. Tente novamente.',
                  },
                  reload: onDelete,
                }
          }
        />
      </td>
    </tr>
  );
}

TableRow.propTypes = {
  data: PropTypes.shape({
    delivery_id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    delivery: PropTypes.shape({
      product: PropTypes.string.isRequired,
      deliverer: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
      recipient: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
      end_date: PropTypes.string,
      canceled_at: PropTypes.string,
    }),
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

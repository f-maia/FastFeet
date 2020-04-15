import React from 'react';
import PropTypes from 'prop-types';

import TableActions from '~/components/TableActions';
import PlaceholderImage from '~/components/PlaceholderImage';

import Modal from '../Modal';

import { Tag, DelivererContainer } from './styles';

export default function TableRow({ data, onDelete }) {
  const {
    id,
    recipient,
    deliverer,
    product,
    start_date,
    end_date,
    canceled_at,
    signature,
  } = data;
  const { name: recipientName, state, city, id: recipientId } = recipient;
  const { name: delivererName, avatar, id: delivererId } = deliverer;

  function tagStatus() {
    let tagOptions = {
      color: '#4D85EE',
      text: 'RETIRADA',
      bg: '#BAD2FF',
    };

    if (!start_date) {
      tagOptions = {
        color: '#C1BC35',
        text: 'PENDENTE',
        bg: '#F0F0DF',
      };
    }
    if (end_date && canceled_at) {
      tagOptions = {
        color: '#DE3B3B',
        text: 'CANCELADA',
        bg: '#FAB0B0',
      };
    }
    if (end_date && signature) {
      tagOptions = {
        color: '#2CA42B',
        text: 'ENTREGUE',
        bg: '#DFF0DF',
      };
    }


    return (
      <Tag color={tagOptions.color} backgroundColor={tagOptions.bg}>
        <div />
        <span>{tagOptions.text}</span>
      </Tag>
    );
  }

  return (
    <tr>
      <td>#{id < 10 ? `0${id}` : id}</td>
      <td>{product}</td>
      <td>{recipientName}</td>
      <td>
        <DelivererContainer>
          {avatar ? (
            <img src={avatar.url} alt="deliverer avatar" />
          ) : (
            <PlaceholderImage name={delivererName} />
          )}
          <span>{delivererName}</span>
        </DelivererContainer>
      </td>
      <td>{city}</td>
      <td>{state}</td>
      <td>{tagStatus()}</td>
      <td>
        <TableActions
          view={{
            modal: Modal,
            props: data,
          }}
          edit={{
            route: `/orders/${id}/edit`,
            state: {
              id,
              recipient: { value: recipientId, label: recipientName },
              deliverer: { value: delivererId, label: delivererName },
              product,
            },
          }}
          remove={{
            route: `/orders/${id}`,
            message: {
              title: `Deseja excluir a encomenda ${id}?`,
              info: `Produto: ${product}\nEntregador: ${delivererName}\nDestinatário: ${delivererName}`,
              success: 'A encomenda foi excluída com sucesso.',
              error: 'Falha ao excluir encomenda. Tente novamente.',
            },
            reload: onDelete,
          }}
        />
      </td>
    </tr>
  );
}

TableRow.propTypes = {
  onDelete: PropTypes.func.isRequired,
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    product: PropTypes.string.isRequired,
    start_date: PropTypes.string,
    end_date: PropTypes.string,
    signature: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }),
    canceled_at: PropTypes.string,
    recipient: PropTypes.shape({
      name: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }),
    deliverer: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.shape({
        url: PropTypes.string.isRequired,
      }),
    }),
  }).isRequired,
};

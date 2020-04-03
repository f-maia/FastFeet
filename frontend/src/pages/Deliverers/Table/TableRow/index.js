import React from 'react';
import PropTypes from 'prop-types';

import TableActions from '~/components/TableActions';
import PlaceholderImage from '~/components/PlaceholderImage';

export default function TableRow({ data, onDelete }) {
  const { id, name, email, avatar } = data;

  return (
    <tr>
      <td>#{id < 10 ? `0${id}` : id}</td>
      <td>
        {avatar ? (
          <img src={avatar.url} alt="deliverer avatar" />
        ) : (
          <PlaceholderImage name={name} />
        )}
      </td>
      <td>{name}</td>
      <td>{email}</td>
      <td>
        <TableActions
          edit={{
            route: `/deliverers/${id}/edit`,
            state: { id, name, email, avatar },
          }}
          remove={{
            route: `/deliverers/${id}`,
            message: {
              title: `Deseja excluir o entregador ${id}?`,
              info: `Nome: ${name} \nEmail: ${email}`,
              success: 'O entregador foi excluído com sucesso.',
              error: 'Falha ao excluir entregador. Tente novamente.',
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
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

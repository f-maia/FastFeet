import React from 'react';
import PropTypes from 'prop-types';

import TableActions from '~/components/TableActions';

export default function TableRow({ data, onDelete }) {
  const {
    id,
    name,
    street,
    number,
    state,
    city,
    address_details,
    zip_code,
  } = data;

  const address = `${street}, ${number}, ${city} - ${state}`;
  const initialState = {
    id,
    name,
    street,
    number,
    state,
    city,
    address_details,
    zip_code,
  };

  function formatZipCode(code) {
    const codeArray = code.split('');
    codeArray.splice(5, 0, '-');
    return codeArray.join('');
  }

  return (
    <tr>
      <td>#{id < 10 ? `0${id}` : id}</td>
      <td>{name}</td>
      <td>{address}</td>
      <td>
        <TableActions
          edit={{
            route: `/recipients/${id}/edit`,
            state: initialState,
          }}
          remove={{
            route: `/recipients/${id}`,
            message: {
              title: `Deseja excluir o destinatário ${id}?`,
              info: `Nome: ${name} \nCEP: ${formatZipCode(zip_code)}`,
              success: 'O destinatário foi excluído com sucesso.',
              error: 'Falha ao excluir destinatário. Tente novamente.',
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
    street: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    state: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    zip_code: PropTypes.string.isRequired,
    address_details: PropTypes.string,
  }).isRequired,
};

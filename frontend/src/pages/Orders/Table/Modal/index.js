import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

import Modal from '~/components/Modal';

import { OrderInfo } from './styles';

export default function OrderModal({ data, show, closeModal }) {
  const { recipient, start_date, canceled_at, end_date, signature } = data;
  const { state, city, number, street, zip_code } = recipient;

  function formatZipCode(code) {
    const codeArray = code.split('');
    codeArray.splice(5, 0, '-');
    return codeArray.join('');
  }

  function formatDate(date) {
    return format(new Date(date), 'dd/MM/yyyy');
  }

  return (
    <Modal show={show} closeModal={closeModal}>
      <OrderInfo>
        <div>
          <strong>Informações da encomenda</strong>
          <p>
            {street}, {number}
          </p>
          <p>
            {city} - {state}
          </p>
          <p>{formatZipCode(zip_code)}</p>
        </div>
        <div>
          <strong>Datas</strong>

          {start_date ? (
            <p>
              <strong>Retirada:</strong> {formatDate(start_date)}
            </p>
          ) : (
            !canceled_at && <p>Esta encomenda ainda não foi retirada.</p>
          )}
          {!!signature && (
            <p>
              <strong>Entrega:</strong> {formatDate(end_date)}
            </p>
          )}
          {!!canceled_at && (
            <p>
              <strong>Cancelamento:</strong> {formatDate(canceled_at)}
            </p>
          )}
        </div>
        {!!signature && (
          <div>
            <strong>Assinatura do destinatário</strong>
            <div>
              <img
                src={signature ? signature.url : ''}
                alt="Recipient Signature"
              />
            </div>
          </div>
        )}
      </OrderInfo>
    </Modal>
  );
}

OrderModal.defaultProps = {
  show: false,
};

OrderModal.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    start_date: PropTypes.string,
    end_date: PropTypes.string,
    canceled_at: PropTypes.string,
    signature: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }),
    recipient: PropTypes.shape({
      name: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
      street: PropTypes.string.isRequired,
      zip_code: PropTypes.string.isRequired,
    }),
  }).isRequired,
  show: PropTypes.bool,
  closeModal: PropTypes.func.isRequired,
};

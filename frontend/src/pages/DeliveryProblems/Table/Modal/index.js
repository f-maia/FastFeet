import React from 'react';
import PropTypes from 'prop-types';

import Modal from '~/components/Modal';

import { ProblemInfo } from './styles';

export default function ProblemModal({ data, show, closeModal }) {
  const { description } = data;

  return (
    <Modal show={show} closeModal={closeModal}>
      <ProblemInfo>
        <div>
          <strong>Informações da encomenda</strong>
          <p>{description}</p>
        </div>
      </ProblemInfo>
    </Modal>
  );
}

ProblemModal.defaultProps = {
  show: false,
};

ProblemModal.propTypes = {
  data: PropTypes.shape({
    description: PropTypes.string.isRequired,
  }).isRequired,
  show: PropTypes.bool,
  closeModal: PropTypes.func.isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';

import { Background, Container, Outside } from './styles';

export default function Modal({ children, show, closeModal }) {
  return (
    <Background show={show}>
      <Container>{children}</Container>
      <Outside onClick={closeModal} />
    </Background>
  );
}

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.object,
    PropTypes.bool,
  ]).isRequired,
  show: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

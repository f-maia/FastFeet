import React from 'react';
import PropTypes from 'prop-types';

import { Container, Message } from './styles';

export default function Warning({ children }) {
  return (
    <Container>
      <Message>{children}</Message>
    </Container>
  );
}

Warning.propTypes = {
  children: PropTypes.string.isRequired,
};

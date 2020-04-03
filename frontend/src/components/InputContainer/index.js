import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function InputContainer({ children, customStyle }) {
  return <Container customStyle={customStyle}>{children}</Container>;
}

InputContainer.defaultProps = {
  customStyle: null,
};

InputContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.object,
    PropTypes.bool,
  ]).isRequired,
  customStyle: PropTypes.arrayOf(PropTypes.string),
};

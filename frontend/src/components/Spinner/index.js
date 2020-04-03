import React from 'react';
import PropTypes from 'prop-types';

import { SpinnerIcon, SpinnerContainer } from './styles';

export default function Spinner({ size }) {
  return (
    <SpinnerContainer>
      <SpinnerIcon size={size} />
    </SpinnerContainer>
  );
}

Spinner.defaultProps = {
  size: 20,
};

Spinner.propTypes = {
  size: PropTypes.number,
};

import React from 'react';
import PropTypes from 'prop-types';

import { Container, Name } from './styles';

export default function ImagePlaceholder({ name, size }) {
  function generateRandomHexColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i += 1) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function getInitials() {
    const names = name.split(' ');

    let initialsName = names[0][0];
    if (names.length > 1) {
      initialsName += names[names.length - 1][0];
    }

    return initialsName.toUpperCase();
  }

  const color = generateRandomHexColor();

  return (
    <Container color={color} size={size}>
      <Name color={color} size={size}>
        {getInitials()}
      </Name>
    </Container>
  );
}

ImagePlaceholder.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};

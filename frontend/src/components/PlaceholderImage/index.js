import React from 'react';
import PropTypes from 'prop-types';

import generateRandomHexColor from '~/utils/generateRandomHexColor';

import { Image } from './styles';

export default function PlaceholderImage({ name }) {
  const names = name.split(' ');

  let initialsName = names[0][0];
  if (names.length > 1) {
    initialsName += names[names.length - 1][0];
  }

  initialsName = initialsName.toUpperCase();
  const hexColorCode = generateRandomHexColor();

  return <Image color={hexColorCode}>{initialsName}</Image>;
}

PlaceholderImage.propTypes = {
  name: PropTypes.string.isRequired,
};

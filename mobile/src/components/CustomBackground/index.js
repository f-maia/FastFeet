import React from 'react';
import PropTypes from 'prop-types';

import { Container, Background, ContentContainer } from './styles';

export default function CustomBackground({ padding, children }) {
  return (
    <Container>
      <Background />
      <ContentContainer pad={padding}>{children}</ContentContainer>
    </Container>
  );
}

CustomBackground.defaultProps = {
  padding: 20,
};

CustomBackground.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.object,
    PropTypes.bool,
  ]).isRequired,
  padding: PropTypes.number,
};

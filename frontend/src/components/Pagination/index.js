import React from 'react';
import PropTypes from 'prop-types';

import { Container, ArrowLeft, CurrentPage, ArrowRigth } from './styles';

export default function Pagination({
  page,
  onIncrease,
  onDecrease,
  totalItems,
  itemsPerPage,
}) {
  const totalPages = totalItems / itemsPerPage;

  return (
    <Container>
      <ArrowLeft onClick={onDecrease} disabled={page === 1} />
      <CurrentPage>{page}</CurrentPage>
      <ArrowRigth onClick={onIncrease} disabled={page >= totalPages} />
    </Container>
  );
}

Pagination.defaultProps = {
  itemsPerPage: 6,
};

Pagination.propTypes = {
  itemsPerPage: PropTypes.number,
  page: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  onIncrease: PropTypes.func.isRequired,
  onDecrease: PropTypes.func.isRequired,
};

import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

import api from '~/services/api';

import Table from '~/components/TablePage';
import Pagination from '~/components/Pagination';
import Spinner from '~/components/Spinner';

import TableRow from './TableRow';

import { customStyle, Warning } from './styles';

export default function DeliverersTable() {
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [deliverers, setDeliverers] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');

  const itemsPerPage = 6;
  const HEADERS = ['ID', 'Foto', 'Nome', 'Email', 'Ações'];

  const memoizedLoadDeliverers = useCallback(
    (onDelete) => {
      async function loadDeliverers() {
        setLoading(true);

        try {
          const response = await api.get('/deliverers', {
            params: { page, q: query },
          });
          const { data, headers } = response;

          if (onDelete && data.length === 0 && page > 1) {
            setPage(page - 1);
          }

          setTotalItems(Number(headers['x-total-count']));
          setDeliverers(data);
        } catch (err) {
          toast.error(
            'Não foi possível carregar os dados. Tente recarregar a página novamente.'
          );
        }

        setLoading(false);
      }

      loadDeliverers();
    },
    [page, query]
  );

  useEffect(() => {
    memoizedLoadDeliverers();
  }, [memoizedLoadDeliverers]);

  function handlePageDecrease() {
    if (page === 1) return;

    setPage(page - 1);
  }

  function handlePageIncrease() {
    if (page >= totalItems / itemsPerPage) return;

    setPage(page + 1);
  }

  function handleSearch(value) {
    setQuery(value);
  }

  function handleDelete() {
    memoizedLoadDeliverers(true);
  }

  return (
    <>
      <Table
        partialTitle="entregadores"
        search={handleSearch}
        headers={HEADERS}
        customStyle={customStyle}
      >
        {!loading &&
          deliverers.map((deliverer) => (
            <TableRow
              key={deliverer.id}
              data={deliverer}
              onDelete={handleDelete}
            />
          ))}
      </Table>
      {loading && <Spinner size={250} />}
      {!loading &&
        (deliverers.length === 0 ? (
          <Warning>Nenhum item encontrado</Warning>
        ) : (
          <Pagination
            page={page}
            totalItems={totalItems}
            onIncrease={handlePageIncrease}
            onDecrease={handlePageDecrease}
          />
        ))}
    </>
  );
}

import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

import api from '~/services/api';

import Table from '~/components/TablePage';
import Pagination from '~/components/Pagination';
import Spinner from '~/components/Spinner';

import TableRow from './TableRow';

import { Warning } from './styles';

export default function OrdersTable() {
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState(false);

  const itemsPerPage = 6;
  const HEADERS = [
    'ID',
    'Produto',
    'Destinatário',
    'Entregador',
    'Cidade',
    'Estado',
    'Status',
    'Ações',
  ];

  const memoizedLoadOrders = useCallback(
    (onDelete) => {
      async function loadOrders() {
        setLoading(true);

        try {
          const problems = filter ? true : undefined;

          const response = await api.get('/orders', {
            params: { page, q: query, problems },
          });
          const { data, headers } = response;

          if (onDelete && data.length === 0 && page > 1) {
            setPage(page - 1);
          }

          setTotalItems(Number(headers['x-total-count']));
          setOrders(data);
        } catch (err) {
          toast.error(
            'Não foi possível carregar os dados. Tente recarregar a página novamente.'
          );
        }

        setLoading(false);
      }

      loadOrders();
    },
    [page, filter, query]
  );

  useEffect(() => {
    memoizedLoadOrders();
  }, [memoizedLoadOrders]);

  function handlePageDecrease() {
    if (page === 1) return;

    setPage(page - 1);
  }

  function handlePageIncrease() {
    if (page >= totalItems / itemsPerPage) return;

    setPage(page + 1);
  }

  function handleFilter() {
    setFilter(!filter);
  }

  function handleSearch(value) {
    setQuery(value);
  }

  function handleDelete() {
    memoizedLoadOrders(true);
  }

  return (
    <>
      <Table
        partialTitle="encomendas"
        search={handleSearch}
        checkbox={{
          handleChange: handleFilter,
          state: filter,
        }}
        headers={HEADERS}
      >
        {!loading &&
          orders.map((order) => (
            <TableRow key={order.id} data={order} onDelete={handleDelete} />
          ))}
      </Table>
      {loading && <Spinner size={250} />}
      {!loading &&
        (orders.length === 0 ? (
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
